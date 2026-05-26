import express from "express";
import { SignupValidation } from "../Middleware/AuthValidation/SignupValidation.js";
import { SignInValidation } from "../Middleware/AuthValidation/SignInValidation.js"; // Uncomment when ready
import { SignUp } from "../Controller/Auth/SignUp.js";
import { signIn } from "../Controller/Auth/SignIn.js";
const router = express.Router();

//  Register signup route
router.post("/signup", SignupValidation, SignUp);

router.post("/signin", SignInValidation, signIn);

export default router;
