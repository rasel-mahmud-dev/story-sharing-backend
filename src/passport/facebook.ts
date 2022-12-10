import passport from "passport"
const FacebookStrategy = require('passport-facebook').Strategy;



let callbackURL = process.env.NODE_ENV !== "development"
	? `${process.env.BACKEND_URI}/api/auth/callback/facebook`
	: `/api/auth/callback/facebook`
// localhost
// let callbackURL = `/api/auth/callback/facebook`

// prod
// https://story-sharing-api.netlify.app/.netlify/functions/server/api/api/auth/callback/facebook


passport.use(new FacebookStrategy({
		clientID:  process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: callbackURL
	},
	function(accessToken, refreshToken, profile, cb) {
		cb(null, {
			id: profile.id,
			username: profile.displayName,
			email: profile.emails && profile.emails[0]?.value,
			photo: profile.photos ? profile.photos[0].value : "",
		})
	}
));

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

module.exports = {}