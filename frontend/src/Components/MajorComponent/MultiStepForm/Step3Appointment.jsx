import React from "react"
import InputBox from "../../MinorComponent/InputBox"


const Step3Appointment = ({register}) => {
 
    return (

        <div className="flex flex-col   gap-[40px] w-full h-full">
            <h1 className="text-center">Address Details</h1>

              <InputBox id={"stress"} label={"Stress Address "} type="text" placeholder=" Enter Address (Flat no., Building No., Landmarks)" bg="bg-[#E5F2F2]" register={register} required />
              <InputBox id={"stress2"} label={"Stress Address "} type="text" placeholder=" Enter Address (Flat no., Building No., Landmarks)" bg="bg-[#E5F2F2]" register={register} required />
             
            
            <span className="flex flex-row gap-[29px]">
                <InputBox id={"city"} label={"City"} type="text" placeholder="Enter Your City" bg="bg-[#E5F2F2]" register={register} required />
                <InputBox id={"state"} label={"State"} type="text" placeholder=" Enter Your State" bg="bg-[#E5F2F2]" register={register} required />
            </span>
            <InputBox id={"Postel"} label={"Postel / Zip Code"} type="text" placeholder=" Enter Your Area Pincode" bg="bg-[#E5F2F2]" register={register} required />
            
            <span><h1>Click Next & You Required Services</h1>
            <h1>Note: Services Available Cities are Indore</h1>
            </span>
        </div>
    )
}

export default Step3Appointment