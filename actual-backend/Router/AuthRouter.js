import express from "express";
import { SignupValidation } from "../Middleware/AuthValidation/SignupValidation.js";
// import { SignInValidation } from "../Middleware/AuthValidation/SignInValidation.js"; // Uncomment when ready
import { SignUp } from "../Controller/Auth/SignUp.js";
const router = express.Router(); //  This is correct

//  Register signup route
router.post("/signup", SignupValidation, SignUp);

//  Register signin route (when implemented)
// router.post("/signin", SignInValidation);

export default router;
