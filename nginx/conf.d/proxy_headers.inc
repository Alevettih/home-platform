# Для SSE и постоянных соединений
proxy_http_version 1.1;
proxy_set_header Connection "";
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $http_connection;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header Host $host;

# Для SSE
proxy_buffering off;
proxy_cache off;
proxy_cache_bypass $http_upgrade;

# Для долгоживущих соединений
proxy_read_timeout 86400;
proxy_send_timeout 86400;
