var flatiron = require('flatiron'),
    path = require('path'),
   	nstatic = require('node-static'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });
var file = new nstatic.Server(__dirname + '/public/');

//users
app.use(flatiron.plugins.http, {
	before: [
		require('flatware-cookie-parser')(), //session
		require('flatware-session')(), //session
		function(req, res) {
			var found = app.router.dispatch(req, res);
			if (! found) {
				file.serve(req, res);
			}
		}
	]
});

//basic
//app.use(flatiron.plugins.http); 

//users
app.router.path('/users', require('./routes/users'));
//sessions
app.router.path('/session', require('./routes/session'));
//todos
app.router.path('/todos', require('./routes/todos'));
/* 
//basic
app.router.get('/', function () {
  this.res.json({ 'hello': 'world' })
});
*/
app.start(3000);