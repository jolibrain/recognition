## Minimal early technical documentation

### Exchange formats

#### JSON format for matches

Current tentative format, as final output from AI processes and input to the Web UI:

```json
[
  {
    "status": "none",
    "timestamp": "2016-07-05 16:39:39",
    "input": {
      "meta": [
        {
          "date": "c.1838-1840"
        }
      ],
      "img": "/img/reuters/52862590.jpg"
    },
    "output": [
      {
        "meta": {
          "date": "1989"
        },
        "features": {
          "score": 0.82,
          "in": {},
          "out": {}
        },
        "img": "/img/tate/P80148_09.jpg"
      },
      {
        "meta": {
          "date": "1989"
        },
        "features": {
          "score": 0.62,
          "in": {},
          "out": {}
        },
        "img": "/img/tate/P80148_10.jpg"
      }
    ]
  }
]
```