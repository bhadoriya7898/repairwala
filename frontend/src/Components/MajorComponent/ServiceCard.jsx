// ServiceCard.jsx
import React, { useState } from "react";
import ServicesSideCard from "./ServicesSideCard";
import ProductCard from "./ProductCard";

const ServiceCard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="w-full my-6">
      <div className="flex flex-col lg:flex-row gap-5 w-full">

        {/* LEFT */}
        <div className="lg:w-[320px] w-full">
          <ServicesSideCard
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* RIGHT */}
        <div className="flex-1 w-full">
          <ProductCard selectedCategory={selectedCategory} />
        </div>

      </div>
    </section>
  );
};

export default ServiceCard;
