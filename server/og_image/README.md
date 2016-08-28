# Sharing: Generate og:image meta tag for each match page

For social media sharing, we've been requested to create an og:image for each
match, so a large thumbnail autogenerates from hyperlinks on facebook and
twitter. The image would be 1200 x 628px and contain both reuters and tate
images side-by-side, scaled to fill the height + width of its container.

Add missing folders:
```
mkdir /data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/og_image/
mkdir /data/tate/imgs/tate_final/og_image/
mkdir /data/tate/imgs/og_image/
cd /home/recog/recognition/ui/website/dist/img/
ln -sf /data/tate/imgs/og_image/
```

Simple *mogrify* command to resize all images from folder:
```
mogrify -path og_image -format jpg -resize "600x628^" -gravity center -crop
600x628+0+0 +repage *.jpg
```

Using *parallel*:
```
find . -maxdepth 1 -iname "*.jpg" -type f -print0  | parallel --progress -0 -j
+0 'if [ ! -f og_image/{/} ]; then mogrify -path og_image -format jpg -resize
"600x628^" -gravity center -crop 600x628+0+0 +repage {}; fi'
```

Last 24h reuters images:
```
find . -maxdepth 1 -iname "*_3_*.jpg" -type f -mtime -1 -print0 | parallel
--progress -0 -j +0 'if [ ! -f og_image/{/} ]; then mogrify -path og_image
-format jpg -resize "600x628^" -gravity center -crop 600x628+0+0 +repage {}; fi'
```

Images side by side:
```
convert reuters/og_image/reuters_id.jpg tate/og_image/tate_id.jpg +append
og_image/reuters_id.jpg
```

node script to read json and launch command for each match:

```
/home/recog/local/bin/node /home/recog/recognition/server/og_image/og_image.js
```
