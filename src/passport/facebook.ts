import passport from  "passport"
import { Strategy } from  "passport-facebook"
import {createToken} from "../jwt";
import mongoose from "mongoose";


const User  = mongoose.model("../models/User");

// const FACEBOOK_APP_REDIRECT_URL = "http://localhost:8888/.netlify/functions/server/callback/facebook"
const FACEBOOK_APP_REDIRECT_URL = process.env.BACKEND_URI + "/auth/callback/facebook"

passport.use(new Strategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: FACEBOOK_APP_REDIRECT_URL,
		profileFields: ['id', 'displayName', 'photos', 'email']
	},
	async function(accessToken, refreshToken, profile, cb) {
	
	try{
		let user: any  = await User.findOne({facebookId: profile.id}, {})
		if(user){
			let token = createToken(user._id, user.email)
			let { password, created_at, updated_at, ...other } = user
			return cb(null, {...other, token});
		} else {
			// create a new user
			user = {
				avatar: profile.photos &&  profile.photos[0] && profile.photos[0].value,
				email: "",
				facebookId: profile.id,
				password: "",
				first_name: profile.displayName,
				username: profile.displayName,
				last_name: "",
			}
			user = new User(user)
			user = await user.save(true)
			let token = createToken(user._id, user.email)
			let { password, created_at, updated_at, ...other } = user
			return cb(null, {...other, token});
		}
		} catch (ex){
			return cb(ex, null);
		}
	}
));


passport.serializeUser(function(user, done) {
	done(null, user);
});

