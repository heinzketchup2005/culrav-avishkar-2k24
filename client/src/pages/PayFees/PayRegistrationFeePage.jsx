// import sendVerificationEmail from "@/lib/emailverification.js";
import { Button } from "@/ShadCnComponents/ui/button.jsx";
import Input from "@/ShadCnComponents/ui/Input";
import axios from "axios";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Base URL for all requests
});

function PayRegistrationFeePage() {
  const [submitting, setSubmitting] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [isBigSize, setIsBigSize] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { error },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const prevData = useLocation().state;
  useEffect(() => {
    if (!prevData) {
      navigate("/outside-registration");
    }
  }, []);
  const create = async (data) => {
    setSubmitting(true);
    // data = { ...prevData, data };
    console.log(prevData);
    console.log(data);
    if (!data.image) {
      console.log("No image");
      setSubmitting(false);
      return;
    }
    if (data.image[0].size > 524288) {
      setIsBigSize(true);
      setSubmitting(false);
      return;
    }
    setIsBigSize(false);
    try {
      const paymentScreenshot = data.image[0];
      const uploaded = await uploadToCloudinary(paymentScreenshot);
      if (!uploaded) {
        console.log("Image not able to upload");
        setSubmitting(false);
        return;
      }
      const res = await apiClient.post("/api/auth/v1/register", {
        ...prevData,
        paymentLink: uploadedUrl,
        isOtherCollege: true,
        isPaymentVerified: false,
      }); // NOTE: if the field key (isPaymentVerified) is something else , so update is here as well
      if (res.status == 201) {
        alert("User registered successfully");
        setSubmitting(false);
        navigate("/verify-email", { state: { email: prevData.email } });
      }
    } catch (error) {
      setCurrentError(error);
      console.error("Error occured while registering: ");
      console.error(error);
    }

    setSubmitting(false);
  };

  // function to upload to cloudinary
  const uploadToCloudinary = async (paymentScreenshot) => {
    if (!paymentScreenshot) {
      alert("Please upload a screenshot first.");
      setUploading(false);
      return false;
    }

    const formData = new FormData();
    formData.append("file", paymentScreenshot);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}`,
        // URL to cloudinary
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Cloudinary Response:", response.data);
      setUploadedUrl(response.data.secure_url);
      alert("Payment screenshot uploaded successfully!");
    } catch (error) {
      setCurrentError(error);
      console.error(
        "Cloudinary upload failed:",
        error.response?.data || error.message
      );
      alert("Failed to upload screenshot. Please try again.");
      return false;
    }
    return true;
  };

  return (
    <div className="flex items-center justify-center bg-[#FFF2D5] min-h-screen w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-[#2D2D2D]  mx-4 sm:mx-0">
        <form
          onSubmit={handleSubmit(create)}
          className="space-y-5  font-sftext w-full"
        >
          <div
            className="w-full h-64 rounded-lg"
            style={{ backgroundColor: "#D9D9D9" }}
          ></div>
          <div className="text-white">Upload the screenshot</div>
          <Input
            type="file"
            accept="image/*"
            className="w-full p-3 rounded"
            {...register("image", { required: "Image is required" })}
            // onChange={handleFileChange}
          />
          {isBigSize && (
            <div className="text-[#F54E25]">
              *file size must be less than 512 kb
            </div>
          )}

          {submitting ? (
            <Loader2 className="animate-spin justify-center items-center" />
          ) : (
            <Button
              type="submit"
              className="w-full font-sftext bg-orange-600 hover:bg-orange-500 text-[#FFFAF0] py-3  font-semibold"
            >
              Register
            </Button>
          )}
        </form>

        {error && <p className="text-[#F54E25]">{error}</p>}
        {currentError && (
          <p className="text-[#F54E25]">{currentError.response.data.message}</p>
        )}
      </div>
    </div>
  );
}

export default PayRegistrationFeePage;
