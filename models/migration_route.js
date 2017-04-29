var connection = require('../connection');
var express=require('express');
var bcrypt= require('bcryptjs');
var jwt    = require('jsonwebtoken');
var lib = require('otplib');
var totp = require('otplib/lib/totp');
var user='myuser';
var level=null;
function Users() {
  this.get_route = function(req, res)
  {
    //-----------------Insert the entries---------------------------------------------------
    connection.conn.connect(connection.url)
        .then(function(db){
            var secret = totp.utils.generateSecret();
            var userID= totp.generate(secret);
            return db.collection('migration_route')
            .then(function(col){
//-----------Check for existing user--------------------------------------------------------
              return col.find().toArray()
                .then(function(value) {

                          db.close().then(console.log('success'));
                          res.json({
                              success: true,
                              migration_data: value,
                          });

                })
              }).fail(function(err) {console.log(err);});
        })
        .fail(function(err) {console.log(err);});
    //-------------------------------------------------------------------------------------------
 };
}

module.exports = new Users();
