import { Router } from "express"; //package.json type=module that by we were able to use import statement ES6
import { config } from "dotenv"; //Loads environment variables from .env file
import {
  templateHello,
  sendText,
  sendImage,
  isStateOrUT,
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

      console.log("phone number " + phon_no_id);
      console.log("from " + from);
      console.log("body param " + msg_body);
      console.log("user name ", userName);

      //clear db
      if (msg_body === "clear db 1") {
        const u = await AppSource.createQueryBuilder()
          .delete()
          .from(User)
          .where("mobile = :mobile", { mobile: from })
          .execute();
        console.log("delete user ", u);
        sendText(
          phon_no_id,
          token,
          from,
          `successfully *deleted* your data from database`
        );
        return res
          .status(200)
          .send("successfully deleted your data from database");
      }

      const userRepo = AppSource.getRepository("User");
      const user = await userRepo.findOne({ where: { mobile: from } });
      let chat_status = "";
      if (!user) {
        //null
        chat_status = "template-hello";
      } else if (
        user.chat_status === "template-state" &&
        msg_body === "it's look good"
      ) {
        chat_status = "template-update-name";
      } else {
        chat_status = user.chat_status;
      }

      console.log("chat_status", chat_status, user);
      switch (chat_status) {
        case "template-hello":
          //create user and store user mobile number,name, in db
          const newUser = {};
          newUser.mobile = Number(from);
          newUser.name = userName;
          newUser.chat_status = "template-update-name";
          await userRepo.save(newUser);

          // send welcome message to user
          templateHello(phon_no_id, token, from, userName);
          console.log("done ");
          break;

        case "template-update-name":
          //get name from use
          if (msg_body === "it's look good") {
            user.chat_status = "template-state";
            await userRepo.save(user);
            //send select state message to user
            sendText(
              phon_no_id,
              token,
              from,
              "Enter your *state or union teritory* name."
            );
          } else if (isTextOnly(msg_body)) {
            user.name = msg_body;
            user.chat_status = "template-state";
            await userRepo.save(user); //save entery in table using OOPS concept
            //send select state message to user
            sendText(
              phon_no_id,
              token,
              from,
              "Enter your *state or union teritory* name."
            );
          } else sendText(phon_no_id, token, from, `Enter you *real* name`);

          break;
        case "template-state":
          //save state name in db
          const stateName = msg_body || null;

          const isValidStateOrUT = isStateOrUT(stateName);

          if (isValidStateOrUT) {
            user.state = stateName;
            user.chat_status = "finished";
            await userRepo.save(user);
            //send membership card user
            sendImage(phon_no_id, token, from);
          } else {
            sendText(
              phon_no_id,
              token,
              from,
              `*${msg_body}* is not a correct *state or union territory* name, \n \n Please enter *correct* name.`
            );
          }
          break;

        case "finished":
          //send membership card user, all time once registerd
          sendImage(phon_no_id, token, from);
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
  res.status(200).send("hello this is webhook setup");
});
