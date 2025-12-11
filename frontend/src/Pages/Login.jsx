// src/Pages/Login.jsx
import React, { useState } from "react";
import AuthContainer from "../Components/MajorComponent/AuthContainer";
import { logo } from "../assets/Images/index.js";
import InputBox from "../Components/MinorComponent/InputBox";
import { useForm } from "react-hook-form";
import DashedLine from "../Components/MinorComponent/DashedLine.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { loginAPI } from "../api/api";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await loginAPI({
        email: data.email,
        password: data.password,
      });

      // If backend says profile incomplete -> redirect to complete-profile
      if (res.data.redirect === "/complete-profile") {
        if (res.data.userId) localStorage.setItem("userId", res.data.userId);

        toast.error("Please complete your profile to continue.", {
          style: { background: "#ffefef", color: "#c10000" },
        });

        navigate("/complete-profile");
        return;
      }

      // Successful login
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userId", res.data.userId);

        toast.success("Login Successful!", {
          style: { background: "#e8fff1", color: "#0f8a44" },
        });

        if (res.data.role === "admin") navigate("/admin/dashboard");
        else navigate("/employee/dashboard");

      } else {
        toast.error(res.data.msg || "Login completed");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || "Invalid credentials!";
      toast.error(msg, {
        style: { background: "#ffefef", color: "#c10000" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="w-[420px] flex flex-col gap-[50px] px-3 py-5">
        <div className="flex flex-col gap-[30px] items-center justify-center">
          <span><img src={logo} alt="Logo" /></span>
          <span className="flex flex-col gap-[15px] items-center justify-center text-center">
            <h1>Sign in to your account</h1>
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-[#00A76F]">Get started</Link>
            </p>
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col gap-[30px] w-full">
          <InputBox className={"w-full"} id={"email"} label={"Email"} type="email" placeholder="Enter Email" register={register} bg="bg-white" required />
          
          <span className="flex flex-col w-full gap-[15px]">
            <Link to={"/forgotpassword"} className="text-right">Forgot Password?</Link>
            <InputBox className={"w-full"} id={"password"} label={"Password"} type="password" placeholder="Enter Password" register={register} bg="bg-white" required />
          </span>

          <button
            type="submit"
            disabled={loading}
            className={`w-full max-w-none justify-center px-4 py-3 rounded-xl text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
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
