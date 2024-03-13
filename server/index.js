import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("DB Connection Error", err));

const app = express();
const PORT = process.env.PORT || 5000;


app.use("/user", userRoutes)

app.listen(PORT, () => console.log("App is listening"));
