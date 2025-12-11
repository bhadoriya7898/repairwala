// MultiStepForm.jsx
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logo, AppointmentBanner } from "../assets/Images/index.js"
import { AppointmentSteps } from "../utils/Appointment.utils.jsx";
import Button from "../Components/MinorComponent/Button.jsx";
import Step1Appointment from "../Components/MajorComponent/MultiStepForm/Step1Appointment.jsx";
import Step2Appointment from "../Components/MajorComponent/MultiStepForm/Step2Appointment.jsx";
import Step3Appointment from "../Components/MajorComponent/MultiStepForm/Step3Appointment.jsx";
import Step4Appointment from "../Components/MajorComponent/MultiStepForm/Step4Appointment.jsx";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AppointmentBooking = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

  const onSubmit = async (data) => {
  try {
    setIsSubmitting(true);

    const res = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      toast.success("Appointment submitted! Our technician will call you soon.");

      // redirect after 2 seconds (so user sees toast)
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error(result.message || "Something went wrong!");
    }
  } catch (error) {
    console.log("API Error:", error);
    toast.error("Server error, please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};

    const [currentStep, setCurrentStep] = useState(1);
    const formData = watch()

    const nextStep = (e) => {
        e.preventDefault();
        setCurrentStep((prev) => prev + 1);
    }
    const prevStep = (e) => {
        e.preventDefault();
        setCurrentStep((prev) => prev - 1);
    }

    return (


        <section className="flex  justify-between bg-accent min-h-screen relative w-full pb-20">

            {/* Logo Div in Side Corner */}
            <div className="mt-6 flex justify-center w-full">
                <Link to={"/"}>
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-[209px] h-[49px]  cursor-pointer"
                    />
                </Link>
            </div>


            <div className="flex h-full justify-center ">

                {/* Appintment form main div that will overflow */}
                <div className="bg-[#E5F2F2] w-[90vw] md:w-[820px] min-h-[639px]  rounded-[20px] absolute top-[140px] left-[24px] p-10">

                    {/* Steps Div */}
                    {(currentStep <= 4) &&
                        <div className=" flex flex-row  w-full h-auto relative -top-[70px] gap-[25px] overflow-auto">
                            {AppointmentSteps.map((step) => (
                                <div key={step.name} className="flex  items-center gap-[15px] flex-col max-w-[191px]">
                                    <span className={`h-[49px] w-[49px] flex items-center justify-center ${currentStep >= step.step ? "bg-primary" : "bg-[#E5F2F2]"} rounded-full `}><step.icon size={18} /></span>
                                    <span className="flex flex-col items-center justify-center gap-[7px] text-center">
                                        <h1>{step.name}</h1>
                                        <p className="">{step.desc}</p>
                                    </span>
                                </div>
                            ))}
                        </div>
                    }

                    {/* Mid Div Of children */}
                    <form action="" onSubmit={handleSubmit(onSubmit)} >

                        <div className="">

                            {currentStep === 1 && <Step1Appointment register={register} />}
                            {currentStep === 2 && <Step2Appointment register={register} />}
                            {currentStep === 3 && <Step3Appointment register={register} />}
                            {currentStep === 4 && <Step4Appointment register={register} />}

                            {/* Preview of Appointment details */}
                            {currentStep === 5 && (
                                <div className="flex flex-col gap-[30px]">
                                    <h1 className=" font-para font-semibold text-[24px]">Reviews</h1>

                                    <div className="flex flex-col gap-[15px]">

                                        <div className="flex flex-col gap-[7px] text-[14px]">

                                            <h3 id="personal-details" className="font-heading font-bold text-[14px]">Personal Details</h3>
                                            <p className="font-medium"><strong>Name:</strong>{formData.firstname.toUpperCase()} {formData.lastname.toUpperCase()} </p>
                                            <p className="font-medium"><strong>Contact:</strong> {formData.phonenumber}</p>
                                            <p className="font-medium"><strong>Email:</strong> {formData.email}</p>

                                        </div>
                                        <div className="flex flex-col gap-[7px] text-[14px]">
                                            <h3 id="appointment-details" className="font-heading font-bold text-[14px]">Appointment Details</h3>
                                            <p className="font-medium"><strong>Category:</strong> {formData.category}</p>
                                            <p className="font-medium"><strong>Brand:</strong> {formData.brand}</p>
                                            <p className="font-medium"><strong>Model:</strong> {formData.model}</p>
                                            {/* <p className="font-medium"><strong>Date / Time:</strong> {formData}</p> */}
                                            <p className="font-medium"><strong>Message:</strong> {formData.message}</p>
                                        </div>
                                        <div className="flex flex-col gap-[7px] text-[14px]">
                                            <h3 id="address-details" className="font-heading font-bold text-[14px]">Address Details</h3>
                                            <p className="font-medium"><strong>Street Address:</strong> {formData.stress}</p>
                                            <p className="font-medium"><strong>Street Address (Optional):</strong> {formData.stress2}</p>
                                            <p className="font-medium"><strong>City:</strong> {formData.city}</p>
                                            <p className="font-medium"><strong>State:</strong> {formData.state}</p>
                                            <p className="font-medium"><strong>Postal / Zip Code:</strong> {formData.Postel}</p>
                                        </div>
                                        <div className="flex flex-col gap-[7px] text-[14px]">
                                            <h3 id="payment-details" className="font-heading font-bold text-[14px]">Payment Details</h3>
                                            <p className="font-medium" ><strong>Mode of Payment:</strong> During Visit</p>
                                        </div>

                                    </div>

                                    <p>We will contact you about the time slot on a particular day as per your availability.</p>
                                </div>
                            )}

                            {currentStep === 6 && (



                                <div className="flex flex-col gap-[30px]">
                                    <span><Link to={'/'}>Back</Link></span>
                                    <span><img src={logo} alt="" /></span>

                                    <h1 className=" font-para font-semibold text-[24px]">Booking Details</h1>

                                    <div className="flex flex-col gap-[15px]">

                                        <div className="flex flex-col gap-[7px] text-[14px]">

                                            <h3 id="personal-details" className="font-heading font-bold text-[14px]">Personal Details</h3>
                                            <p className="font-medium"><strong>Name:</strong>{formData.firstname.toUpperCase()} {formData.lastname.toUpperCase()} </p>
                                            <p className="font-medium"><strong>Contact:</strong> {formData.phonenumber}</p>
                                            <p className="font-medium"><strong>Email:</strong> {formData.email}</p>

                                        </div>
                                        <div className="flex flex-col gap-[7px] text-[14px]">
                                            <h3 id="appointment-details" className="font-heading font-bold text-[14px]">Appointment Details</h3>
                                            <p className="font-medium"><strong>Category:</strong> {formData.category}</p>
                                            <p className="font-medium"><strong>Brand:</strong> {formData.brand}</p>
                                            <p className="font-medium"><strong>Model:</strong> {formData.model}</p>
                                            {/* <p className="font-medium"><strong>Date / Time:</strong> {formData}</p> */}
                                            <p className="font-medium"><strong>Message:</strong> {formData.message}</p>
                                        </div>
                                        <div className="flex flex-col gap-[7px] text-[14px]">
                                            <h3 id="address-details" className="font-heading font-bold text-[14px]">Address Details</h3>
                                            <p className="font-medium"><strong>Street Address:</strong> {formData.stress}</p>
                                            <p className="font-medium"><strong>Street Address (Optional):</strong> {formData.stress2}</p>
                                            <p className="font-medium"><strong>City:</strong> {formData.city}</p>
                                            <p className="font-medium"><strong>State:</strong> {formData.state}</p>
                                            <p className="font-medium"><strong>Postal / Zip Code:</strong> {formData.Postel}</p>
                                        </div>
                                        <div className="flex flex-col gap-[7px] text-[14px]">
                                            <h3 id="payment-details" className="font-heading font-bold text-[14px]">Payment Details</h3>
                                            <p className="font-medium" ><strong>Mode of Payment:</strong> During Visit</p>
                                        </div>

                                    </div>


                                </div>




                            )}

                        </div>
                        <div className="flex flex-row gap-[20px] pt-[20px]">
                            {currentStep > 1 && currentStep <= 5 && (<Button onClick={prevStep}>Back</Button>)}
                            {currentStep < 5 && <Button onClick={nextStep}>Next</Button>}
                            {currentStep === 5 && (
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            )}


                        </div>

                    </form>

                </div>

            </div>




            {/* Side image Banner on Appointment page */}
            <div className="w-[513px] h-[832px] bg-primary right-0 rounded-bl-[30px] rounded-tl-[30px] flex items-center">
                <img src={AppointmentBanner} alt="" />
            </div>


        </section>


    );
}


export default AppointmentBooking