import * as Mongoose from "mongoose";
require("dotenv").config();

let db: Mongoose.Connection;

export const connect = () => {
  const uri = process.env.MONGODB_URI;
  console.log("from connect: process.env.MONGODB_URI :::", process.env.MONGODB_URI);

  if (db) return;

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  db = Mongoose.connection;

  db.once("open", async () => {
    console.log("connected to db");
  });

  db.on("error", err => {
    console.log("error connecting to db :::", err);
  });
};

export const disconnect = () => {
  if (!db) return;

  Mongoose.disconnect();

  db.once("close", async () => {
    console.log("disconnected to db");
  });
};