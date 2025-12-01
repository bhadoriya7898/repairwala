import React from "react";
import { CgArrowTopRight } from "react-icons/cg";

const serviceList = [
    "Telivision",
    "Air Conditioners",
    "Window Air Conditioners",
    "Refrigerators",
    "Washing Machines",
    "Water purifier",
    "Microwave Ovens",
];

const ServiceSideCard = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <div
            className="bg-accent rounded-3xl p-5 flex flex-col gap-10"
            style={{
                width: "293px",
                height: "679px",
                opacity: 1,
                flexShrink: 0,
            }}
        >
            <h1 className="text-primary inline-flex items-center font-heading font-bold text-[28px]">
                Repairwala Products Repair Services
                <CgArrowTopRight size={18} />
            </h1>

            <div className="flex flex-col gap-3 overflow-y-auto">
                {serviceList.map((item) => (
                    <div
                        key={item}
                        onClick={() => setSelectedCategory(item)}
                        className={`px-1.5 py-2.5 rounded-xl w-fit font-medium font-heading text-para cursor-pointer 
                            ${
                                selectedCategory === item
                                    ? "bg-white shadow"
                                    : "bg-transparent"
                            }
                        `}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceSideCard;
