
var express = require('express')
  , cons = require('consolidate')
  , http = require('http')
  , swig = require('swig')
  , urls = require('./urls');

swig.init({ root: __dirname + '/views' });

var app = express();
var MemStore = express.session.MemoryStore

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });

app.use(express.static(__dirname + '/public'));

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: '1qaz2wsx', store: MemStore({ reapInterval: 60000 * 10 }) }));
app.use(app.router);
app.use(express.errorHandler());

urls.route(app);

http.createServer(app).listen(3000, function(){
  console.log("Express server listening on port 3000");
});
