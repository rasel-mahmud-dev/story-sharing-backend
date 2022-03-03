'use strict';


import express from 'express';
import path from 'path'

import { writeFile, readdir } from "fs/promises"

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST

// App
const app = express();
app.get('/', async (req, res) => {
  let p = path.join(__dirname, "..")
  try{
    let file  = await readdir(p)  
    res.json({files: file});

  } catch(ex){
    res.json({message: ex.message});
  }
  
});

app.get('/api/posts', (req, res) => {
  res.send([{name: "Rasel"}]);
});


app.post('/file', async (req, res) => {
  let data = "Hello this is file"
  let p = path.join(__dirname, "..", "newfile.md")
  try{
    let file  = await writeFile(p, JSON.stringify(data))  
    res.json({message: "new file created.", path: p});

  } catch(ex){
    res.json({message: ex.message});
  }
});







app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
