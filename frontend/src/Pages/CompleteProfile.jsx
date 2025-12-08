import React from "react";
import AuthContainer from "../Components/MajorComponent/AuthContainer";
import { logo } from "../assets/Images/index.js";
import AuthImage from "../assets/Images/AuthContainerBanner.png";
import InputBox from "../Components/MinorComponent/InputBox";
import { useForm } from "react-hook-form";
import Button from "../Components/MinorComponent/Button";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Profile Data:", data);
    alert("Profile Completed Successfully!");
    navigate("/login");
  };

  return (
    <AuthContainer>
      {/* RIGHT SIDE FORM — Signup style */}
      <div className="w-[420px] flex flex-col gap-[25px] px-3 py-6">

        {/* Logo + Title */}
        <div className="flex flex-col gap-[10px] items-center text-center">
          <img src={logo} alt="Logo" className="h-12" />

          <div>
            <h1 className="text-[15px] font-semibold">Complete Your Profile</h1>
            <p className="text-gray-500 text-sm">
              Provide details to activate your employee account.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[20px] w-full"
        >
          {/* ROW 1 */}
          <div className="flex gap-4 w-full">
            <InputBox
              className="w-1/2"
              id="category"
              label="Category"
              placeholder="e.g. AC Technician"
              register={register}
              required
              bg="bg-white"
            />

            <InputBox
              className="w-1/2"
              id="experience"
              label="Experience (in years)"
              type="number"
              placeholder="2"
              register={register}
              required
              bg="bg-white"
            />
          </div>

          <InputBox
            id="company"
            label="Current / Last Company"
            placeholder="Enter company name"
            register={register}
            required
            bg="bg-white"
          />

          <InputBox
            id="currentAddress"
            label="Current Address"
            placeholder="Enter current address"
            register={register}
            required
            bg="bg-white"
          />

          <InputBox
            id="permanentAddress"
            label="Permanent Address"
            placeholder="Enter permanent address"
            register={register}
            required
            bg="bg-white"
          />

          <InputBox
            id="nationalId"
            label="National ID"
            placeholder="Aadhar / PAN / Driving"
            register={register}
            required
            bg="bg-white"
          />

          <InputBox
            id="qualification"
            label="Technical Qualification"
            placeholder="e.g. Diploma in AC Repair"
            register={register}
            required
            bg="bg-white"
          />

          {/* FILE UPLOADS */}
          <div>
            <label className="font-medium">Qualification Document</label>
            <input
              type="file"
              {...register("qualificationDoc", { required: true })}
              className="w-full mt-2 border rounded-xl p-3 bg-white"
            />
          </div>

          <div>
            <label className="font-medium">Upload Your Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="w-full mt-2 border rounded-xl p-3 bg-white"
            />
          </div>

          <Button className="w-full justify-center" type="submit">
            Submit Profile
          </Button>
        </form>
      </div>

      {/* LEFT SIDE IMAGE — EXACT Signup style */}
      {/* <div className="hidden md:flex items-center justify-center p-10 w-full">
        <img
          src={AuthImage}
          alt="Illustration"
          className="w-full h-full object-contain"
        />
      </div> */}
    </AuthContainer>
  );
};

export default CompleteProfile;
