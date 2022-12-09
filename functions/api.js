"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const serverless = require('serverless-http');
const app = (0, express_1.default)();
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.disable('x-powered-by');
const whitelist = [process.env.FRONTEND];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            if (process.env.NODE_ENV === "development") {
                callback(null, true); // anyone can access this apis when is development mode
            }
            else {
                callback(null, { origin: false }); // anyone can access this apis
                // callback(new Error('Not allowed by CORS'))
            }
        }
    }
};
app.use(cors(corsOptions));
const router = express_1.default.Router();
try {
    if (process.env.NODE_ENV === "development") {
        // const routes = require("../src/routers")
        // router.use(routes)
    }
    else {
        const routes = require("../dist/routers");
        router.use(routes);
    }
}
catch (ex) {
}
// [GET] /
app.get("/", function (req, res) {
    res.send("success " + req.url);
});
app.use(bodyParser.json());
app.use('/.netlify/functions/api', router); // path must route to lambda
let CONNECTION_URI = process.env.NODE_ENV === "development" ? "mongodb://127.0.0.1:27017/dev-story" : process.env.MONGODB_URI;
mongoose_1.default.connect(CONNECTION_URI).then(r => {
    console.log("database connected");
}).then(err => {
    console.log(err);
});
module.exports = app;
exports.default = app;
module.exports.handler = serverless(app);
