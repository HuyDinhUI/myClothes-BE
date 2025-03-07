import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { CONNECT_DB,CLOSE_DB, GET_DB } from "./config/mongodb.js";
import exitHook from 'async-exit-hook'
import 'dotenv/config'
import {APIs_v1} from './Routes/v1/index.js'
import { corsOptions } from './config/corsOptions.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleWare.js';
const app = express()

const START_SERVER = () => {
    app.use(express.json())

    // Fix cache from disk from Express.js
    app.use((req, res, next)=>{
      res.set('Cache-Control', 'no-store')
      next()
    })

    //Use Cookie
    app.use(cookieParser())

    //Allow CORS
    app.use(cors(corsOptions))

    app.use('/v1',APIs_v1)

    //Middleware handle error
    app.use(errorHandlingMiddleware)

    app.get("/", async (req, res) => {
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