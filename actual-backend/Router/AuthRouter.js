import express from "express";
import { SignupValidation } from "../Middleware/AuthValidation/SignupValidation.js";
import { SignInValidation } from "../Middleware/AuthValidation/SignInValidation.js"; // Uncomment when ready
import { SignUp } from "../Controller/Auth/SignUp.js";
import { signIn } from "../Controller/Auth/SignIn.js";
import { JwtValiadtion } from "../Middleware/AuthValidation/JwtValidation.js";
import { JwtLogin } from "./../Controller/Auth/JwtLogin.js";
import { JwtLogout } from "../Controller/Auth/JwtLogout.js";
const router = express.Router();

//  Register signup route
router.post("/signup", SignupValidation, SignUp);

router.post("/signin", SignInValidation, signIn);
router.get("/jwt", JwtValiadtion, JwtLogin);
router.get("/logout", JwtLogout);
export default router;
