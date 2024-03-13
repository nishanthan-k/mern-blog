import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("DB Connection Error", err));


  const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log("App is listening"));
