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
    return next(customError(400, "Email is required"));
  }

  if (!password || password === "") {
    return next(customError(400, "Password is required"));
  }

  try {
    const user = await User.findOne({ email });
    const vaildPassword = bcryptjs.compareSync(password, user.password);

    if (!vaildPassword) {
      return next(customError(400, "Wrong Password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Signin successful",
      access_token: token,
      details: { ...rest },
    });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res.status(200).json({
        success: true,
        message: "Signin successful",
        access_token: token,
        details: { ...rest },
      });
    } else {
      const randomPassword = () => Math.random().toString(36).slice(-8);
      const generatedPassword = randomPassword() + randomPassword();
      const newUser = new User({
        username: name,
        email: email,
        password: generatedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res.status(200).json({
        success: true,
        message: "Signin successful",
        access_token: token,
        details: { ...rest },
      });
    }
  } catch (error) {
    next(error);
  }
};
