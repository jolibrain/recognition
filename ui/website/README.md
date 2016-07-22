# Website

Tools to preview image similarities.

Input json data is stored in *ui/website/dist/match.json* file.

## Requirements

Install necessary packages on server:

    sudo apt-get install git nginx apache2-utils

To install latest version of node.js, with local user rights, please follow this tutorial, in particular the script *node-and-npm-in-30-seconds-sh*:

https://gist.github.com/isaacs/579814#file-node-and-npm-in-30-seconds-sh

## Dev setup

    cd ui/website/
    npm install
    npm run start

Then webpack-dev-server should be running on port specified inside
*webpack.config.js* configuration file.

## Prod setup

    cd ui/website/
    npm install
    npm run build

Then use *dist* folder as the web root.

Nginx config example:

    server {
      listen 80 default_server;
      listen [::]:80 default_server ipv6only=on;

      root /home/username/recognition/ui/website/dist;
      index index.html;

      location / {
        try_files $uri $uri/ =404;
      }
    }

## Tate/Reuters images symbolic links

To access Tate/Reuters images, you need to create symbolic links.

    cd ui/website/dist
    mkdir img
    cd img
    ln -sf /home/beniz/projects/tate/data/tate tate
    ln -sf /home/beniz/projects/tate/data/reuters_decenny reuters

The relative path to access these images from the web frontend are
*/img/tate/...* and */img/reuters/...*

## Nginx htpassword

Create a *htpasswd* file:

    mkdir /etc/nginx/auth/
    htpasswd -c /etc/nginx/auth/recog_htpasswd recog

Use it in nginx server configuration:

    server {
        ...
        auth_basic "closed site";
        auth_basic_user_file /etc/nginx/auth/recog_htpasswd;
        ...
    }

Reload nginx when modifications are done:

    service reload nginx