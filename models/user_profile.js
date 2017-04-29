var connection = require('../connection');
var express=require('express');
var jwt    = require('jsonwebtoken');
var user='myuser';
var level=null;
function Users() {
  this.get_profile = function(req, res)
  {
    connection.conn.connect(connection.url)
        .then(function(db){
            return db.collection('user_profiles')
            .then(function(col){
//-----------Check for existing data--------------------------------------------------------
              return col.find( { "user_id": req.body.user_id }).count()
                .then(function(value) {
                    if(value==0)
                    {
                          db.close().then(console.log('success'));
                          res.json({
                              success: true,
                              message: 'Data not available!!',
                          });
                    }
//------------Fetch data if available------------------------------------------------------------------------
                    else
                      {
                       
                                  db.close().then(console.log('success'));
                                  res.json({
                                      success: true,
                                      user_details: value,
                                  });

                      }
                })
              }).fail(function(err) {console.log(err);});
        })
        .fail(function(err) {console.log(err);});
    //-------------------------------------------------------------------------------------------
 };

 //Add user data----------------------------------------------------------------------------------


   this.add_data = function(req, res)
  {
    connection.conn.connect(connection.url)
        .then(function(db){
            return db.collection('user_profiles')
            .then(function(col){
//-----------Check for existing user--------------------------------------------------------
              return col.find( { "user_id": req.body.user_id }).count()
                .then(function(value) {

                            return col.update({user_id : req.body.user_id} ,
                                              {
                                                $set:{
                                                  sighting_data: req.body.sighting_data
                                                }
                                              },
                                              {
                                                upsert:true
                                              }
                                            )
                                            .then(function(result) {
                                                db.close().then(console.log('success'));
                                                res.json({
                                                    success: true,
                                                    message: 'Thank you for helping save cranes!!',
                                                });

                                              }).fail(function(err) {console.log(err);});

                })
              }).fail(function(err) {console.log(err);});
        })
        .fail(function(err) {console.log(err);});
    //-------------------------------------------------------------------------------------------
 };
}

module.exports = new Users();
