var jsonfile = require('./damYearWise.json')
var express=require('express');
var connection = require('../connection');
//var replace = require("replace");
var fs = require('fs');
var user='myuser';
var dbs=null;

function Users(){
this.upload=function(req,res)
{
connection.conn.connect(connection.url).then(function(db)
{
  /*console.log("Check1");
        dbs=db;
        replace({
            regex: /\\/g,
            replacement: "",
            paths: ['bulk_insert/questions.json'],
            recursive: true,
            silent: true,
        });

        replace({
            regex: "}\"",
            replacement: "}",
            paths: ['bulk_insert/questions.json'],
            recursive: true,
            silent: true,
        });

        replace({
            regex: "\"{",
            replacement: "{",
            paths: ['bulk_insert/questions.json'],
            recursive: true,
            silent: true,
          });
*/


 return db.collection('dam_yearwise')
}).then(function(col)
{
  var jsonfile = require('./damYearWise.json');
                      // console.log(jsonfile[0]);



                           try {
                                          for (var i=0;i<jsonfile.length;i++)
                                          {

                                                    col.insert(jsonfile[i]).then(function(result)
                                                     {


                                                         console.log("Success");



                                               //res.json({"success":false,
                                                                  //"Message":"Error inserting questions!!"});
                                                       return jsonfile[i];

                                                     }).fail(function(err,jsonF)
                                                    {

                                                      console.log(jsonF);
                                                      fs.appendFile('error.txt', err+'\r\n', function (err) {
                                                        if (err) throw err;
                                                        console.log('Saved to error log!!');
                                                      });

                                                  });

                                  }
                                  } catch (e) {
                                    res.json({"success":false,
                                               "Message":"Error inserting questions!!"});
                                     console.log(e);
                                  }







})



};
}
module.exports = new Users();
// use:


//console.log(jsonfile[0]);
