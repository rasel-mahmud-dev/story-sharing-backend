const passport = require("passport")
const GoogleStrategy  = require('passport-google-oauth20').Strategy;

const GOOGLE_REDIRECT_URL = process.env.BACKEND_URI + "/api/auth/callback/google"
// it will redirect to = "/.netlify/functions/server/auth/callback/google"  [netlify.toml]


passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: GOOGLE_REDIRECT_URL
	},
	async function(accessToken, refreshToken, profile, cb) {
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
