import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CategoriesCard = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-accent p-3 rounded-2xl flex flex-col gap-3">
            <img
                src={data?.img}
                alt={data?.title}
                className="w-full h-40 object-cover rounded-xl"
            />

            <div>
                <h3 className="text-para font-heading">{data?.category}</h3>
                <h1 className="font-heading font-medium text-[20px]">
                    {data?.title}
                </h1>
            </div>

            <Button onClick={() => navigate("/appointment")}>Book Now</Button>
        </div>
    );
};

export default CategoriesCard;
