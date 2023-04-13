In this tutorial, we will create an authentication system that will users log in using Google Sign-In.


I used for this tutorial.

* Languages: `Node`, `Express.js`, `Mongodb`
* Tools Used: `Passport.js`


<br>

# Introduction

Each Https/Http Request is stateless. there are no any way to detect who make a request a second ago.
So, solve this problem. comes us Authentication system.
Authentication is critical in verifying a user's identity.

<br>
<br>


# Setup the Google Cloud Project
<br>

In order to add the Sign in with Google button, we have to create the Google Cloud project which will give us the relevant client key and secret to be able            to communicate with Google to authenticate a user.

1. Navigate to Google Cloud Console and add a New Project [click](https://console.cloud.google.com/) </br>
   ![](https://res.cloudinary.com/dbuvg9h1e/image/upload/v1645876154/2022-02-26_174541.jpg)


like above picture. I create a project Ecommerce-App. 

2. On the Dashboard Menu,  click on Go to APIs overview

3. Select the Credentials tab in the panel on the left side

4. Click Create Credentials and then OAuth Client ID
5. Select Application Type to be Web 

6. Add Authorized Redirect URIs to be: http://localhost:3000/auth/google and  http://localhost:3000/auth/google/callback

![image](https://res.cloudinary.com/dbuvg9h1e/image/upload/v1645877148/2022-02-26_180525.jpg)

Google will generate unique Client ID and Client Secret keys for project. Create a new file called .env and add your keys and callback URL in there like so,



```bash
CLIENT_ID = YOUR CLIENT ID
CLIENT_SECRET = YOUR CLIENT SECRET
CALLBACK_URL = http://localhost:3000/auth/google/callback
```



Ok we are done Google Project all setup complete. now let's start code our node.js Application.

<br>
<br>

# Setup the Node.js project 

<br>


Let's start by creating a new project folder like nodejs-auth-app and add a  `package.json`

```json
{
  "name": "nodejs-auth-app",
  "version": "1.0.0",
  "author": "rasel-mahmud",
  "description": "node-google-auth",
  "main": "app.js",
  "scripts": {
    "start": "set NODE_ENV=development&ts-node-dev --respawn --transpile-only app.ts"
  },
  "license": "ISC",
  "dependencies": {
    "axios": "^0.25.0",
    "cors": "^2.8.5",
    "body-parser": "^1.18.2",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "passport": "^0.5.2",
    "passport-google-oauth20": "^2.0.0",
    "mongodb": "^4.4.0",
    "jsonwebtoken": "^8.5.1"
  },
  "devDependencies": {
    "@types/node": "^16.11.7",
    "ts-node-dev": "^1.1.8",
    "typescript": "^4.4.4"
  }
}
```

<br>

Install dependencies by running,

```bash
npm install
```

<br>
<br>

## **Set up a basic Express Server**
<br>

Create a new file named `app.js`

```js
import express from 'express';
import bodyParser from 'body-parser';
import routes from "../src/routes";
import {mongoConnect} from "./database";

require('dotenv').config()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs');
app.set('views', path.resolve("src/views"));

// import google-oauth2.0 that passport Stategy
require("./passport/google")
// initiate all routes
routes(app)


mongoConnect().then(async res => {
    console.log("mongodb connected")
    await res.client.close()
}).catch(err => {
    console.log("mongodb connection fail.")

})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))




```

<br>


Our project directory we create a directory database and inside we create index.ts file that connect out mongodb database

```bash
touch database/index.js
```
<br>

```tsx
import { MongoClient, Db, Collection, ServerApiVersion } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017";

export function mongoConnect(collectionName?: string){
  const client = new MongoClient(uri, {
    useNewUrlParser: true, useUnifiedTopology: true,
  });
  
  return new Promise<{c?: Collection, client: MongoClient, db: Db}>(async (resolve, reject)=>{
      try {
        // Connect the client to the server
        await client.connect();
        
		
        let db = await client.db("ecommerce-app")
        
        // perform actions on the collection object
        console.log("Connected successfully to server");
        
        if(collectionName){
            let collection = await db.collection(collectionName)
            resolve({collection, client, db: db})
          } else {
            resolve({db: db, client})
          }
      } catch (ex){
        errorConsole(ex)
        reject(ex)
      } finally {
        // don't close client here. 
        // await client.close(); 
      }
  })
}
```
<br>



Launch the app by running,

```bash
npm start
```

The application should be live at [http://localhost:3000](http://localhost:3000/).

All the basic setup is now done! Let's move on to the meat of the application.

<br>


```
mongod
```

A local Mongo instance should start up on `mongo://127.0.0.1:27017`

<br>
<br>


## **Create  User  Class Model**

<br>

```ts
class User {
  static collectionName = "users"
  _id: string;
  googleId: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  created_at: string;
  updated_at: string;
  avatar?: string;
  
  constructor({ _id = "",  googleId, first_name, last_name, email, password, created_at, updated_at, avatar }) {
    this._id = "",
    this.googleId = googleId,
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.password = password
    this.created_at = created_at
    this.updated_at = updated_at
    this.avatar = avatar
  }
  
  // save a new user instance  
   save(){
    return new Promise(async (resolve, reject)=>{
      let client;
      try{
        let { _id, ...other} = this
        let { collection,  client: cc} = await mongoConnect(User.collectionName)
        client = cc
         let newInserted = await Collection.insertOne(other)
         other._id = newInserted.insertedId
         resolve(other)
      } catch (ex) {
        console.log(ex.messages)
        reject(ex)
     
      } finally {
        client?.close()
      }
    })
  } 
    
  static findOne(match: object) {
    return new Promise(async (resolve, reject) => {
      let client
      try{
        let {collection, client: cc } = await mongoConnect(User.collectionName)
        client = cc;
        let user = await collection.findOne(match)
        if(user){
          resolve(user)
        } else {
          resolve(null)
        }
      } catch (ex){
        reject(ex)
        console.log(ex)
      } finally {
        client?.close()
      }
    })
  }
 
}

export default User


```


<br>
<br>

# Now we will  Set up Passport.js for Google
<br>

Passport.js is a great NPM package that simplifies adding a social login to a web app. We will use the Google Strategy to authenticate a user with their Gmail account.

create a directory passport and inside a file google.ts

```bash
touch passport/google.ts
```



```js
import passport from "passport"
import User from "../models/User";
import {createToken}  from "../jwt";

const GoogleStrategy  = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_REDIRECT_URL
 },
 async function(accessToken, refreshToken, profile, cb) {
  
  try{
   
   let user = await User.findOne({googleId: profile.id}, {})
   if(user){
    let token = createToken(user._id, user.email)
    let { password, ...other } = user
    return cb(null, {...other, token});
   } else {
    // create a new user
    user = {
     avatar: profile.photos && profile.photos[0] && profile.photos[0].value,
     email: profile.emails &&  profile.emails[0] && profile.emails[0].value,
     googleId: profile.id,
     password: "",
     first_name: profile.displayName,
     last_name: "",
     created_at: Date.now(),
     updated_at: Date.now(),
    }
    user = new User(user)
    user = await user.save(true)
    let token = createToken(user._id, user.email)
    let { password, ...other } = user
    return cb(null, {...other, token});
   }
   
  } catch (ex){
    return cb(err, null);
  }
 }
));


passport.serializeUser(function(user, done) {
 done(null, user);
});
```

<br>
<br>

# Ok now we will create routes for rest-api
<br>

```js
export default (app) =>{
    app.get("/auth/google",  passport.authenticate("google", {
        scope: ["profile", "email"],
      })
	);
    app.get("/auth/google/callback", passport.authenticate("google"), function(req, res){
        let user = req.user 
        if(user){
        	res.redirect("/your react routing path") // login success
        } else {
           res.redirect("/your react routing path") // login fail
        }
    })
}

```



Run the application with:

`npm start	`

Once started, we hit http://localhost:3000/auth/google from client side react or vue js any app.

node js app will redirect google signin page.
<br>

![](https://res.cloudinary.com/dbuvg9h1e/image/upload/v1645881482/image-4.png)

Google's OAuth Login screen triggered by "Sign in with Google" button

