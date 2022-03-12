
require("dotenv").config()

import {mongoConnect} from "./database";


const app = require("../functions/server")

app.get("/sync", async (r, w) => {
  // let rr = await redisSync("localToCloud")
})

mongoConnect().then(async res=>{
  console.log("mongodb connected")
  await res.client.close()
}).catch(err=>{
  console.log("mongodb connection fail.")
  
})

const PORT = process.env.PORT || 3300
app.listen(PORT, "0.0.0.0", () => console.log(`server is running on port ${PORT}`))
