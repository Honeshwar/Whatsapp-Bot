// console.log("hi")
import express, { urlencoded } from "express"; //package.json type=module that by we were able to use import statement ES6
import { route } from "./route/index.js";
import { AppSource } from "./config/dbConfig.js";
const PORT = 8000;
const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", route);

// app.listen(PORT,(err)=>{
//     if(err)
//         return console.log("error while running to server...")
//     console.log("Server is running...")
// })
AppSource.initialize() //db connect ho
  .then(async () => {
    console.log("DATABASE IS CONNECTED SUCCESSFULLY");
    // const userRepo = AppSource.getRepository("User");
    // const users = await userRepo.findOne({where:{mobile:"0789"}})
    // console.log("user repo",userRepo,users);
    app.listen(PORT, (err) => {
      if (err) return console.log("error while running to server...");
      console.log("Server is running...");
    });
  })
  .catch((err) =>
    console.log("error while connecting to database ", err, {
      type: "mysql",
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USERNAME,
      port: Number(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD,
    })
  );
