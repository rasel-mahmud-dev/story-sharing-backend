import {redisConnect} from "../database";
import errorConsole from "../logger/errorConsole";

export function pullPostsFromCache(key: string = "posts"){

  return new Promise(async (resolve, reject)=>{
    let client;
    try {
      /** Get all posts from redis-server   */
      client = await redisConnect()
      // @ts-ignore
      let posts: any = await client.hGetAll(key)
      
      if(posts && (Object.keys(posts).length === 0)){
        return resolve(null)
      } else if(!posts){
        return resolve(null)
      }
      
      let postArr = []
      for (let postsKey in posts) {
        postArr.push(JSON.parse(posts[postsKey]))
      }
      resolve(postArr)
    } catch (ex){
      resolve(null)
    } finally {
      await client?.quit()
    }
  })
}



export function pushPostsIntoCache(key: string = "posts", posts: {}[]){

  
  return new Promise(async (resolve, reject)=>{
    let client;
    try {
      /** Get all posts from redis-server   */
      client = await redisConnect()
      // @ts-ignore
      let doc = await client.del(key)
      posts.forEach((post, index)=>{
        (async function (){
          // @ts-ignore
          let doc = await client.hSet(key, post._id.toString(), JSON.stringify(post))
          console.log(key + "inserted " + doc)
          if(posts.length === (index + 1)){
            resolve(true)
          }
        }())
      })
      
    } catch (ex){
      errorConsole(ex)
      resolve(null)
    } finally {
      client?.quit()
    }
  })
}

