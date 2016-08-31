#!/bin/bash
DATE=`date +%Y-%m-%d:%H:%M:%S`
#export $TERM=xterm
cd /home/recog/tate/dev/recognition/ai/tools/
#python recog_matches.py --input-imgs /data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/ --generators all --indexes-repo /home/recog/tate/data/recog_test/indexes/ --models-repo /home/recog/tate/data/models/ --json-output matches_hourly.json --nfiles 200 --nmatches 10 --last-hour 1 --website --medium --freq-filter smatches.bin --concat
python recog_matches.py --input-imgs /data/tate/imgs/reuters/Images\ of\ the\ Day\ Tate/ --generators all --indexes-repo /home/recog/tate/data/recog_test/indexes/ --models-repo /home/recog/tate/data/models/ --json-output matches_hourly.json --nfiles 200 --nmatches 10 --last-hour 1 --website --medium --freq-filter smatches.bin --concat
RETVAL=$?
if [ $RETVAL -eq 0 ]; then
    cp splash.json '/data/tate/matches/splash.json_'$DATE
    cp matches_hourly.json '/data/tate/matches/matches_hourly.json_'$DATE
    scp splash.json recog_web:~/json_dump/splash_current.json
    scp matches_hourly.json recog_web:~/json_dump/match_current.json 
else
    echo 'Failures during hourly matches generation'
    echo $RETVAL
    cat ~/tate/log/matches_hourly.log | mail -s "Recog AI pipeline error" beniz@droidnik.fr
    cd ../monitoring
    python cleanup_dd.py
fi
