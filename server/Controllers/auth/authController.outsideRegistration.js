import User from "../../Models/user.model.js";
import AsyncErrorHandler from "../../ErrorHandlers/async_error_handler.js";

// Update user details for outside registration
const OutsideRegistration = AsyncErrorHandler(async (req, res) => {
  const { email, paymentLink, isOtherCollege, isPaymentVerified } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user details
    user.paymentLink = paymentLink;
    user.isOtherCollege = isOtherCollege;
    user.isPaymentVerified = isPaymentVerified;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default OutsideRegistration;