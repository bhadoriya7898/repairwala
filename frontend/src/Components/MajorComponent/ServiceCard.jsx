import React, { useState } from "react";
import ServiceSideCard from "./ServicesSideCard";
import ProductCard from "./ProductCard";

const ServiceCard = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[293px_1fr] gap-5 my-10 w-full">
            <ServiceSideCard
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <ProductCard selectedCategory={selectedCategory} />
        </div>
    );
};

export default ServiceCard;
