import UserModel from "../../Model/UserSchema.js";
import bcrypt from "bcrypt";
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await UserModel.findOne({ email });
    if (!data) return res.status(400).json({ message: "user Not found" });

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch)
      return res.status(400).json({ message: "passowrd not matched" });
    else {
      return res.status(200).json({
        username: data.username,
        email: data.email,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
