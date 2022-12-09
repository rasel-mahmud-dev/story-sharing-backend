const passport = require("passport")
const FacebookStrategy = require('passport-facebook').Strategy;



let callbackURL = `${process.env.BACKEND_URL}/api/v1/auth/facebook/callback`


passport.use(new FacebookStrategy({
		clientID:  process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: callbackURL
	},
	function(accessToken, refreshToken, profile, cb) {
		cb(null, {
			id: profile.id,
			username: profile.displayName,
			email: profile.emails[0].value,
			photo: profile.photos ? profile.photos[0].value : "",
		})
	}
));

passport.serializeUser(function (user, cb) {
	cb(null, user);
});
