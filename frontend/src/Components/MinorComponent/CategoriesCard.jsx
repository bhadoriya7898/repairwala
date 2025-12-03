import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CategoriesCard = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div
            className="
                w-[297px]
                h-[332px]
                bg-[#E5F2F2]
                border
                border-[#C9C9C9]
                rounded-[20px]
                p-[10px]
                flex flex-col
                gap-[10px]
                shadow-sm
            "
        >
            {/* PRODUCT IMAGE BOX */}
            <div className="w-full h-[160px] bg-white rounded-[16px] flex items-center justify-center overflow-hidden">
                <img
                    src={`http://localhost:5000/${data?.brandImage}`}
                    alt={data?.productName}
                    className="h-full object-contain"
                />
            </div>

            {/* TEXT BOX */}
            <div className="flex flex-col px-1">
                {/* CATEGORY NAME */}
                <p className="text-[14px] text-[#5E5E5E]">
                    {data?.category?.name}
                </p>

                {/* BRAND + PRODUCT NAME */}
                <h1 className="text-[18px] font-semibold leading-tight text-[#1A1A1A]">
                    {data?.brandName} {data?.productName}
                </h1>
            </div>

            {/* FOOTER: BUTTON + BRAND LOGO */}
            <div className="flex justify-between items-center mt-auto px-1">
                <Button onClick={() => navigate("/appointment")}>
                    Book Now
                </Button>

                <img
                    src={`http://localhost:5000/${data?.brandLogo}`}
                    alt="brand-logo"
                    className="h-[30px] w-auto object-contain opacity-90"
                />
            </div>
        </div>
    );
};

export default CategoriesCard;
