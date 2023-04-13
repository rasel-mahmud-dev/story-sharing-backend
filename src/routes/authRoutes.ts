import express from "express";
import passport from "passport"
import controllers from "../controllers"
import getAuthID from "../middlewares/getAuthID";
import {loginWithGoogle} from "../controllers/authController";


const router: any = express.Router()


router.get("/auth/user/:email", controllers.authController.getUserEmail)

router.post("/auth/login", controllers.authController.loginUser)

router.get("/users/:username", controllers.authController.getUser)

router.post("/auth/users", getAuthID, controllers.authController.getUsers)

router.get("/auth/current-auth", controllers.authController.loginViaToken)
router.post("/auth/register", controllers.authController.createNewUser)


router.post("/upload-profile-photo", getAuthID, controllers.authController.uploadProfilePhoto)

router.post("/upload-profile-cover-photo", getAuthID, controllers.authController.uploadProfileCoverPhoto)

router.post("/upload-markdown-image", getAuthID, controllers.authController.uploadMarkdownImage)

router.post("/update-profile", getAuthID, controllers.authController.updateProfile)

router.get("/get-auth-password", getAuthID, controllers.authController.getAuthPassword)

router.post("/auth/send/mail", controllers.authController.sendPasswordResetMail)

router.post("/auth/password-reset-session-check", controllers.authController.checkPasswordResetSessionTimeout)

router.post("/auth/reset-password", controllers.authController.changePassword)


router.get('/auth/social/login/google', passport.authenticate('google', {session:  false, scope: ['profile', 'email']}));
router.get('/auth/social/login/facebook', passport.authenticate('facebook', {session:  false}));

router.get('/auth/callback/google', passport.authenticate('google'), loginWithGoogle);
router.get('/auth/callback/facebook', passport.authenticate('facebook'), loginWithGoogle);



export default router
