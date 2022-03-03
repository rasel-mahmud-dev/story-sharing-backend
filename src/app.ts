'use strict';


import express from 'express';
import path from 'path'

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World - NodeJS is running on FlashDrive!');
});

app.get('/api/posts', (req, res) => {
  res.send([{name: "Rasel"}]);
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
