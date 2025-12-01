import React from "react";
import CategoriesCard from "../MinorComponent/CategoriesCard";

import ac from "../../assets/Images/Categories/airConditioners.png";
import tv from "../../assets/Images/Categories/smartTv.png";
import washingmachine from "../../assets/Images/Categories/washingMachines.png";
import fridge from "../../assets/Images/Categories/refrigerators.png";
import windowAC from "../../assets/Images/Categories/windowAirConditioners.png";
import RO from "../../assets/Images/Categories/waterPurifier.png";
import microwave from "../../assets/Images/Categories/microwave.png";

const products = {
    "Telivision": [
        { title: "LCD T.V.", img: tv, category: "Television" },
        { title: "LED T.V.", img: tv, category: "Television" },
        { title: "Smart T.V.", img: tv, category: "Television" },
        { title: "4K, 8K T.V.", img: tv, category: "Television" },
        { title: "OLED T.V.", img: tv, category: "Television" },
        { title: "QLED T.V.", img: tv, category: "Television" },
    ],

    "Air Conditioners": [
        { title: "Split AC", img: ac, category: "Air Conditioners" },
        { title: "Inverter AC", img: ac, category: "Air Conditioners" },
        { title: "Window AC", img: ac, category: "Air Conditioners" },
        { title: "1 Ton AC", img: ac, category: "Air Conditioners" },
        { title: "1.5 Ton AC", img: ac, category: "Air Conditioners" },
        { title: "2 Ton AC", img: ac, category: "Air Conditioners" },
    ],

    "Window Air Conditioners": [
        { title: "Window AC 1 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 1.5 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Window AC 2 Ton", img: windowAC, category: "Window Air Conditioners" },
        { title: "Classic Window AC", img: windowAC, category: "Window Air Conditioners" },
        { title: "Premium Window AC", img: windowAC, category: "Window Air Conditioners" },
        { title: "Energy Saver Window AC", img: windowAC, category: "Window Air Conditioners" },
    ],

    "Refrigerators": [
        { title: "Double Door", img: fridge, category: "Refrigerators" },
        { title: "Single Door", img: fridge, category: "Refrigerators" },
        { title: "Triple Door", img: fridge, category: "Refrigerators" },
        { title: "Mini Fridge", img: fridge, category: "Refrigerators" },
        { title: "Smart Fridge", img: fridge, category: "Refrigerators" },
        { title: "Inverter Fridge", img: fridge, category: "Refrigerators" },
    ],

    "Washing Machines": [
        { title: "Front Load", img: washingmachine, category: "Washing Machines" },
        { title: "Top Load", img: washingmachine, category: "Washing Machines" },
        { title: "Semi-Automatic", img: washingmachine, category: "Washing Machines" },
        { title: "Fully Automatic", img: washingmachine, category: "Washing Machines" },
        { title: "Smart Washer", img: washingmachine, category: "Washing Machines" },
        { title: "5 Star Washer", img: washingmachine, category: "Washing Machines" },
    ],

    "water purifier": [
        { title: "RO Purifier", img: RO, category: "Water Purifier" },
        { title: "UV Purifier", img: RO, category: "Water Purifier" },
        { title: "UF Purifier", img: RO, category: "Water Purifier" },
        { title: "RO + UV Purifier", img: RO, category: "Water Purifier" },
        { title: "Smart Purifier", img: RO, category: "Water Purifier" },
        { title: "Premium RO", img: RO, category: "Water Purifier" },
    ],

    "Microwave Ovens": [
        { title: "Grill Microwave", img: microwave, category: "Microwave" },
        { title: "Convection Microwave", img: microwave, category: "Microwave" },
        { title: "Solo Microwave", img: microwave, category: "Microwave" },
        { title: "Smart Microwave", img: microwave, category: "Microwave" },
        { title: "Premium Microwave", img: microwave, category: "Microwave" },
        { title: "High Power Microwave", img: microwave, category: "Microwave" },
    ],
};

const ProductCard = ({ selectedCategory }) => {
    const list = products[selectedCategory] || [];

    return (
        <div
            className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                gap-6 
                w-full
            "
        >
            {list.map((p, i) => (
                <CategoriesCard key={i} data={p} />
            ))}
        </div>
    );
};

export default ProductCard;
