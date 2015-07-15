var express = require('express'),
  mongoskin = require('mongoskin'),
  bodyParser = require('body-parser'),
  logger = require('morgan');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

var db = mongoskin.db('@localhost:27017/test', {safe:true});

app.param('collectionName', function(req, res, next , collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});

app.get('/', function (res, req, next) {
  res.send('please select a collection, e.g., /collections/messages');
});

app.get('/collections/:collectionName', function (req, res, next) {
  req.collection.find({}, {
    limit: 10, sort: {'_id': -1}
  }).toArray(function (err, results) {
    if(e) return next(e);
    res.send(results);
  });
});

app.post('/collections/:collectionName', function (req, res, next) {
  req.collection.insert(req.body, {}, function (err, results) {
    if(e) return next(e);
    res.send(results);
  });
});