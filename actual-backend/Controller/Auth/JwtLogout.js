export const JwtLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      partitioned: true,
    });
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Logout Error:", error);
    return res.status(500).json({
      message: "Internal server error during logout",
    });
  }
};
