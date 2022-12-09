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
        const routes = require("../src/routers");
        router.use(routes);
    }
    else {
        const routes = require("../dist/routers");
        router.use(routes);
    }
}
catch (ex) {
}
//
// // [GET] /.netlify/functions/api
// router.get("/", function (req: Request, res: Response) {
//     res.send("success /.netlify/functions/api" )
// })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyIuLi9mdW5jdGlvbnMvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQW1EO0FBQ25ELHdEQUFnQztBQUdoQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM5QyxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUN0QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDNUIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRzFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUUxQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztBQUUvQyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTVCLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN4QyxNQUFNLFdBQVcsR0FBRztJQUNoQixXQUFXLEVBQUUsSUFBSTtJQUNqQixNQUFNLEVBQUUsVUFBVSxNQUFXLEVBQUUsUUFBYTtRQUN4QyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0MsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUN2QjthQUFNO1lBQ0gsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQUU7Z0JBQ3hDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQyx1REFBdUQ7YUFDL0U7aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBLENBQUMsOEJBQThCO2dCQUM5RCw2Q0FBNkM7YUFDaEQ7U0FDSjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtBQUUxQixNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBR2hDLElBQUk7SUFDQSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsRUFBRTtRQUN4QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3JCO1NBQU07UUFDSCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3JCO0NBQ0o7QUFBQyxPQUFPLEVBQUUsRUFBRTtDQUVaO0FBRUQsRUFBRTtBQUNGLG1DQUFtQztBQUNuQywyREFBMkQ7QUFDM0QsbURBQW1EO0FBQ25ELEtBQUs7QUFHTCxVQUFVO0FBQ1YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFZLEVBQUUsR0FBYTtJQUM5QyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFDLENBQUE7QUFHRixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBRSw0QkFBNEI7QUFHekUsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUE7QUFFN0gsa0JBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQyxDQUFBO0FBR0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDckIsa0JBQWUsR0FBRyxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyJ9