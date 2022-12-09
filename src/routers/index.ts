require("../models")
require("../passport/oauth")

import postRoutes from "./postRoutes"
import authRoutes from "./authRoutes";
// import appAdminRoutes from "./appAdminRoutes";
import express from "express";




// require("../passport/oauth")
// require("../passport/facebook")

const router = express.Router()


router.get("/", (req, res) => {
    res.send("Hello")
})

router.use("/api", postRoutes)
router.use("/api", authRoutes)
// router.use("/api", appAdminRoutes)


export default router
module.exports = router

