// CategoriesCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoriesCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-[#E5F2F2] border border-[#C9C9C9]
        rounded-[20px] p-4 flex flex-col gap-3 shadow-sm
        h-[332px] w-full

        /* MOBILE (189×211) */
     max-[500px]:w-full


        max-[400px]:h-[211px]
        max-[400px]:rounded-[12.74px]
        max-[400px]:p-[6.37px]
        max-[400px]:gap-[6.37px]
      "
    >
      {/* Image */}
      <div
        className="
          w-full bg-white rounded-[16px] flex items-center justify-center overflow-hidden

          /* MOBILE image */
          max-[400px]:w-[176px]
          max-[400px]:h-[119px]
          max-[400px]:rounded-[12.74px]
        "
      >
        <img
          src={`http://localhost:5000/${data?.brandImage}`}
          className="object-contain"
        />
      </div>

      {/* Text */}
      <div
        className="
          flex flex-col px-1 gap-1

          /* MOBILE font sizes */
          max-[400px]:text-[8.92px]
        "
      >
        <p className="text-[14px] max-[400px]:text-[8.92px] text-black">
          {data?.category?.name}
        </p>
        <h1 className="text-[20px] max-[400px]:text-[12.74px] font-medium">
          {data?.brandName} {data?.productName}
        </h1>
      </div>

      {/* Button + Logo */}
      <div className="flex justify-between items-center mt-auto px-1">
        <button
          onClick={() => navigate("/appointment")}
          className="
            bg-[#586082] text-white font-bold text-[12px] px-6 py-2 rounded-md

            /* MOBILE button */
            max-[400px]:w-[76px]
            max-[400px]:h-[25px]
            max-[400px]:text-[7.65px]
            max-[400px]:px-[19.11px]
            max-[400px]:py-[6.37px]
            max-[400px]:rounded-[3.82px]
          "
        >
          Book Now
        </button>

        <img
          src={`http://localhost:5000/${data?.brandLogo}`}
          className="object-contain max-[400px]:h-[20px]"
        />
      </div>
    </div>
  );
};

export default CategoriesCard;
