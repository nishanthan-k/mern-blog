import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import customError from "../middlewares/error/customError.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      next(customError(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    // added "unique property" for user schema so only new user can reach here
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};
