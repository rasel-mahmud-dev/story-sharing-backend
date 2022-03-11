'use strict';


import express from 'express';
import path from 'path'
import cors from  "cors"

import { writeFile, readdir, readFile } from "fs/promises"


const PORT = process.env.PORT || 8080
const HOST = process.env.HOST

// App
const app = express();
app.use(express.json())

const whitelist = ['http://example1.com', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.get('/', async (req, res) => {
  let markdownDir = path.resolve(process.cwd() + "/markdown")
  try{
    let file  = await readdir(markdownDir)  
    res.json({markdown: file});

  } catch(ex){
    res.json({message: ex.message});
  }
  
});

app.get('/api/posts', (req, res) => {
  res.send([{name: "Rasel"}]);
});


app.post('/file', async (req, res) => {
  
  let { content, filenName } = req.body

  let data = "Hello this is file"
  let p = path.resolve(process.cwd() + `/markdown/${filenName}`)  
  try{
    let file  = await writeFile(p, JSON.stringify(content))  
    res.json({message: "new file created.", filenName: p});

  } catch(ex){
    res.json({message: ex.message});
  }
});

app.get('/file/:filename', async (req, res) => {
 
  let p = path.resolve(process.cwd() + `/markdown/${req.params.filename}`)  

  try{
    let content  = await readFile(p, "utf-8")  
    res.send(content);

  } catch(ex){
    res.json({message: ex.message});
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);