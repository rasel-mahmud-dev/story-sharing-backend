'use strict';
import express from 'express';
import cors from  "cors"

import logLine from "./console"


const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "localhost"

require('dotenv').config()

import {mongoConnect} from "./database";


logLine()

import("./passport/oauth")
import("./passport/facebook")


// App
const app = express();
app.use(express.json())

app.use(bodyParser.urlencoded({extended: false}))

const whitelist = ['http://localhost:5500', 'http://localhost:3000', 'http://192.168.43.170:3000']
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true) // anyone can access this apis
      // callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

if(process.env.NODE_ENV === "development") {
  const routes = require("../src/routers")
  routes(app)
} else {
  console.log("dsf")
  const routes = require("./routers")
  routes(app)
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



mongoConnect().then(async res=>{
  console.log("mongodb connected")
  await res.client.close()
}).catch(err=>{
  console.log("mongodb connection fail.")
  
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);