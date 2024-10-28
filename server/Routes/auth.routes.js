import express from "express";
import SendPasswordToEmail from "../Controllers/auth/authController.forgotPasswordTokenVerification.js";
import Login from "../Controllers/auth/authController.login.js";
import Register from "../Controllers/auth/authController.register.js";
import SendPasswordTokenEmail from "../Controllers/auth/authController.sendForgotPasswordToken.js";
import VerifyToken from "../Controllers/auth/authController.verifyToken.js";
import OutsideRegistration from "../Controllers/auth/authController.outsideRegistration.js";
const router = express.Router();

// Register route
router.post("/register", Register);

// Outside Registeration route
router.post("/registerOutside", OutsideRegistration);

// Login route
router.post("/login", Login);

// Verify token route / verify Email
router.post("/verify", VerifyToken);

// Forgot password route
router.post("/sendForgotPasswordToken", SendPasswordTokenEmail);
router.post("/forgotPasswordVerification", SendPasswordToEmail);
export default router;
