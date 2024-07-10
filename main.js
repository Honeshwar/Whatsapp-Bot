// console.log("hi")
import express from "express";//package.json type=module that by we were able to use import statement ES6

const PORT = 8000;

const app = express();
app.get('/webhook',(req,res)=>{
    console.log("webhook called");
})
app.listen(PORT,(err)=>{
    if(err)
        return console.log("error while running to server...")
    console.log("Server is running...")
})