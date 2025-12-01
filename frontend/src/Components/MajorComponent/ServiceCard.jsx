import React, { useState } from "react";
import ServiceSideCard from "./ServicesSideCard";
import ProductCard from "./ProductCard";

const ServiceCard = () => {
    const [selectedCategory, setSelectedCategory] = useState("Telivision");

    return (
        <div className="flex w-full flex-col md:flex-row gap-5 my-20">
            <ServiceSideCard
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <ProductCard selectedCategory={selectedCategory} />
        </div>
    );
};

export default ServiceCard;
