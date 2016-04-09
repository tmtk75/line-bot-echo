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
  var msg = req.body.result[0];
  console.log(msg);
  fetch('https://trialbot-api.line.me/v1/events', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Line-ChannelID': process.env.LINE_CLIENT_ID,
      'X-Line-ChannelSecret': process.env.LINE_CHANNEL_SECRET,
      'X-Line-Trusted-User-With-ACL': process.env.LINE_TRUSTED_USER_WITH_ACL,
    },
    body: JSON.stringify({
      to: [msg['content']['from']],
      toChannel: 1383378250,  // Fixed value
      eventType: "138311608800106203",  // Fixed value
      content: msg['content']
    }),
  })
  .then((res) => res.text())
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
  res.status(201).send();
});

app.listen(app.get("port"), _ => console.log("server started:", app.get("port")));

