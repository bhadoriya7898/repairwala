import React, { useState } from "react";
import AuthContainer from "../Components/MajorComponent/AuthContainer";
import { logo } from "../assets/Images/index.js";
import InputBox from "../Components/MinorComponent/InputBox";
import { useForm } from "react-hook-form";
import Button from "../Components/MinorComponent/Button";
import DashedLine from "../Components/MinorComponent/DashedLine.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

import { loginAPI } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (loading) return; // 🛑 Prevent multi-clicks

    setLoading(true);

    try {
      const res = await loginAPI({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }

      alert("Login Successful!");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid credentials!");
    } finally {
      setLoading(false); // re-enable button
    }
  };

  return (
    <AuthContainer>
      <div className="w-[420px] flex flex-col gap-[50px] px-3 py-5">
        {/* Top Div Include Logo And Title */}
        <div className="flex flex-col gap-[30px] items-center justify-center">
          <span>
            <img src={logo} alt="Logo" />
          </span>
          <span className="flex flex-col gap-[15px] items-center justify-center text-center">
            <h1>Sign in to your account</h1>
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-[#00A76F]">
                Get started
              </Link>
            </p>
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col gap-[30px] w-full"
        >
          <InputBox
            className={"w-full"}
            id={"email"}
            label={"Email"}
            type="email"
            placeholder="Enter Email"
            register={register}
            bg="bg-white"
            required
          />

          <span className="flex flex-col w-full gap-[15px]">
            <Link to={"/forgotpassword"} className="text-right">
              Forgot Password?
            </Link>

            <InputBox
              className={"w-full"}
              id={"password"}
              label={"Password"}
              type="password"
              placeholder="Enter Password"
              register={register}
              bg="bg-white"
              required
            />
          </span>

          {/* Login Button (Disabled During Request) */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full max-w-none justify-center px-4 py-3 rounded-xl text-white 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}
            `}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <DashedLine>OR</DashedLine>

          <span className="flex flex-row gap-4">
            <FcGoogle className="h-[20px] w-[20px]" />
            <FaGithub className="h-[20px] w-[20px]" />
            <FaXTwitter className="h-[20px] w-[20px]" />
          </span>
        </form>
      </div>
    </AuthContainer>
  );
};

export default Login;
