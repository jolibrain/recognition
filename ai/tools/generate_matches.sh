#!/bin/bash
DATE=`date +%Y-%m-%d:%H:%M:%S`
#export $TERM=xterm
cd /home/recog/tate/dev/recognition/ai/tools/
scp recog_web:~/json_dump/prod/*.json .
mv match_current.json match_hourly.json
mv gallery_current.json gallery_hourly.json
#python recog_matches.py --input-imgs /data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/ --generators all --indexes-repo /home/recog/tate/data/recog_test/indexes/ --models-repo /home/recog/tate/data/models/ --json-output matches_hourly.json --nfiles 200 --nmatches 10 --last-hour 1 --website --medium --freq-filter smatches.bin --concat
python recog_matches.py --input-imgs /data/tate/imgs/reuters/Images\ of\ the\ Day\ Tate/ --generators all --indexes-repo /home/recog/tate/data/recog_test/indexes/ --models-repo /home/recog/tate/data/models/ --json-output match_hourly.json --nfiles 200 --nmatches 50 --last-hour 1 --website --medium --freq-filter smatches.bin --concat --splash-output splash_hourly.json --gallery-output gallery_hourly.json --event-filter
RETVAL=$?
if [ $RETVAL -eq 0 ]; then
    cp splash_hourly.json '/data/tate/matches/splash.json_'$DATE
    cp match_hourly.json '/data/tate/matches/match_hourly.json_'$DATE
    cp gallery_hourly.json '/data/tate/matches/gallery_hourly.json_'$DATE
    scp splash_hourly.json recog_web:~/json_dump/prod/splash_current.json
    scp match_hourly.json recog_web:~/json_dump/prod/match_current.json 
    scp gallery_hourly.json recog_web:~/json_dump/prod/gallery_current.json
else
    echo 'Failures during hourly matches generation'
    echo $RETVAL
    cat ~/tate/log/matches_hourly.log | mail -s "Recog AI pipeline error" beniz@droidnik.fr
    cd ../monitoring
    python cleanup_dd.py
fi
