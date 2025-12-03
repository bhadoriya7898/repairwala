import React, { useEffect, useState } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { getBrandCategoriesAPI } from "../../api/api.js";

const ServicesSideCard = ({ selectedCategory, setSelectedCategory }) => {

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await getBrandCategoriesAPI();
            setCategories(res.data.data);
        } catch (err) {
            console.log("Category Fetch Error:", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="bg-accent rounded-3xl p-5 flex flex-col gap-10 w-full h-auto"
             style={{ maxHeight: "679px" }}>

            <h1 className="text-primary font-heading font-bold text-[24px] flex items-center gap-1">
                Repairwala Products Repair Services
                <CgArrowTopRight size={50} />
            </h1>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:flex-col overflow-y-auto">
                {categories.map((cat) => (
                    <button
                        key={cat._id}
                        onClick={() => setSelectedCategory(cat._id)}
                        className={`px-3 py-2 rounded-xl font-heading text-para transition-all
                            ${selectedCategory === cat._id ? "bg-white shadow" : "bg-transparent"}
                        `}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ServicesSideCard;
