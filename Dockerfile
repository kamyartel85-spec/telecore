FROM python:3.11-slim

WORKDIR /app

# Optimize memory and performance for low-resource environments (1GB RAM VPS)
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONOPTIMIZE=1 \
    MALLOC_ARENA_MAX=2 \
    DATA_DIR=/app/data \
    PORT=8080

# Install dependencies if any
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project source
COPY . .

EXPOSE 8080

CMD ["python", "server.py"]
