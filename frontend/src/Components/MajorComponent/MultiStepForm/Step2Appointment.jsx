import React from "react"
import InputBox from "../../MinorComponent/InputBox"
import TextAreaBox from "../../MinorComponent/TextAreaBox"


const Step2Appointment = ({register}) => {
 
    return (

        <div className="flex flex-col   gap-[40px] w-full h-full">
            <h1 className="text-center">Select Your Services</h1>
            <span className="flex flex-row gap-[29px]">
                <InputBox id={"category"} label={"Category"} type="text" placeholder=" e.g. Television" bg="bg-[#E5F2F2]" register={register} required />
                <InputBox id={"brand"} label={"Brand"} type="text" placeholder=" e.g. LG" bg="bg-[#E5F2F2]" register={register} required />
            </span>
            <span className="flex flex-row gap-[29px]">
                <InputBox id={"model"} label={"Model"} type="text" placeholder=" Enter Product Model" bg="bg-[#E5F2F2]" register={register} required />
                <InputBox id={"dateandtime"} label={"Date"} type="text" placeholder=" Enter Date" bg="bg-[#E5F2F2]" register={register} required />
            </span>
            <TextAreaBox bg="bg-[#E5F2F2]" id={"message"} label={"Message"} type="text" placeholder="Anything Else" register={register} />
            {/* <h1>For different dates with different time, select date-1 So on.</h1> */}
         
        </div>
    )
}

export default Step2Appointment