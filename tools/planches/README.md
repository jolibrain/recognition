# Planches

Tools to preview image similarities.

Input json data is stored in *dist/match.json* file.

# Dev setup

    npm install
    npm run build

Then webpack-dev-server should be running on port specified inside
*webpack.config.js* configuration file.

# Prod setup

    npm install
    npm run build

Then use *dist* folder as the web root.

Nginx config example:

    server {
      listen 80 default_server;
      listen [::]:80 default_server ipv6only=on;
    
      root /home/username/recognition/tools/planches/dist;
      index index.html;
    
      location / {
        try_files $uri $uri/ =404;
      }
    }
