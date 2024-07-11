import { Router } from "express"; //package.json type=module that by we were able to use import statement ES6
import { config } from "dotenv"; //Loads environment variables from .env file
import {
  template1,
  templateEnterStateName,
  template3,
  isStateOrUT,
  templateChangeName,
  wrongInput,
  isTextOnly,
} from "../utils/common-function.js";
import { AppSource } from "../config/dbConfig.js";
import User from "../model/user.js";

config();
const token = process.env.WHATSAPP_API_ACCESS_TOKEN;
const mytoken = process.env.WEBHOOK_VERIFY_TOKEN;
console.log(mytoken);

export const route = Router();

//to verify the callback url from dashboard side - cloud api side
route.get("/webhook", (req, res) => {
  console.log("webhook called for verification by whatsapp API");
  let mode = req.query["hub.mode"];
  let challange = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  console.log(mode, challange, token); //subscribe 1890408503 apple
  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challange);
    } else {
      res.status(403);
    }
  }
});
route.post("/webhook", async (req, res) => {
  //i want some

  let body_param = req.body;
  console.log("--------------------------");
  console.log("body_param", body_param);
  console.log("body_param stringify", JSON.stringify(body_param, null, 2));
  console.log("--------------------------");
  if (body_param.object && !body_param.entry[0].changes[0].value.statuses) {
    console.log("inside body param");
    if (
      body_param.entry &&
      body_param.entry[0].changes &&
      body_param.entry[0].changes[0].value.messages &&
      body_param.entry[0].changes[0].value.messages[0] &&
      body_param.entry[0].changes[0].value.messages[0].type === "text" //otherwise again firest message send
    ) {
      let phon_no_id =
        body_param.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_param.entry[0].changes[0].value.messages[0].from;
      let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
      const userName =
        body_param.entry[0].changes[0].value.contacts[0].profile.name;
      let wantToChangeName =
        body_param?.entry[0]?.changes[0]?.value?.messages[0]?.button?.text;

      wantToChangeName = wantToChangeName
        ? wantToChangeName === "it's look good"
          ? false
          : true
        : false;

      console.log("phone number " + phon_no_id);
      console.log("from " + from);
      console.log("body param " + msg_body);
      console.log("user name ", userName);

      const userRepo = AppSource.getRepository("User");
      const user = await userRepo.findOne({ where: { mobile: from } });
      let chat_status = "";
      if (!user) {
        //null
        chat_status = "template-hello";
      } else if (wantToChangeName && user.chat_status !== "finished") {
        chat_status = "template-change-name";
      } else {
        chat_status = user.chat_status;
      }

      console.log("chat_status", chat_status, user);
      switch (chat_status) {
        case "template-hello":
          //create user and store user mobile number,name, in db
          const newUser = {};
          newUser.mobile = Number(from);
          // newUser.name = userName;
          newUser.chat_status = "template-use-whatsapp-registered-name";
          await userRepo.save(newUser);

          // send welcome message to user
          template1(phon_no_id, token, from, userName);
          console.log("done ");
          break;
        case "template-change-name":
          chat_status = "template-update-name";
          // send change name message to user
          templateChangeName(phon_no_id, token, from);
          console.log("done ");
          break;
        case "template-update-name":
          //get name from use

          if (isTextOnly(msg_body)) {
            user.name = msg_body;
            await userRepo.save(user); //save entery in table using OOPS concept
            user.chat_status = "template-state";
            //send select state message to user
            templateEnterStateName(phon_no_id, token, from);
            return;
          }

          wrongInput(phon_no_id, token, from, `Enter you *real* name`);

          break;
        case "template-use-whatsapp-registered-name":
          //get name from use
          user.name = userName;
          await userRepo.save(user); //save entery in table using OOPS concept
          user.chat_status = "template-state";

          //send select state message to user
          templateEnterStateName(phon_no_id, token, from);

          break;
        case "template-state":
          //save state name in db
          const stateName = msg_body || null;
          // body_param?.entry[0]?.changes[0]?.value?.messages[0]?.interactive
          //   ?.list_reply?.title || null;

          const isValidStateOrUT = isStateOrUT(stateName);

          if (isValidStateOrUT) {
            user.state = stateName;
            user.chat_status = "finished";
            await userRepo.save(user);
            //send membership card user
            template3(phon_no_id, token, from);
          } else {
            wrongInput(
              phon_no_id,
              token,
              from,
              `*${msg_body}* is not a correct *state or union territory* name, \n \n Please enter *correct* name.`
            );
          }
          break;

        case "finished":
          //send membership card user, all time once registerd
          template3(phon_no_id, token, from);
          break;

        default:
          console.log("error while chat status switch statement");
      }

      res.sendStatus(200);
      return;
    } else {
      res.sendStatus(404);
      return;
    }
  } else if (
    body_param.object &&
    body_param.entry[0].changes[0].value.statuses
  ) {
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
  // res.sendStatus(200);
  // return;
});

route.get("/", (req, res) => {
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Membership Card</title>
     <link rel="icon" href="https://cdn.pixabay.com/photo/2024/07/07/22/30/volcano-8879779_640.jpg" type="image/jpg">
    <meta property="og:title" content="Membership Card" />
    <meta property="og:description" content="Membership Card" />
    <meta
      property="og:image"
      content="https://cdn.pixabay.com/photo/2024/07/07/22/30/volcano-8879779_640.jpg"
    />
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
        body{
        height:99vh;
        background-color:black;
        display:flex;
        justifu=y-content:center;
        align-items:center;
        }
        img{
        object-fit:contain;
        }
    </style>
  </head>
  <body>
    <img
      width="100%"
      height="100%"
      src="https://cdn.pixabay.com/photo/2024/07/07/22/30/volcano-8879779_640.jpg"
      alt="membership card"
    />
  </body>
</html>
`); //send("hello this is webhook setup");
});

// axios({
//   method:"POST",
//   url:"https://graph.facebook.com/v20.0/"+phon_no_id+"/messages?access_token="+token,
// //    data:{
// //     "messaging_product": "whatsapp",
// //     "recipient_type": "individual",
// //     to:from,
// //     "type": "interactive",
// //     "interactive": {
// //       "type": "list",
// //       "header": {
// //         "type": "text",
// //         "text": "Choose Shipping Option"
// //       },
// //       "body": {
// //         "text": "Which shipping option do you prefer?"
// //       },
// //       "footer": {
// //         "text": "Lucky Shrub: Your gateway to succulents™"
// //       },
// //       "action": {
// //         "button": "Shipping Options",
// //         "sections": [
// //           {
// //             "title": "I want it ASAP!",
// //             "rows": [
// //               {
// //                 "id": "priority_express",
// //                 "title": "Priority Mail Express",
// //                 "description": "Next Day to 2 Days"
// //               },
// //               {
// //                 "id": "priority_mail",
// //                 "title": "Priority Mail",
// //                 "description": "1–3 Days"
// //               }
// //             ]
// //           },
// //           {
// //             "title": "I can wait a bit",
// //             "rows": [
// //               {
// //                 "id": "usps_ground_advantage",
// //                 "title": "USPS Ground Advantage",
// //                 "description": "2–5 Days"
// //               },
// //               {
// //                 "id": "media_mail",
// //                 "title": "Media Mail",
// //                 "description": "2–8 Days"
// //               }
// //             ]
// //           }
// //         ]
// //       }
// //     }
// //   }
// data:{
//    "messaging_product": "whatsapp",
//    "recipient_type": "individual",
//    to:from,
//    "type": "template",
//    "template": {
//      "name": "template1",
//      "language": {
//        "code": "en_US"
//      },
//      "components": [
//        {
//          "type": "body",
//          "parameters": [
//            {
//              "type": "text",
//              "text": userName
//            },
//          ]
//        }
//      ]
//    }
//  }
//    ,
// //    {
// //        messaging_product:"whatsapp",
// //        to:from,
// //        text:{
// //            body:"Hi.. I'm Bot, your message is "+msg_body
// //        }
// //    },
//   headers:{
//       "Content-Type":"application/json"
//   }

// });
