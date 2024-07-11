import {DataSource} from "typeorm";
import { config } from "dotenv";
import  User  from "../model/user.js";

// config({ path: ".env.prod" });
config();

export const AppSource = new DataSource({
  type: "mysql", //type of database
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  logging: true,
  synchronize: true, //automatically generate on launch of seserver schema create in db , tables created based on schema/entities/model that we pass it it
  entities: [User], //"../entities/*{.ts,.js}"
}); //source where add ,get ,..//DataSource is a pre-defined connection configuration
