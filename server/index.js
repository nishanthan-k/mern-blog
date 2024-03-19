import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import errorHandler from "./middlewares/error/errorHandler.js";
import cors from 'cors'

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("DB Connection Error", err));

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this origin
//     credentials: true, // Allow sending cookies with the request
//   })
// );
app.use(express.json())


// routes
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)


app.use(errorHandler)

app.listen(PORT, () => console.log("App is listening"));
