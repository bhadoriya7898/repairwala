// ProductCard.jsx
import React, { useEffect, useState } from "react";
import CategoriesCard from "../MinorComponent/CategoriesCard";
import { getBrandsByCategoryAPI } from "../../api/api.js";

const ProductCard = ({ selectedCategory }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!selectedCategory) return;
      const res = await getBrandsByCategoryAPI(selectedCategory);
      setBrands(res.data.data);
    };
    fetchBrands();
  }, [selectedCategory]);

return (
  <div
    className="
      w-full 
      lg:h-[679px] lg:overflow-y-auto pr-2

      max-[500px]:w-full
      max-[500px]:overflow-visible
      max-[500px]:h-auto
    "
  >
    <div
      className="
        grid

        max-[500px]:grid-cols-2
        max-[500px]:gap-4

        sm:grid-cols-2
        lg:grid-cols-3
        lg:gap-6
      "
    >
      {brands.map((b, i) => (
        <CategoriesCard key={i} data={b} />
      ))}
    </div>
  </div>
);

};

export default ProductCard;
