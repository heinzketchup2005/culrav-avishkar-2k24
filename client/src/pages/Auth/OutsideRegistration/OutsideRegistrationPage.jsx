// import sendVerificationEmail from "@/lib/emailverification.js";
import { Button } from "@/ShadCnComponents/ui/button.jsx";
import Input from "@/ShadCnComponents/ui/Input";
import axios from "axios";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, matchPath, useNavigate } from "react-router-dom";
import useAuth from "../../../lib/useAuth";
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Base URL for all requests
});

function OutsideRegistration() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [error, setError] = useState("");
  const [submiting, setsubmiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // checking if the user is already logged in
  const isAuthenticated = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {}, [submiting]);

  const create = async (data) => {
    setsubmiting(true);

    navigate("/outside-registration/payFee", { state: data });
    setsubmiting(false);
  };

  // Password confirmation validation
  const validatePasswordMatch = (value) =>
    value === watch("password") || "Passwords do not match";

  return (
    <div className="flex items-center justify-center bg-[#FFF2D5] min-h-screen w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-[#2D2D2D]  mx-4 sm:mx-0">
        <h1 className="text-center text-2xl sm:text-3xl text-[#FFFAF0] font-bold font-bionix leading-tight">
          Outside Participation for <br /> CULRAV-AVISHKAR
        </h1>
        <p className="text-center font-sftext m-2 p-1 text-[#FFFAF0]">
          Already got registered?
          <Link
            to={"/login"}
            className="font-medium font-sftext text-[#F54E25]  hover:underline ml-1"
          >
            Log in
          </Link>
        </p>
        <form
          onSubmit={handleSubmit(create)}
          className="space-y-5  font-sftext w-full"
        >
          <Input
            placeholder="Full name"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && (
            <p className="text-[#F54E25]">{errors.name.message}</p>
          )}

          <Input
            placeholder="Email Id"
            type="email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) => {
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "email is not valid";
                },
              },
            })}
          />

          {errors.email && (
            <p className="text-[#F54E25]">{errors.email.message}</p>
          )}

          <Input
            placeholder="Phone no"
            {...register("phone", {
              required: "Phone no is required",
              validate: {
                matchPattern: (value) => {
                  /^[0-9]{10}$/.test(value) || "Phone must be a valid phone no";
                },
              },
            })}
          />
          <Input
            placeholder="College Name"
            {...register("college", {
              required: "college name is required",
            })}
          />

          <Input
            placeholder="College ID card (image url)"
            type="url"
            {...register("collegeID", {
              required: "college ID is required",
            })}
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value) ||
                    "Password is not valid",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5"
            >
              {showPassword ? (
                <EyeOff className="animate-pulse text-gray-500" />
              ) : (
                <Eye className="animate-pulse text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[#F54E25]">{errors.password.message}</p>
          )}

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: validatePasswordMatch,
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2.5"
            >
              {showConfirmPassword ? (
                <EyeOff className="animate-pulse text-gray-500" />
              ) : (
                <Eye className="animate-pulse text-gray-500" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[#F54E25]">{errors.confirmPassword.message}</p>
          )}

          {submiting ? (
            <Loader2 className="animate-spin justify-center items-center" />
          ) : (
            <Button
              type="submit"
              className="w-full font-sftext bg-orange-600 hover:bg-orange-500 text-[#FFFAF0] py-3  font-semibold"
            >
              Pay Fee
            </Button>
          )}
        </form>

        {error && <p className="text-[#F54E25]">{error}</p>}
      </div>
    </div>
  );
}

export default OutsideRegistration;
