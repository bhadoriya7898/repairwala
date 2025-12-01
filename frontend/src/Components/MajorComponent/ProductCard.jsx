import React from "react";
import CategoriesCard from "../MinorComponent/CategoriesCard";

import ac from "../../assets/Images/Categories/airConditioners.png";
import tv from "../../assets/Images/Categories/smartTv.png";
import washingmachine from "../../assets/Images/Categories/washingMachines.png";
import fridge from "../../assets/Images/Categories/refrigerators.png";
import windowAC from "../../assets/Images/Categories/windowAirConditioners.png";
import RO from "../../assets/Images/Categories/waterPurifier.png";
import microwave from "../../assets/Images/Categories/microwave.png";

// FIXED: KEYS EXACTLY MATCH SIDEBAR
const products = {
    "Telivision": [
        { title: "LCD TV", img: tv, category: "Telivision" },
        { title: "LED TV", img: tv, category: "Telivision" },
        { title: "Smart TV", img: tv, category: "Telivision" },
        { title: "LCD TV", img: tv, category: "Telivision" },
        { title: "LED TV", img: tv, category: "Telivision" },
        { title: "Smart TV", img: tv, category: "Telivision" },
        { title: "LCD TV", img: tv, category: "Telivision" },
        { title: "LED TV", img: tv, category: "Telivision" },
        { title: "Smart TV", img: tv, category: "Telivision" },
    ],

    "Air Conditioners": [
        { title: "Split AC", img: ac, category: "Air Conditioners" },
        { title: "Inverter AC", img: ac, category: "Air Conditioners" },
        { title: "Split AC", img: ac, category: "Air Conditioners" },
        { title: "Inverter AC", img: ac, category: "Air Conditioners" },
        { title: "Split AC", img: ac, category: "Air Conditioners" },
        { title: "Inverter AC", img: ac, category: "Air Conditioners" },
        { title: "Inverter AC", img: ac, category: "Air Conditioners" },
        { title: "Split AC", img: ac, category: "Air Conditioners" },
        { title: "Inverter AC", img: ac, category: "Air Conditioners" },
    ],

    "Window Air Conditioners": [
        { title: "Window AC 1 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 1.5 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 1 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 1.5 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 1 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 1.5 Ton", img: windowAC, category: "Window Air Conditioners" },
         { title: "Window AC 1.5 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 1 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 1.5 Ton", img: windowAC, category: "Window Air Conditioners" },

    ],

    "Refrigerators": [
        { title: "Double Door", img: fridge, category: "Refrigerators" },
        { title: "Single Door", img: fridge, category: "Refrigerators" },
        { title: "Double Door", img: fridge, category: "Refrigerators" },
        { title: "Single Door", img: fridge, category: "Refrigerators" },
        { title: "Double Door", img: fridge, category: "Refrigerators" },
        { title: "Single Door", img: fridge, category: "Refrigerators" },
        { title: "Single Door", img: fridge, category: "Refrigerators" },
        { title: "Double Door", img: fridge, category: "Refrigerators" },
        { title: "Single Door", img: fridge, category: "Refrigerators" },
    ],

    "Washing Machines": [
        { title: "Front Load", img: washingmachine, category: "Washing Machines" },
        { title: "Top Load", img: washingmachine, category: "Washing Machines" },
        { title: "Front Load", img: washingmachine, category: "Washing Machines" },
        { title: "Top Load", img: washingmachine, category: "Washing Machines" },
        { title: "Front Load", img: washingmachine, category: "Washing Machines" },
        { title: "Top Load", img: washingmachine, category: "Washing Machines" },
        { title: "Top Load", img: washingmachine, category: "Washing Machines" },
        { title: "Front Load", img: washingmachine, category: "Washing Machines" },
        { title: "Top Load", img: washingmachine, category: "Washing Machines" },
    ],

    "Water purifier": [
        { title: "RO Water Purifier", img: RO, category: "water purifier" },
        { title: "UV Water Purifier", img: RO, category: "water purifier" },
        { title: "RO Water Purifier", img: RO, category: "water purifier" },
        { title: "UV Water Purifier", img: RO, category: "water purifier" },
        { title: "RO Water Purifier", img: RO, category: "water purifier" },
        { title: "UV Water Purifier", img: RO, category: "water purifier" },
         { title: "UV Water Purifier", img: RO, category: "water purifier" },
        { title: "RO Water Purifier", img: RO, category: "water purifier" },
        { title: "UV Water Purifier", img: RO, category: "water purifier" },
    ],

    "Microwave Ovens": [
        { title: "Grill Microwave", img: microwave, category: "Microwave Ovens" },
        { title: "Convection Microwave", img: microwave, category: "Microwave Ovens" },
        { title: "Grill Microwave", img: microwave, category: "Microwave Ovens" },
        { title: "Convection Microwave", img: microwave, category: "Microwave Ovens" },
        { title: "Grill Microwave", img: microwave, category: "Microwave Ovens" },
        { title: "Convection Microwave", img: microwave, category: "Microwave Ovens" },
        { title: "Convection Microwave", img: microwave, category: "Microwave Ovens" },
        { title: "Grill Microwave", img: microwave, category: "Microwave Ovens" },
        { title: "Convection Microwave", img: microwave, category: "Microwave Ovens" },
    ],
};

const ProductCard = ({ selectedCategory }) => {
    const list = products[selectedCategory] || [];
    const visibleItems = list.slice(0, 20);

    return (
        <div
            className="flex flex-wrap gap-3.5 rounded-3xl md:justify-start justify-center"
            style={{
                maxHeight: "679px",
                overflowY: "auto",
                paddingRight: "10px",
            }}
        >
            {visibleItems.map((p, i) => (
                <CategoriesCard key={i} data={p} />
            ))}
        </div>
    );
};

export default ProductCard;
