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

    /* DESKTOP */
    lg:h-[679px] lg:overflow-y-auto pr-2

    /* MOBILE — only card list scrolls */
    max-[480px]:h-[530px]
    max-[480px]:overflow-y-scroll
  "
>
  <div
    className="
      grid

      /* MOBILE: 1 card per row + clear spacing */
      max-[480px]:grid-cols-1
      max-[480px]:gap-5

      /* TABLET */
      sm:grid-cols-2

      /* DESKTOP */
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
