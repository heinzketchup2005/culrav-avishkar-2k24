
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
const router = express.Router();

router.use((req, res, next) => {
  console.log("Auth router triggered");
  next();
});

router.post("/signup", userSignup); // checked
router.post("/otherusersignup", otherusersignup);
router.post("/logout",logoutuser)
router.post("/login", userlogin);  // checked
router.post("/resetpassword", userResetPassword);
router.post("/forgotpassword", userForgotPassword);
router.post("/verifyuser", verifyUser);


export default router