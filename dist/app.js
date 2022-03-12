'use strict';
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
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const promises_1 = require("fs/promises");
const highlight_js_1 = __importDefault(require("highlight.js"));
const database_1 = require("./database");
const console_1 = __importDefault(require("./console"));
const routers_1 = __importDefault(require("../src/routers"));
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
require('dotenv').config();
(0, console_1.default)();
require("../src/passport/oauth");
require("../src/passport/facebook");
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
(0, routers_1.default)(app);
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
app.post('/api/markdown/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filePath } = req.body;
    let p = path_1.default.resolve(process.cwd() + `/${filePath}`);
    try {
        let content = yield (0, promises_1.readFile)(p, "utf-8");
        // node.js, "classic" way:
        const md = new markdown_it_1.default({
            highlight: function (str, lang) {
                if (lang && highlight_js_1.default.getLanguage(lang)) {
                    try {
                        return highlight_js_1.default.highlight(str, { language: lang }).value;
                    }
                    catch (__) { }
                }
                return ''; // use external default escaping
            }
        });
        const result = md.render(content);
        res.send(result);
    }
    catch (ex) {
        res.json({ message: ex.message });
    }
}));
(0, database_1.mongoConnect)().then((res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("mongodb connected");
    yield res.client.close();
})).catch(err => {
    console.log("mongodb connection fail.");
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFFYixzREFBOEI7QUFDOUIsZ0RBQXVCO0FBQ3ZCLGdEQUF3QjtBQUN4Qiw4REFBb0M7QUFDcEMsMENBQTBEO0FBQzFELGdFQUErQjtBQUMvQix5Q0FBd0M7QUFDeEMsd0RBQStCO0FBRS9CLDZEQUFtQztBQUVuQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFMUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFBO0FBQ3JDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO0FBSTdCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUcxQixJQUFBLGlCQUFPLEdBQUUsQ0FBQTtBQUVULE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2hDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0FBR25DLE1BQU07QUFDTixNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFBO0FBRWpELE1BQU0sU0FBUyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQTtBQUNsRyxNQUFNLFdBQVcsR0FBRztJQUNsQixXQUFXLEVBQUUsSUFBSTtJQUNqQixNQUFNLEVBQUUsVUFBVSxNQUFNLEVBQUUsUUFBUTtRQUNoQyxJQUFJLFNBQVMsQ0FBQyxPQUFP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