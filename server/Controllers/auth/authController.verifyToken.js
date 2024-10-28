import UserModel from "../../Models/user.model.js";
import VerificationToken from "../../Models/verificationToken.model.js";
import AsyncErrorHandler from "../../ErrorHandlers/async_error_handler.js";

// Verify a token
const VerifyToken = AsyncErrorHandler(async (req, res) => {
  const { token } = req.body;

  // Check if token is provided
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  // Find the verification token
  const tokenExists = await VerificationToken.findOne({ token });
  if (!tokenExists) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Find the user by email
  const user = await UserModel.findOne({ email: tokenExists.email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check if the user is already verified
  if (user.isVerifiedUser) {
    return res.status(400).json({ message: "User is already verified" });
  }

  // Update the user's verification status
  user.isVerifiedUser = true;
  await user.save();

  // Delete the verification token
  await VerificationToken.deleteOne({ token });

  res.status(200).json({ message: "Email verified successfully" });
});

export default VerifyToken;