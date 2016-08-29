#!/bin/sh
rsync --copy-unsafe-links --protect-args -KLavz -e ssh recog_gpu:"/data/tate/imgs/reuters/RPA Feed for Tate/*" /data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/
#/home/recog/recognition/server/mogrify/mogrify.sh
/home/recog/local/bin/node /home/recog/recognition/server/og_image/og_image.js
