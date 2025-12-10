import React, { useState } from "react";
import AuthContainer from "../Components/MajorComponent/AuthContainer";
import { logo } from "../assets/Images/index.js";
import InputBox from "../Components/MinorComponent/InputBox";
import { useForm } from "react-hook-form";
import Button from "../Components/MinorComponent/Button";
import { useNavigate } from "react-router-dom";
import { completeProfileAPI } from "../api/api";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  // ⬅️ Get userId saved at signup/login
  const userId = localStorage.getItem("userId");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (!userId) {
        alert("User ID missing. Please login again.");
        return;
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("category", data.category);
      formData.append("experience", data.experience);
      formData.append("company", data.company);
      formData.append("currentAddress", data.currentAddress);
      formData.append("permanentAddress", data.permanentAddress);
      formData.append("nationalId", data.nationalId);
      formData.append("qualification", data.qualification);

      formData.append("qualificationDoc", data.qualificationDoc[0]);
      formData.append("photo", data.photo[0]);

      const res = await completeProfileAPI(formData);

      alert("Profile Completed Successfully! Wait for Admin Approval.");

      // Redirect to login
      navigate("/login");


    } catch (err) {
      console.log("PROFILE ERROR:", err.response?.data);
      alert(err.response?.data?.msg || "Profile submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="w-[420px] flex flex-col gap-[25px] px-3 py-6">

        {/* Logo + Title */}
        <div className="flex flex-col gap-[10px] items-center text-center">
          <img src={logo} alt="Logo" className="h-12" />
          <div>
            <h1 className="text-[20px] font-semibold">Complete Your Profile</h1>
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
          {/* Row 1 */}
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
            placeholder="Aadhar / PAN"
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

          {/* File Uploads */}
          <div>
            <label className="font-medium">Qualification Document</label>
            <input
              type="file"
              required
              onChange={(e) => setValue("qualificationDoc", e.target.files)}
              className="w-full mt-2 border rounded-xl p-3 bg-white"
            />
          </div>

          <div>
            <label className="font-medium">Upload Your Photo</label>
            <input
              type="file"
              required
              onChange={(e) => setValue("photo", e.target.files)}
              className="w-full mt-2 border rounded-xl p-3 bg-white"
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Profile"}
          </Button>
        </form>
      </div>
    </AuthContainer>
  );
};

export default CompleteProfile;
