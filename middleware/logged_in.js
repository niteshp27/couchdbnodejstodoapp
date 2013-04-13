//when the user is not logged in, redirecting the user to the login screen instead of executing that route
function LoggedIn() {
	return function(next) {
		if (! this.req.session || ! this.req.session.user) {
			this.res.writeHead(303, {Location: '/session/new'});
			return this.res.end();
		}
		next();
	};
}
module.exports = LoggedIn;