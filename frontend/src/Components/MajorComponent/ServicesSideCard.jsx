import React from "react";
import { CgArrowTopRight } from "react-icons/cg";

const serviceList = [
    "Telivision",
    "Air Conditioners",
    "Window Air Conditioners",
    "Refrigerators",
    "Washing Machines",
    "water purifier",
    "Microwave Ovens",
];

const ServicesSideCard = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <div
            className="
                bg-accent 
                rounded-3xl 
                p-5 
                flex 
                flex-col 
                gap-10 
                w-full 
                h-auto
            "
            style={{
                maxHeight: "679px",
            }}
        >
            <h1 className="text-primary font-heading font-bold text-[24px] flex items-center gap-1">
                Repairwala Products Repair Services
                <CgArrowTopRight size={20} />
            </h1>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:flex-col overflow-y-auto">
                {serviceList.map((item) => (
                    <button
                        key={item}
                        onClick={() => setSelectedCategory(item)}
                        className={`
                            px-3 py-2 rounded-xl font-heading text-para 
                            transition-all
                            ${
                                selectedCategory === item
                                    ? "bg-white shadow"
                                    : "bg-transparent"
                            }
                        `}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ServicesSideCard;
