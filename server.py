"""
TeleCore Server - Unified Telegram Panel Backend
Hardened with Security Filters, Authentication, Memory Optimizations, and Telethon Integration.
"""

import os
import sys
import json
import sqlite3
import logging
import gc
import hashlib
import secrets
from urllib.parse import unquote, urlparse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from http.cookies import SimpleCookie

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

# Resolve Volume Data Directory
DATA_DIR = os.environ.get("DATA_DIR", os.path.join(os.path.dirname(os.path.abspath(__file__)), "data"))
SESSIONS_DIR = os.path.join(DATA_DIR, "sessions")
LOGS_DIR = os.path.join(DATA_DIR, "logs")
CONFIG_DIR = os.path.join(DATA_DIR, "config")
DB_PATH = os.path.join(DATA_DIR, "database.sqlite")
ADMIN_CONF_PATH = os.path.join(CONFIG_DIR, "admin.json")

PORT = int(os.environ.get("PORT", 8080))

FORBIDDEN_EXTENSIONS = {
    ".session", ".session-journal", ".sqlite", ".sqlite3", ".db",
    ".py", ".pyc", ".env", ".log", ".sh", ".yml", ".yaml", ".bak"
}

FORBIDDEN_FILES = {
    "dockerfile", "requirements.txt", "railway.json", ".gitignore",
    "server.py", ".env"
}

valid_tokens = set()

def init_storage():
    for folder in [DATA_DIR, SESSIONS_DIR, LOGS_DIR, CONFIG_DIR]:
        os.makedirs(folder, exist_ok=True)
    
    conn = sqlite3.connect(DB_PATH, timeout=5.0)
    cursor = conn.cursor()
    cursor.execute("PRAGMA journal_mode = WAL;")
    cursor.execute("PRAGMA synchronous = NORMAL;")
    cursor.execute("PRAGMA cache_size = -2000;")
    cursor.execute("PRAGMA temp_store = MEMORY;")
    cursor.execute("PRAGMA busy_timeout = 5000;")
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            api_id TEXT,
            api_hash TEXT,
            session_file TEXT NOT NULL,
            status TEXT DEFAULT 'online',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def hash_password(password, salt=None):
    if salt is None:
        salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return hashed.hex(), salt

def check_auth(headers):
    cookie_header = headers.get('Cookie')
    if cookie_header:
        cookie = SimpleCookie(cookie_header)
        if 'auth_token' in cookie and cookie['auth_token'].value in valid_tokens:
            return True
    return False

def admin_exists():
    return os.path.exists(ADMIN_CONF_PATH)

class SecureTeleCoreHandler(SimpleHTTPRequestHandler):
    timeout = 15

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("X-XSS-Protection", "1; mode=block")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:;"
        )
        parsed = urlparse(self.path)
        path = parsed.path.lower()
        if any(path.endswith(ext) for ext in [".css", ".js", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".woff", ".woff2"]):
            self.send_header("Cache-Control", "public, max-age=86400")
        else:
            self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

    def send_security_forbidden(self, reason="Forbidden"):
        self.send_response(403)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Forbidden", "message": reason, "code": 403}).encode("utf-8"))

    def is_safe_path(self, raw_path):
        decoded = unquote(raw_path)
        if ".." in decoded or "%2e%2e" in decoded.lower():
            return False, "Directory Traversal Attempt"
        clean_path = decoded.strip().lower()
        if clean_path.startswith("/data") or "/data/" in clean_path:
            return False, "Direct Volume Access Denied"
        parts = clean_path.split("/")
        for p in parts:
            if p.startswith(".") and len(p) > 1:
                return False, f"Hidden File/Directory Access: {p}"
        _, ext = os.path.splitext(clean_path)
        if ext in FORBIDDEN_EXTENSIONS:
            return False, f"Restricted Extension: {ext}"
        if os.path.basename(clean_path) in FORBIDDEN_FILES:
            return False, f"Restricted File"
        return True, "OK"

    def do_GET(self):
        parsed = urlparse(self.path)
        clean_path = parsed.path

        is_safe, reason = self.is_safe_path(clean_path)
        if not is_safe:
            self.send_security_forbidden(reason)
            return

        if clean_path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy"}).encode("utf-8"))
            return

        # Setup enforcement
        if not admin_exists() and clean_path not in ["/setup.html", "/style.css"]:
            self.send_response(302)
            self.send_header("Location", "/setup.html")
            self.end_headers()
            return
            
        # Auth enforcement
        if admin_exists() and clean_path not in ["/login.html", "/style.css"] and not check_auth(self.headers):
            if clean_path.startswith("/api/"):
                self.send_response(401)
                self.end_headers()
                return
            self.send_response(302)
            self.send_header("Location", "/login.html")
            self.end_headers()
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        clean_path = parsed.path

        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length) if content_length > 0 else b""
        
        try:
            payload = json.loads(post_data.decode("utf-8"))
        except:
            payload = {}

        if clean_path == "/api/auth/setup":
            if admin_exists():
                self.send_response(400)
                self.end_headers()
                return
            username = payload.get("username")
            password = payload.get("password")
            if username and password:
                hashed, salt = hash_password(password)
                with open(ADMIN_CONF_PATH, "w") as f:
                    json.dump({"username": username, "password_hash": hashed, "salt": salt}, f)
                self.send_response(200)
                self.end_headers()
            else:
                self.send_response(400)
                self.end_headers()
            return

        if clean_path == "/api/auth/login":
            if not admin_exists():
                self.send_response(400)
                self.end_headers()
                return
            username = payload.get("username")
            password = payload.get("password")
            with open(ADMIN_CONF_PATH, "r") as f:
                admin_data = json.load(f)
            if username == admin_data["username"]:
                hashed, _ = hash_password(password, admin_data["salt"])
                if hashed == admin_data["password_hash"]:
                    token = secrets.token_hex(32)
                    valid_tokens.add(token)
                    self.send_response(200)
                    self.send_header("Set-Cookie", f"auth_token={token}; HttpOnly; Path=/")
                    self.end_headers()
                    return
            self.send_response(401)
            self.end_headers()
            return

        if not check_auth(self.headers):
            self.send_response(401)
            self.end_headers()
            return
            
        # Protected endpoints below
        if clean_path == "/api/accounts/list":
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute("SELECT * FROM accounts")
            rows = [dict(row) for row in c.fetchall()]
            conn.close()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(rows).encode("utf-8"))
            return
            
        self.send_response(404)
        self.end_headers()

class ThreadedServer(ThreadingHTTPServer):
    daemon_threads = True

def main():
    init_storage()
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = ThreadedServer(("0.0.0.0", PORT), SecureTeleCoreHandler)
    logging.info(f"TeleCore Secure Server started on http://0.0.0.0:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
        gc.collect()

if __name__ == "__main__":
    main()
