import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    // added "unique property" for user schema so only new user can reach here
    const user = await User.create({ username, email, password: hashedPassword });
    console.log(hashedPassword);
    
    res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
