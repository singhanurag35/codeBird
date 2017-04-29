var connection = require('../connection');
var express=require('express');
var bcrypt= require('bcryptjs');
var jwt    = require('jsonwebtoken');
var lib = require('otplib');
var totp = require('otplib/lib/totp');
var user='myuser';
var level=null;
function Users() {
  this.register = function(req, res)
  {
    //-----------------Insert the entries---------------------------------------------------
    connection.conn.connect(connection.url)
        .then(function(db){
            var secret = totp.utils.generateSecret();
            var userID= totp.generate(secret);
            console.log(userID);
            return db.collection('users')
            .then(function(col){
//-----------Check for existing user--------------------------------------------------------
              return col.find( { "email": req.body.email }, {"gid": req.body.gid} ).count()
                .then(function(value) {
                    if(value>0)
                    {
                          res.json({
                              success: false,
                              message: 'User already exists!!',
                          });
                    }
//------------New user------------------------------------------------------------------------
                    else
                      {
                          return col.insert({user_id : userID,
                                            email: req.body.email,
                                            gid: req.body.gid,
                                            dp: req.body.dp
                                          })
                              .then(function(result) {
                                  db.close().then(console.log('success'));
                                  res.json({
                                      success: true,
                                      message: 'User registered successfully!!',
                                  });

                              }).fail(function(err) {console.log(err);});
                      }
                })
              }).fail(function(err) {console.log(err);});
        })
        .fail(function(err) {console.log(err);});
    //-------------------------------------------------------------------------------------------
 };
//-------------------------------Login user------------------------------------------------------

this.login = function(req, res)
{
  connection.conn.connect(connection.url)
      .then(function(db){
          return db.collection('users')
          .then(function(col){
//-----------Check for existing user--------------------------------------------------------
            return col.find( { email: req.body.email, gid: req.body.gid }).toArray()
              .then(function(value) {
                  if(value.length>0)
                  {
                  console.log(value);
                  var token = jwt.sign({user: 'testuser'},'superSecret', { expiresIn: '750h' });
                  res.json({
                      success: true,
                      message: 'User logged-in successfully!!',
                      token: token,
                      userDetails: value,
                  });

                  }
                  else
                    {
                      res.json({
                          success: false,
                          message: 'Oops!! Looks like you have entered wrong details.',
                      });

                    }
              }).fail(function(err) {console.log(err);});
            }).fail(function(err) {console.log(err);});
      })
      .fail(function(err) {console.log(err);});
};
}

module.exports = new Users();
