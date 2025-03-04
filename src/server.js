import express from 'express'

const app = express()

const host = 3025

app.get('/', function(req, res){
    res.send('Hello world')
})

app.listen(host,() =>{
    console.log(`Connect to server at http://localhost:${host}`)
})