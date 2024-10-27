import User from "../../Models/user.model.js";
import VerificationToken from "../../Models/verificationToken.model.js";
import {
  checkEmail,
  checkName,
  checkOtherCollegeEmail,
  checkPassword,
  checkPhone,
  generateVerificationEmail,
  generateVerificationToken,
} from "../../Utils/auth/auth.utils.js";
import { encryptPassword } from "../../Utils/auth/encriptionAndDecription.js";
import AsyncErrorHandler from "../../ErrorHandlers/async_error_handler.js";
import SendEmail from "../../Utils/auth/sendEmail.js";

// Register a new users
const Register = AsyncErrorHandler(async (req, res, next) => {
  const { name, email, password, phone, isOtherCollege } = req.body;

  // Check if email, password, and phone are provided
  if (!email || !password || !phone) {
    return res.status(400).json({ message: "Email, password, and phone are required" });
  }

  try {
    // ............................. checks start ...........................
    if (isOtherCollege) {
      // check college for other college.
      if (!req.body.college) {
        return res.status(400).json({
          ok: false,
          msg: "College Name is Missing",
        });
      }
      if (!checkOtherCollegeEmail(email) || !checkPhone(phone)) {
        return res.status(400).json({ message: "Invalid email or phone" });
      }
    } else {
      if (!checkEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
      }
    }

    if (!checkPassword(password) || !checkName(name)) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
  
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser && !existingUser?.isVerifiedUser){
      return res.status(400).json({
        ok:false,
        message:"Already registered, email not verified",
        emailVerified : false
      })
    }
    if (existingUser && existingUser?.isVerifiedUser) {
      return res.status(400).json({ 
        message: "User already exists",
        emailVerified : true
      });
    }
  
    // Check if the phone number already exists
    const existingPhoneUser = await User.findOne({ phone });
    if (existingPhoneUser) {
      return res.status(400).json({ message: "User with same phone number already exists" });
    }
  
    // ........................... checks end...............................
    // Hash the password
    const hashedPassword = await encryptPassword(password);
    // Create a new user
    let user = {
      name,
      email,
      password: hashedPassword,
      userName: email.split("@")[0],
      college: isOtherCollege ? req.body.college : "MNNIT",
      phone: `+91${phone}`, // Append +91 to the phone number
    };
  
    const newUser = new User(user);
  
    // Save the user to the database
    await newUser.save();
  
    const verificationToken = generateVerificationToken();
    // create a new entry in the verification token model
    const token = new VerificationToken({
      email: email,
      token: verificationToken,
    });
    await token.save();
    const subject = "Email verification";
    const text = generateVerificationEmail(verificationToken, subject);
    SendEmail(email, subject, text);
    res.status(201).json({ 
      message: "User registered successfully",
      emailVerified : false,
    });
  } catch (error) {
    next(err)
  }
});

export default Register;