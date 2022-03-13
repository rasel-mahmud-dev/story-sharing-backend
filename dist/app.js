'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const console_1 = __importDefault(require("./console"));
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
require('dotenv').config();
const database_1 = require("./database");
(0, console_1.default)();
Promise.resolve().then(() => __importStar(require("./passport/oauth")));
Promise.resolve().then(() => __importStar(require("./passport/facebook")));
// App
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: false }));
const whitelist = ['http://localhost:5500', 'http://localhost:3000', 'http://192.168.43.170:3000'];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(null, true); // anyone can access this apis
            // callback(new Error('Not allowed by CORS'))
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
if (process.env.NODE_ENV === "development") {
    const routes = require("../src/routers");
    routes(app);
}
else {
    console.log("dsf");
    const routes = require("./routers");
    routes(app);
}
// app.get('/', async (req, res) => {
//   let markdownDir = path.resolve(process.cwd() + "/markdown")
//   try{
//     let file  = await readdir(markdownDir)
//     res.json({markdown: file});
//
//   } catch(ex){
//     res.json({message: ex.message});
//   }
//
// });
//
// app.get('/api/posts', (req, res) => {
//   res.send([{name: "Rasel"}]);
// });
//
//
// app.post('/file', async (req, res) => {
//
//   let { content, filenName } = req.body
//
//   let data = "Hello this is file"
//   let p = path.resolve(process.cwd() + `/markdown/${filenName}`)
//   try{
//     let file  = await writeFile(p, JSON.stringify(content))
//     res.json({message: "new file created.", filenName: p});
//
//   } catch(ex){
//     res.json({message: ex.message});
//   }
// });
//
// app.get('/file/:filename', async (req, res) => {
//   console.log("sdf")
//   let p = path.resolve(process.cwd() + `/markdown/${req.params.filename}`)
//
//   try{
//     let content  = await readFile(p, "utf-8")
//     res.send(content);
//
//   } catch(ex){
//     res.json({message: ex.message});
//   }
// });
// app.post('/api/markdown/content', async (req, res) => {
//
//   const { filePath  } = req.body
//
//   let p = path.resolve(process.cwd() + `/${filePath}`)
//
//   try{
//     let content  = await readFile(p, "utf-8")
//
//     // node.js, "classic" way:
//     const md = new MarkdownIt({
//       highlight: function (str, lang) {
//         if (lang && hljs.getLanguage(lang)) {
//           try {
//             return hljs.highlight(str, { language: lang }).value;
//           } catch (__) {}
//         }
//
//         return ''; // use external default escaping
//       }
//     });
//     const result = md.render(content);
//
//     res.send(result);
//
//   } catch(ex){
//     res.json({message: ex.message});
//   }
// });
(0, database_1.mongoConnect)().then((res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("mongodb connected");
    yield res.client.close();
})).catch(err => {
    console.log("mongodb connection fail.");
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNiLHNEQUE4QjtBQUM5QixnREFBd0I7QUFFeEIsd0RBQStCO0FBRy9CLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUxQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUE7QUFDckMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFBO0FBRTVDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUUxQix5Q0FBd0M7QUFHeEMsSUFBQSxpQkFBTyxHQUFFLENBQUE7QUFFVCxrREFBTyxrQkFBa0IsSUFBQztBQUMxQixrREFBTyxxQkFBcUIsSUFBQztBQUc3QixNQUFNO0FBQ04sTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFFdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUVqRCxNQUFNLFNBQVMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLDRCQUE0QixDQUFDLENBQUE7QUFDbEcsTUFBTSxXQUFXLEdBQUc7SUFDbEIsV0FBVyxFQUFFLElBQUk7SUFDakIsTUFBTSxFQUFFLFVBQVUsTUFBTSxFQUFFLFFBQVE7UUFDaEMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3BDLFFBQVEsQ0FB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