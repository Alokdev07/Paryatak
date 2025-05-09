import { Router } from "express";
import { initiateRegisterUser, verifyOtpAndRegister } from "../controller/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const route = Router();

// Step 1: Send OTP after collecting user data (no file upload needed here)
route.post('/signup',upload.single("avatar"), initiateRegisterUser);

// Step 2: Verify OTP and complete registration (upload avatar here)
route.post('/verify-otp',  verifyOtpAndRegister);

export default route;
