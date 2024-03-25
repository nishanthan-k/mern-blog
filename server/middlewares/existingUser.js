import User from "../models/user.model.js";
import customError from "./error/customError.js";

export const existingUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log(email)
    console.log(user)
    if (!user) {
      next(customError(403, "User not found"))
    } else {
      console.log('go to next')
      next();
    }
  } catch (error) {
    next(error);
  }
};
