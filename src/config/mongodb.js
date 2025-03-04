import 'dotenv/config'
import {MongoClient, ServerApiVersion} from 'mongodb'

let clothesShopDatabseIntance = null

const mongoClientInstance = new MongoClient(process.env.MONGODB_URI,{
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const CONNECT_DB = async () =>{
    await mongoClientInstance.connect()

    clothesShopDatabseIntance = mongoClientInstance.db(process.env.DATABASE_NAME)
}

export const CLOSE_DB = async () =>{
    await mongoClientInstance.close()
}
 
export const GET_DB = () =>{
    if(!clothesShopDatabseIntance) throw new Error('Must connect to Database first!')
    return clothesShopDatabseIntance
}