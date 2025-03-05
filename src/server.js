import express from 'express'
import { CONNECT_DB,CLOSE_DB, GET_DB } from "./config/mongodb.js";
import exitHook from 'async-exit-hook'
import 'dotenv/config'
import {APIs_v1} from './Routes/v1/index.js'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleWare.js';
const app = express()

const START_SERVER = () => {
    app.use(express.json())

    app.use('/v1',APIs_v1)

    //Middleware handle error
    app.use(errorHandlingMiddleware)

    app.get("/", async (req, res) => {
        console.log(await GET_DB().listCollections().toArray())
      res.send("Server is running");
    });
    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  
    exitHook(()=>{
      CLOSE_DB()
      console.log("Disconnected MongoDB")
    })
  };


CONNECT_DB()
.then(() => console.log("Connected to MongoDB")) 
.then(START_SERVER())
.catch(error =>{
  console.log(error)
  process.exit(0)
})