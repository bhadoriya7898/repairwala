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
        w-full

        /* DESKTOP FIXED HEIGHT */
        lg:h-[332px]

        /* MOBILE */
        max-[480px]:rounded-xl
        max-[480px]:p-3
        max-[480px]:gap-3
      "
    >
      {/* Image */}
      <div
        className="
          w-full bg-white rounded-[16px] flex items-center justify-center overflow-hidden

          max-[480px]:h-[150px]
          max-[480px]:rounded-lg
        "
      >
        <img
          src={`http://localhost:5000/${data?.brandImage}`}
          className="object-contain h-full"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col px-1 gap-1 max-[480px]:text-sm">
        <p className="text-[14px] text-black">
          {data?.category?.name}
        </p>

        <h1 className="text-[20px] max-[480px]:text-base font-semibold">
          {data?.brandName} {data?.productName}
        </h1>
      </div>

      {/* Button + Logo */}
      <div className="flex justify-between items-center mt-auto px-1">
        <button
          onClick={() => navigate("/appointment")}
          className="
            bg-[#586082] text-white font-bold text-[12px] 
            px-6 py-2 rounded-md

            max-[480px]:px-4
            max-[480px]:py-2
            max-[480px]:text-xs
          "
        >
          Book Now
        </button>

        <img
          src={`http://localhost:5000/${data?.brandLogo}`}
          className="object-contain max-[480px]:h-[22px]"
        />
      </div>
    </div>
  );
};

export default CategoriesCard;
