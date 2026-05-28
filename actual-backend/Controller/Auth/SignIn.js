import UserModel from "../../Model/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await UserModel.findOne({ email });
    if (!data) return res.status(400).json({ message: "user Not found" });

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch)
      return res.status(400).json({ message: "password not matched" });

    const payload = {
      id: data._id,
      username: data.username,
      email: data.email,
      role: data.role || "user",
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User Data",
      token: token,
      user: {
        id: data._id,
        username: data.username,
        email: data.email,
        role: data.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
