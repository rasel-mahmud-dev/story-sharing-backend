const morgan = require("morgan")
require("dotenv").config()

import express, {Request, Response, NextFunction} from "express";


const cors = require("cors")
const bodyParser = require('body-parser');


import routes from "../routes";

const app = express()

var corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: false}));

app.disable('x-powered-by');


import CustomError from "../interfaces/CustomError";
import {initialMongodbIndexes} from "../services/mongodb/database.service";


// // indexing mongodb collections
// initialMongodbIndexes().then(() => {
//     console.log("collection are indexed")
// }).catch(err => {
//     console.log("collection indexing are fail")
//     console.log(err)
// })



app.use(morgan("dev"))


app.use(routes)


// global error route handler
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development") {
        console.log("from middleware: ", err)
    }

    let statusCode = 500
    if (err.statusCode) {
        statusCode = err.statusCode
    }

    let message = "Internal server error"

    if (typeof err === "string") {
        message = err
    } else if (typeof err.message === "string") {
        message = err.message
    }

    res.status(statusCode).json({message})
})

module.exports = app;
export default app;