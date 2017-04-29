var connection = require('../connection');
var express=require('express');
var bcrypt= require('bcryptjs');
var jwt    = require('jsonwebtoken');
var lib = require('otplib');
var totp = require('otplib/lib/totp');
var user='myuser';
var level=null;
function Users() {
  this.get_leaders = function(req, res)
  {
    //-----------------Insert the entries---------------------------------------------------
    connection.conn.connect(connection.url)
        .then(function(db){
            var secret = totp.utils.generateSecret();
            var userID= totp.generate(secret);
            return db.collection('user_profiles')
            .then(function(col){
//-----------Check for existing user--------------------------------------------------------
              return col.find( { $query: {}, $orderby: { user_score : -1 } }).toArray()
                .then(function(value) {

                          db.close().then(console.log('success'));
                          res.json({
                              success: true,
                              leader_data: value,
                          });

                })
              }).fail(function(err) {console.log(err);});
        })
        .fail(function(err) {console.log(err);});
    //-------------------------------------------------------------------------------------------
 };
}

module.exports = new Users();
