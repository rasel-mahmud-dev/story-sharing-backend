const jwt = require('jsonwebtoken')

export const createToken = (id, email, expiresIn?:string)=> {
  return jwt.sign({
      id: id,
      email: email,
    },
    process.env.SECRET, {expiresIn: expiresIn ? expiresIn : '5h'}
  )
}


export const parseToken = (token)=> {
   return new Promise<{id: number, email: string}>(async (resolve, reject)=>{
     try {
       if(token) {
         let d = await jwt.verify(token, process.env.SECRET)
         resolve(d)
       } else {
        reject(new Error("Token not found"))
       }
     } catch (ex){
       reject(ex)
     }
   })
}

export const getToken = (req)=> {
  return req.headers["authorization"]
}


