import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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
    console.log("signup error occured");
    next(error);
  }
};

export const signin = async (req, res, next) => {
  console.log("signin reached");
  const { email, password } = req.body;

  if (!email || email === "") {
    // return res.status(400).json({message: "Email is required"});
    return next(customError(400, "Email is required"));
  }
  
  if (!password || password === "") {
    // return res.status(400).json({ message: "Password is required" });
    return next(customError(400, "Password is required"));
  }

  try {
    // passwords are hashed so don't check for password
    const user = await User.findOne({ email });

    if (!user) {
      //  return res.status(404).json({message: "User not found"});
      return next(customError(404, "User not found"))
    }

    const vaildPassword = bcryptjs.compareSync(password, user.password);

    if (!vaildPassword) {
      //  return res.status(400).json({message: "Wrong Password"});
      return next(customError(400, "Wrong Password"))
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const {password: pass, ...rest} = user._doc    
    res.status(200).json({
        success: true,
        message: "Signin successful",
        access_token: token,
        details: {...rest}
      });
  } catch (error) {
    next(error);
  }
};
