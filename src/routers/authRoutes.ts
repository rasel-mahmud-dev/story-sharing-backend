import express from "express";
import passport from "passport"
import controllers from "../controllers"
import getAuthID from "../middlewares/getAuthID";
import response from "../response";
import {loginWithGoogle} from "../controllers/authController";


const router: any = express.Router()


router.get("/auth/user/:email", controllers.authController.getUserEmail)

router.post("/auth/login", controllers.authController.loginUser)
router.get("/users/:id", controllers.authController.getUser)

router.post("/auth/users", getAuthID, controllers.authController.getUsers)

router.get("/auth/current-auth", controllers.authController.loginViaToken)
router.post("/auth/register", controllers.authController.createNewUser)

// router.post("/add-cookie", controllers.authController.cookieAdd)


router.get('/auth/callback/google', passport.authenticate('google'), loginWithGoogle);

// router.get('/auth/callback/facebook',  passport.authenticate('facebook'),  function(req, res) {
//   if(req.user){
//     let queryParams = ''
//     for (let userKey in req.user) {
//       if(req.user[userKey]) {
//         queryParams = queryParams + "&" + userKey + "=" + req.user[userKey]
//       }
//     }
//     let q = queryParams.slice(1)
//     res.redirect(`${process.env.NODE_ENV === "development" ? "http://localhost:5500/#" : "https://rsl-my-blog.netlify.app/#"}/auth/callback/facebook?${q}`)
//     // res.redirect(`http://localhost:5500/#/auth/callback/facebook?${q}`)
//     req.user = {
//       id: req.user._id,
//       email: req.user.email
//     }
//   } else {
//     response(res, 500, "Internal Error")
//   }
//   // Successful authentication, redirect home.
//
//   });


router.post("/upload-profile-photo", getAuthID, controllers.authController.uploadProfilePhoto)
router.post("/upload-profile-cover-photo", getAuthID, controllers.authController.uploadProfileCoverPhoto)

router.post("/upload-markdown-image", getAuthID, controllers.authController.uploadMarkdownImage)

router.post("/update-profile", getAuthID, controllers.authController.updateProfile)

router.get("/get-auth-password", getAuthID, controllers.authController.getAuthPassword)

router.post("/auth/send/mail", controllers.authController.sendPasswordResetMail)

router.post("/auth/password-reset-session-check", controllers.authController.checkPasswordResetSessionTimeout)


router.post("/auth/reset-password", controllers.authController.changePassword)

router.get('/auth/callback/google', function (req, res) {
    passport.authenticate('google', function (err, user) {
        if (err) {
            response(res, 500, "Login fail")
            return
        } else {
            let queryParams = ''
            for (let userKey in user) {
                if (user[userKey]) {
                    queryParams = queryParams + "&" + userKey + "=" + user[userKey]
                }
            }
            let q = queryParams.slice(1)
            const origin = process.env.FRONTEND + "/#"
            res.redirect(`${origin}/auth/callback/google?${q}`)
            req.user = {
                id: user._id,
                email: user.email
            }
        }

    })(req, res);
    // Successful authentication, redirect home.

});

router.get('/auth/callback/facebook', function (req, res) {
    passport.authenticate('facebook', function (err, user) {
        if (err) {
            response(res, 500, "Login fail")
            return
        } else {
            let queryParams = ''
            for (let userKey in user) {
                if (user[userKey]) {
                    queryParams = queryParams + "&" + userKey + "=" + user[userKey]
                }
            }
            let q = queryParams.slice(1)
            const origin = process.env.FRONTEND + "/#"
            res.redirect(`${origin}/auth/callback/facebook?${q}`)
            req.user = {
                id: user._id,
                email: user.email
            }
        }

    })(req, res);
});

router.get('/auth/social/login/google', passport.authenticate('google', {session:  false, scope: ['profile', 'email']}));
router.get('/auth/social/login/facebook', passport.authenticate('facebook'));


export default router
