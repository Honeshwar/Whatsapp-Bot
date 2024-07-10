// console.log("hi")
import express, { urlencoded } from "express";//package.json type=module that by we were able to use import statement ES6
import {route} from './route/index.js'
const PORT = 8000;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use("/",route)

app.listen(PORT,(err)=>{
    if(err)
        return console.log("error while running to server...")
    console.log("Server is running...")
})