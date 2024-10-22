import express from 'express';
import {
  logoutuser,
  otherusersignup,
  userForgotPassword,
  userResetPassword,
  userSignup,
  userlogin,
  verifyUser
} from '../controllers/auth.controller.js';
import SendPasswordToEmail from "../Controllers/auth/authController.forgotPasswordTokenVerification.js";
import Login from "../Controllers/auth/authController.login.js";
import Register from "../Controllers/auth/authController.register.js";
import SendPasswordTokenEmail from "../Controllers/auth/authController.sendForgotPasswordToken.js";
import VerifyToken from "../Controllers/auth/authController.verifyToken.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Auth router triggered");
  next();
});

// Routes from the first version
router.post("/signup", userSignup); // checked
router.post("/otherusersignup", otherusersignup);
router.post("/logout", logoutuser);
router.post("/login", userlogin);  // checked
router.post("/resetpassword", userResetPassword);
router.post("/forgotpassword", userForgotPassword);
router.post("/verifyuser", verifyUser);

// Routes from the second version
router.post("/register", Register);
router.post("/verify", VerifyToken);
router.post("/sendForgotPasswordToken", SendPasswordTokenEmail);
router.post("/forgotPasswordVerification", SendPasswordToEmail);

export default router;