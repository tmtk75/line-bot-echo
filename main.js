"use strict"
var express        = require('express'),
    bodyParser     = require('body-parser'),
    logger         = require("morgan"),
    path           = require("path"),
    fs             = require("fs"),
    fetch          = require("node-fetch");

var PORT = process.env.PORT || 3000;

var app = express();
app.set('port', PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

app.post('/', (req, res) => {
  //console.log(req.body);
  var app_id  = process.env.KII_APP_ID;
  var app_key = process.env.KII_APP_KEY;
  fetch('https://api-jp.kii.com/api/apps/' + app_id + "/server-code/versions/current/main", {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      "x-kii-appid": app_id,
      "x-kii-appkey": app_key,
    },
    body: JSON.stringify(req.body),
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res.returnedValue)
    return fetch('https://trialbot-api.line.me/v1/events', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Line-ChannelID': process.env.LINE_CLIENT_ID,
        'X-Line-ChannelSecret': process.env.LINE_CHANNEL_SECRET,
        'X-Line-Trusted-User-With-ACL': process.env.LINE_TRUSTED_USER_WITH_ACL,
      },
      body: JSON.stringify(res.returnedValue),
    })
    .then((res) => res.text())
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

  res.status(201).send();
});

app.listen(app.get("port"), _ => console.log("server started:", app.get("port")));

