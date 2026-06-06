import UserModel from "../../Model/UserSchema.js";
import bcrypt from "bcrypt";
export const SignUp = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "input UserName and Password" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    //hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.create({
      username,
      password: hashPassword,
      email,
      phone,
    });

    res.status(201).json({ message: "user saved successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
