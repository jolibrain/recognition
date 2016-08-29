Server start:

```
python mod_server.py --json-file matches_hourly.json
```

GET a match status:

```
curl -X GET 'http://localhost:5000/moderation?img_in=/img/reuters/2016-08-29T114310Z_1926252126_D1BETYFJNQAA_RTRMADP_2_RUSSIA-AGRICULTURE.JPG&img_out=/img/tate/P06790_10.jpg'
```

POST (modify) a match status:

```
url -X POST 'http://localhost:5000/moderation' -d '{"img_in":"/img/reuters/2016-08-29T114310Z_1926252126_D1BETYFJNQAA_RTRMADP_2_RUSSIA-AGRICULTURE.JPG","img_out":"/img/tate/P06790_10.jpg","status":"moderated"}' --header "Content-Type:application/json"
```

Server has lock across JSON read/write operations so it allows only one change at a time and locks the other requests (this will occur if more than one person moderates at the same time)
