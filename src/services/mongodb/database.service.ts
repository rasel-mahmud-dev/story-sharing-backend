import * as mongoDB from "mongodb";
import {Db, MongoClient} from "mongodb";


const mongoClient = new MongoClient(process.env.MONGODB_URI as string);
const clientPromise = mongoClient.connect();
let database: Db;
let DB_NAME = "my-blog"

export async function mongoConnect() {
    return new Promise<mongoDB.Db>((async (resolve, reject) => {
        try {
            if (!database) {
                database = (await clientPromise).db(DB_NAME);
            }
            resolve(database)
        } catch (ex) {
            reject(ex)
        }
    }))
}


// for initial database connection and create indexes
export async function initialMongodbIndexes() {

    const User = require("../../models/User");
    
    const COLLECTIONS = [
        User,
    ]
    
    return new Promise((async () => {
        try {
            let client = (await clientPromise)
            
            let db = client.db(DB_NAME);

            COLLECTIONS.forEach((colItem) => {
                let collection = db.collection(colItem.collectionName)
                let indexes = colItem.indexes;
                if (!indexes) return;
                for (let indexesKey in indexes) {
                    collection.createIndex([indexesKey], indexes[indexesKey] as any, (a) => {
                        if (a) {
                            console.log(a.message)
                        } else {
                            console.log(`${colItem.name} collection indexed completed`)
                        }
                    })
                }
            })
        } catch (ex: any) {
            console.log(ex.message)
        }
    }))
    
}


