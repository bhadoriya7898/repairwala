import React from "react";
import Button from "./Button";
import talivison from "../../assets/Images/Categories/smartTv.png";
import washingmachine from "../../assets/Images/Categories/washingMachines.png";
import { useNavigate } from "react-router-dom";

const CategoriesCard = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="w-74 h-83 p-2.5 rounded-2xl flex flex-col bg-accent">
            <div className="w-full h-64 gap-2.5">
                <img
                    src={data?.img}
                    className="h-46 rounded-2xl w-full object-cover"
                    alt={data?.title}
                />

                <div>
                    <h3 className="font-heading text-para">
                            {data?.category}
                    </h3>
                    <h1 className="font-heading font-medium text-[24px]">
                        {data?.title}
                    </h1>
                </div>
            </div>

            <Button onClick={() => navigate("/appointment")}>Book Now</Button>
        </div>
    );
};

export default CategoriesCard;
