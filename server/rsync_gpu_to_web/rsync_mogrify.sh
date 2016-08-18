#!/bin/sh
rsync --protect-args -avz -e ssh recog_gpu:"/data/tate/imgs/reuters/RPA Feed for Tate/*.JPG" /data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/
/home/recog/recognition/server/mogrify/mogrify.sh
