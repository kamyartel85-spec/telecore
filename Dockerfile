FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Environment variables
ENV PORT=8080
ENV DATA_DIR=/app/data

EXPOSE 8080

CMD ["python", "server.py"]
