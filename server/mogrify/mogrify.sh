#!/bin/sh
picture_root=/data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/
#picture_root=/data/tate/imgs/tate_final/

cd "$picture_root"
chmod -R 755 *
mkdir -p thumbs
mkdir -p responsive_375
mkdir -p responsive_480
mkdir -p responsive_757
mkdir -p responsive_1920

find . -maxdepth 1 -iname "*_3_*.jpg" -type f -print0 | parallel --progress -0 -j +0 'if [ ! -f responsive_1920/{/} ]; then mogrify -path responsive_1920/ -filter Triangle -define filter:support=2 -thumbnail 1920 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB {}; fi'
find . -maxdepth 1 -iname "*_3_*.jpg" -type f -print0 | parallel --progress -0 -j +0 'if [ ! -f responsive_757/{/} ]; then mogrify -path responsive_757/ -filter Triangle -define filter:support=2 -thumbnail 757 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB {}; fi'
find . -maxdepth 1 -iname "*_3_*.jpg" -type f -print0 | parallel --progress -0 -j +0 'if [ ! -f responsive_480/{/} ]; then mogrify -path responsive_480/ -filter Triangle -define filter:support=2 -thumbnail 480 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB {}; fi'
find . -maxdepth 1 -iname "*_3_*.jpg" -type f -print0 | parallel --progress -0 -j +0 'if [ ! -f responsive_375/{/} ]; then mogrify -path responsive_375/ -filter Triangle -define filter:support=2 -thumbnail 375 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB {}; fi'
