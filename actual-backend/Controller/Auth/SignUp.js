import UserModel from "../../Model/UserSchema.js";
import bcrypt from "bcrypt";
export const SignUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
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

    //call the moedl and save it
    //first create the user tehn save it
    await UserModel.create({
      username,
      password: hashPassword,
      email,
    });

    res.status(201).json({ message: "user saved successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
