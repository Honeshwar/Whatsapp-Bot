// console.log("hi")
import express, { urlencoded } from "express";//package.json type=module that by we were able to use import statement ES6
import {config} from 'dotenv'//Loads environment variables from .env file
config();
const mytoken = process.env.WEBHOOK_VERIFY_TOKEN;
console.log(mytoken);

const PORT = 8000;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//to verify the callback url from dashboard side - cloud api side
app.get('/webhook',(req,res)=>{
    console.log("webhook called for verification by whatsapp API");
    let mode=req.query["hub.mode"];
    let challange=req.query["hub.challenge"];
    let token=req.query["hub.verify_token"];
 
 console.log(mode,challange,token);
     if(mode && token){
 
         if(mode==="subscribe" && token===mytoken){
             res.status(200).send(challange);
         }else{
             res.status(403);
         }
 
     }
})
app.listen(PORT,(err)=>{
    if(err)
        return console.log("error while running to server...")
    console.log("Server is running...")
})