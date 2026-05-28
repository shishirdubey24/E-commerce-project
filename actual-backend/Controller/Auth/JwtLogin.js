import UserModel from "../../Model/UserSchema.js";
export const JwtLogin = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        isAuthenticated: false,
        message: "User account no longer exists.",
      });
    }
    return res.status(200).json({
      message: "Session data retrieved",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("GetMe Profile Endpoint Failure:", error.message);
    return res.status(500).json({
      message: "Internal server error during profile retrieval.",
    });
  }
};
