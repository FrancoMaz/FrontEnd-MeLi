var express = require('express');
var cors = require('cors');

var itemsRouter = require('./src/routes/items');

var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/items', itemsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send("Not Found");
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;