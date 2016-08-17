#!/bin/sh
picture_root=/data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/

cd "$picture_root"
chmod -R 755 *
mkdir -p thumbs
mkdir -p responsive_375
mkdir -p responsive_480
mkdir -p responsive_757
mkdir -p responsive_1920

for i in *_3_*.JPG; do
   echo ${i}
  if [ ! -f "${picture_root}responsive_1920/${i}" ]; then
    mogrify -path "${picture_root}responsive_1920/" -filter Triangle -define filter:support=2 -thumbnail 1920 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB "$i"
  fi
  if [ ! -f "${picture_root}responsive_757/${i}" ]; then
    mogrify -path "${picture_root}responsive_757/" -filter Triangle -define filter:support=2 -thumbnail 757 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB "${picture_root}responsive_1920/${i}"
  fi
  if [ ! -f "${picture_root}responsive_480/${i}" ]; then
    mogrify -path "${picture_root}responsive_480/" -filter Triangle -define filter:support=2 -thumbnail 480 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB "${picture_root}responsive_757/${i}"
  fi
  if [ ! -f "${picture_root}responsive_375/${i}" ]; then
    mogrify -path "${picture_root}responsive_375/" -filter Triangle -define filter:support=2 -thumbnail 375 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB "${folder}responsive_480/${i}"
  fi
done
