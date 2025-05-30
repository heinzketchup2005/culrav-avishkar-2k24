import { Button } from "@/ShadCnComponents/ui/button";
import Input from "@/ShadCnComponents/ui/Input";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../lib/useAuth";
import { signInStart, signInSuccess, signInFailure } from "@/redux/auth/authSlice";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

function Login() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(signInFailure(null));
  }, [dispatch]);

  const userlogin = async (data) => {
    if (!data.email || !data.password) {
      toast.error("Please fill all the fields");
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(signInStart());
      const response = await apiClient.post(`/api/auth/v1/login`, data);
      const responseData = response.data;

      if (response.status === 200) {
        dispatch(signInSuccess({ user: responseData.user, token: responseData.token }));
        toast.success("Login successful!");
        navigate("/");
      } else if (response.status === 401 && responseData.isVerifiedEmail === false) {
        // Redirect to verify email page if email is not verified
        navigate("/verify-email", { state: { email: data.email } });
        toast.error(responseData.message || "Please verify your email");
      } else {
        toast.error(response.data.message || "Login failed");
        dispatch(signInFailure("Login failed"));
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      if (errorMessage=="Please verify your email") {
        toast.error(errorMessage);
        navigate("/verify-email", { state: { email: data.email } });
      } else if (errorMessage=="Please pay the registration fee") {
        toast.error(errorMessage);
        navigate("/outside-registration/payFee", { state: { email: data.email } });
      }else {
        toast.error(errorMessage);
        dispatch(signInFailure(errorMessage));
      }
      console.error("Error during login:", errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#FFF2D5] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 bg-[#2D2D2D] shadow-lg">
        {/* Page Title */}
        <h1 className="text-center font-bold font-bionix text-2xl sm:text-3xl lg:text-4xl text-[#FFFAF0] leading-tight mb-4">
          Welcome back!
        </h1>
        {/* Subtext */}
        <p className="text-center font-sftext text-sm sm:text-base lg:text-lg text-[#FFFAF0] mb-4">
          Don't have an account yet?{" "}
          <Link
            to="/registration"
            className="font-medium font-sftext text-[#F54E25] transition-all duration-200 hover:underline"
          >
            Register Now
          </Link>
        </p>
        {/* Form */}
        <form
          onSubmit={handleSubmit(userlogin)}
          className="w-full space-y-4 sm:space-y-5 lg:space-y-6"
        >
          <Input
            placeholder="Enter Email Id"
            type="email"
            className="w-full font-sftext bg-[#3D3D3D] text-[#B0B0B0]"
            {...register("email", {
              validate: {
                matchPattern: (value) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "Email address must be a valid MNNIT email address",
              },
            })}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full font-sftext bg-[#3D3D3D] text-[#B0B0B0]"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5"
            >
              {showPassword ? (
                <EyeOff className="animate-pulse transition-all duration-2000 text-gray-500" />
              ) : (
                <Eye className="animate-pulse transition-all duration-2000 text-gray-500" />
              )}
            </button>
          </div>
          {errorMessage && <div className="text-[#F54E25]">*{errorMessage}</div>}
          {/* Forgot Password Link */}
          <Link
            to="/forget-password"
            className="font-medium font-sftext text-sm text-[#F54E25] transition-all duration-200 hover:underline"
          >
            Forgot password?
          </Link>
          {/* Submit Button or Loader */}
          {loading ? (
            <><div className="flex w-full items-center justify-center"><ClipLoader color="#F54E25" size={35} className="mx-auto" /></div></>
          ) : (
            <Button
              type="submit"
              className="w-full font-sftext bg-[#F54E25] hover:bg-orange-500 text-lg text-[#FFFAF0] lg:text-xl"
            >
              Log in
            </Button>
          )}
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;