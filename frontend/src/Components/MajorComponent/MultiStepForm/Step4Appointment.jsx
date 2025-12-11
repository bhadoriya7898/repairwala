import React from "react"
import InputBox from "../../MinorComponent/InputBox"


const Step4Appointment = ({ register }) => {

  return (

    <div className="flex flex-col   gap-[40px] w-full h-full">
      <h1 className="text-center">Mode of Payment</h1>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="option" value="A" className="accent-blue-500" />
        <span>Pay At Service Delievery.</span>
      </label>
      <span>
        <p>1. Visiting, Home Inspection & Cost Estimation Charges INR 299.00 </p>
        <p>2. Free Inspection Charges with Repair & Services</p>

      </span>
    </div>
  )
}

export default Step4Appointment