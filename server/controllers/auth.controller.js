import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import customError from "../middlewares/error/customError.js";

export const signup = async (req, res, next) => {
  console.log("reached signup route");
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(customError(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    console.log('signup error occured')
    next(error);
  }
};
