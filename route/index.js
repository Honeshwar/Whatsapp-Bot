import { Router } from "express";//package.json type=module that by we were able to use import statement ES6
import {config} from 'dotenv'//Loads environment variables from .env file
import axios from "axios"
config();
const token = process.env.WHATSAPP_API_ACCESS_TOKEN;
const mytoken = process.env.WEBHOOK_VERIFY_TOKEN;
console.log(mytoken);

export const route = Router();



//to verify the callback url from dashboard side - cloud api side
route.get('/webhook',(req,res)=>{
    console.log("webhook called for verification by whatsapp API");
    let mode=req.query["hub.mode"];
    let challange=req.query["hub.challenge"];
    let token=req.query["hub.verify_token"];
 
 console.log(mode,challange,token);//subscribe 1890408503 apple
     if(mode && token){
 
         if(mode==="subscribe" && token===mytoken){
             res.status(200).send(challange);
         }else{
             res.status(403);
         }
 
     }
})
route.post("/webhook",(req,res)=>{ //i want some 

    let body_param=req.body;
    console.log("--------------------------");
    console.log("body_param",body_param);
    console.log("body_param stringify",JSON.stringify(body_param,null,2));
    console.log("--------------------------");
    if(body_param.object && !body_param.entry[0].changes[0].value.statuses){
        console.log("inside body param");
        if(body_param.entry && 
            body_param.entry[0].changes && 
            body_param.entry[0].changes[0].value.messages && 
            body_param.entry[0].changes[0].value.messages[0]  && body_param.entry[0].changes[0].value.messages[0].type==="text"  //otherwise again firest message send
            ){
               let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
               let from = body_param.entry[0].changes[0].value.messages[0].from; 
               let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

               console.log("phone number "+phon_no_id);
               console.log("from "+from);
               console.log("boady param "+msg_body);

               axios({
                   method:"POST",
                   url:"https://graph.facebook.com/v20.0/"+phon_no_id+"/messages?access_token="+token,
                   data:{
                       messaging_product:"whatsapp",
                       to:from,
                       text:{
                           body:"Hi.. I'm Bot, your message is "+msg_body
                       }
                   },
                   headers:{
                       "Content-Type":"application/json"
                   }

               });

               res.sendStatus(200);
               return;
            }else{
                res.sendStatus(404);  return;
            }
           
    }else if(body_param.object && body_param.entry[0].changes[0].value.statuses){
         res.sendStatus(200);
    return;
    }

    res.sendStatus(404);
    // res.sendStatus(200);
    // return;

});

route.get("/",(req,res)=>{
    res.status(200).send("hello this is webhook setup");
});