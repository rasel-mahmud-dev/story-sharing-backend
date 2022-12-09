import express, {Request, Response} from "express";
import mongoose from "mongoose";

const serverless = require('serverless-http');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');


require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.disable('x-powered-by');

const whitelist = [process.env.FRONTEND]
const corsOptions = {
    credentials: true,
    origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            if (process.env.NODE_ENV === "development") {
                callback(null, true) // anyone can access this apis when is development mode
            } else {
                callback(null, {origin: false}) // anyone can access this apis
                // callback(new Error('Not allowed by CORS'))
            }
        }
    }
}

app.use(cors(corsOptions))

const router = express.Router();



try {
    if (process.env.NODE_ENV === "development") {
        const routes = require("../src/routers")
        router.use(routes)
    } else {
        const routes = require("../dist/routers")
        router.use(routes)
    }
} catch (ex) {

}


// [GET] /
app.get("/", function (req: Request, res: Response) {
    res.send("success " + req.url)
})


app.use(bodyParser.json());
app.use('/.netlify/functions/api', router);  // path must route to lambda


let CONNECTION_URI = process.env.NODE_ENV === "development" ? "mongodb://127.0.0.1:27017/dev-story" : process.env.MONGODB_URI

mongoose.connect(CONNECTION_URI).then(r => {
    console.log("database connected")
}).then(err => {
    console.log(err)
})


module.exports = app;
export default app;
module.exports.handler = serverless(app);

