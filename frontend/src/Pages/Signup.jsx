import React from "react";
import AuthContainer from "../Components/MajorComponent/AuthContainer";
import { logo } from "../assets/Images/index.js";
import InputBox from "../Components/MinorComponent/InputBox";
import { useForm } from "react-hook-form";
import Button from "../Components/MinorComponent/Button";
import DashedLine from "../Components/MinorComponent/DashedLine.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

import { signupAPI } from "../api/api";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    // 1️⃣ Password match validation
    if (data.password !== data.confpassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    try {
      // 2️⃣ Send API request
      const res = await signupAPI({
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confpassword,
        role: "employee", // default role
      });

      // 3️⃣ Success message
      alert("Signup successful! Wait for admin approval.");
      
      // 4️⃣ Redirect to login
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed!");
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
            <h1>Get started absolutely free</h1>
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-[#00A76F]">
                Sign in
              </Link>
            </p>
          </span>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col gap-[30px] w-full"
        >
          <span className="flex flex-row w-full gap-[15px]">
            <InputBox
              className={"w-[50%]"}
              id={"firstname"}
              label={"First Name"}
              type="text"
              placeholder="Enter First Name"
              register={register}
              bg="bg-white"
              required
            />

            <InputBox
              className={"w-1/2"}
              id={"lastname"}
              label={"Last Name"}
              type="text"
              placeholder="Enter Last Name"
              register={register}
              bg="bg-white"
              required
            />
          </span>

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

          <InputBox
            className={"w-full"}
            id={"confpassword"}
            label={"Confirm Password"}
            type="password"
            placeholder="Confirm Password"
            register={register}
            bg="bg-white"
            required
          />

          <Button type="submit" className="w-full max-w-none justify-center">
            Create account
          </Button>

          <p>
            By signing up, I agree to{" "}
            <Link to={"/termsandconditions"} className="underline">
              terms of use
            </Link>{" "}
            and{" "}
            <Link to={"/privacypolicy"} className="underline">
              privacy policy
            </Link>.
          </p>

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

export default Signup;
