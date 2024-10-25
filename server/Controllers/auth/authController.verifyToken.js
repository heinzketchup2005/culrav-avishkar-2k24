import UserModel from "../../Models/user.model.js";
import VerificationToken from "../../Models/verificationToken.model.js";
import AsyncErrorHandler from "../../ErrorHandlers/async_error_handler.js";

// Verify a token
const VerifyToken = AsyncErrorHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  const tokenExists = await VerificationToken.findOne({ token });
  if (!tokenExists) {
    return res.status(400).json({ message: "Invalid token" });
  }
  await UserModel.updateOne(
    { email: tokenExists.email },
    { $set: { isVerifiedUser: true } }
  );
  res.status(200).json({ message: "Email verified" });
});
export default VerifyToken;
