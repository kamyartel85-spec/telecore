import http.server
import socketserver
import urllib.parse
import sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/log_error':
            qs = urllib.parse.parse_qs(parsed.query)
            print("BROWSER LOG:", qs.get('msg', [''])[0])
            self.send_response(200)
            self.end_headers()
            # Shut down after receiving a log to not hang forever
            if "Finished_Loading" in qs.get('msg', [''])[0]:
                print("No errors detected.")
            sys.exit(0)
            return
        return super().do_GET()

httpd = socketserver.TCPServer(("", 8081), Handler)
print("Serving on port 8081")
httpd.serve_forever()
