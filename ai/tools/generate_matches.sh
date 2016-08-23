#!/bin/bash
#export $TERM=xterm
cd /home/recog/tate/dev/recognition/ai/tools/
python recog_matches.py --input-imgs /data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/ --generators all --indexes-repo /home/recog/tate/data/recog_test/indexes/ --models-repo /home/recog/tate/data/models/ --json-output matches_hourly.json --nfiles 200 --nmatches 10 --last-hour 1 --website
RETVAL=$?
if [ $RETVAL -eq 0 ]; then
    scp splash.json recog_web:~/json_dump/splash_current.json
    scp matches_hourly.json recog_web:~/json_dump/match_current.json 
else
    echo 'Failures during hourly matches generation'
    echo $RETVAL
fi
