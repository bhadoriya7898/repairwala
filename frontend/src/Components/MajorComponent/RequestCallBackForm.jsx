import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../MinorComponent/InputBox";
import TextAreaBox from "../MinorComponent/TextAreaBox";
import Button from "../MinorComponent/Button";
import SelectBox from "../MinorComponent/SelectBox";
import requestToCallBackBanner from '../../assets/Images/ReqestToCallBackBanner.png'

const RequestCallbackForm = ({ className }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data,e) => {
        e.preventDefault();
        console.log("Submitted:", data);
        // TODO: send data to your backend here
        reset();
    };

    return (
  <div className="flex flex-col-reverse md:flex-row w-full items-stretch h-auto gap-5">

            <div className="relative w-full md:w-4/12 rounded-2xl">
                <img src={requestToCallBackBanner} className="w-full h-full object-cover rounded-2xl" />

                <div className="absolute bottom-4 text-white text-lg font-medium p-4 sm:p-10 w-full text-center text-[20px] sm:text-[28px] font-heading">
                    Repair Wala Service repairs your home appliances
                </div>
            </div>

            <div className="flex-1 bg-accent p-8 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[36px]">

                    <h1 className="font-heading text-[32px] text-primary">Fill the Form to Request Free Call Back</h1>

                    {/* PERSONAL DETAILS */}
                    <h1 className="font-heading text-[20px] text-primary">Personal Details</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputBox id="firstName" label="First Name" placeholder="Enter First Name" register={register} required />
                        <InputBox id="lastName" label="Last Name" placeholder="Enter Last Name" register={register} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputBox id="email" label="Email" placeholder="Enter Email" register={register} required type="email" />
                        <InputBox id="phoneNo" label="Phone Number" placeholder="Enter Phone Number" register={register} required type="number" />
                    </div>

                    {/* ADDRESS */}
                    <h1 className="font-heading text-[20px] text-primary">Service Location Address</h1>

                    <InputBox id="streetAddress" label="Street Address" placeholder="Full Address" register={register} required />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectBox id="city" label="City" options={["Delhi", "Mumbai", "Bhopal", "Indore"]} register={register} />
                        <SelectBox id="state" label="State" options={["DH", "MH", "UP", "MP"]} register={register} />
                    </div>

                    <InputBox id="zipCode" label="Postal / Zip Code" placeholder="Enter Zip Code" register={register} required />

                    {/* PRODUCT DETAILS */}
                    <h1 className="font-heading text-[20px] text-primary">Product Details</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectBox id="type" label="Type" options={["Microwave", "T.V", "Refrigerator"]} register={register} />
                        <SelectBox id="brand" label="Brand" options={["LG", "Samsung", "Sony"]} register={register} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectBox id="model" label="Model" options={["Solo Microwave", "Grill Microwave"]} register={register} />
                        <InputBox id="applianceAge" label="Appliance Age" placeholder="Enter age" type="number" register={register} required />
                    </div>

                    <TextAreaBox label="Description" id="description" placeholder="Describe the issue..." register={register} required />

                    <Button type="submit">SUBMIT</Button>
                </form>
            </div>

        </div>
    );
};



export default RequestCallbackForm;
