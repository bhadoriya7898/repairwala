import React, { useEffect, useState } from "react";
import CategoriesCard from "../MinorComponent/CategoriesCard";
import { getBrandsByCategoryAPI } from "../../api/api.js";


const ProductCard = ({ selectedCategory }) => {
    const [brands, setBrands] = useState([]);

 const fetchBrands = async () => {
    if (!selectedCategory) return;
    try {
        const res = await getBrandsByCategoryAPI(selectedCategory);
        setBrands(res.data.data);
    } catch (error) {
        console.log("Error fetching brands", error);
    }
};


    useEffect(() => {
        fetchBrands();
    }, [selectedCategory]);

    return (
       <div
  className="
    w-[921px]
    grid
    grid-cols-3
    gap-[15px]
  "
>
    {brands.map((b, i) => (
        <CategoriesCard key={i} data={b} />
    ))}
</div>
    );
};

export default ProductCard;
