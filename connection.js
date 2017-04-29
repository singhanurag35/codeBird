var mongodb = require('mongodb');
var mp = require('mongodb-promise');

var MongoClient = mongodb.MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/cranebachao';

var connection=mp.MongoClient;


module.exports.conn=connection;

module.exports.url=url;
