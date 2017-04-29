var connection = require('../connection');
var express=require('express');
var bcrypt= require('bcryptjs');
var jwt    = require('jsonwebtoken');
var user='myuser';
var level=null;
function Users() {
  this.get_sightings = function(req, res)
  {
    //-----------------Insert the entries---------------------------------------------------
    connection.conn.connect(connection.url)
        .then(function(db){
            return db.collection('user_profiles')
            .then(function(col){
//-----------Check for existing user--------------------------------------------------------
              return col.find().toArray()
                .then(function(value) {

                          db.close().then(console.log('success'));
                          res.json({
                              success: true,
                              migration_data: value[0]
                          });

                })
              }).fail(function(err) {console.log(err);});
        })
        .fail(function(err) {console.log(err);});
    //-------------------------------------------------------------------------------------------
 };
}

module.exports = new Users();
