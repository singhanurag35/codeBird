var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');

var app = express();
app.use( express.static( "public" ) );
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.set('superSecret', 'ilovescotchyscotch');



//connection.init();
routes.configure(app);

var server = app.listen(8080, function() {
  console.log('Server listening on port ' + server.address().port);
});
