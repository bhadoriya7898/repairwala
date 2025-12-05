// ServicesSideCard.jsx
import React, { useEffect, useState } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { getBrandCategoriesAPI } from "../../api/api.js";

const ServicesSideCard = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getBrandCategoriesAPI();
        setCategories(res.data.data);
      } catch (err) {
        console.log("Category Fetch Error:", err);
      }
    };
    fetchCategories();
  }, []);

  // Default category = Television
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const tv = categories.find((c) => c.name === "Television");
      if (tv) setSelectedCategory(tv._id);
    }
  }, [categories]);

  return (
    <aside
      className="
        bg-[#C6DBDB] rounded-2xl p-5 flex flex-col gap-8
        lg:w-[320px] lg:h-[679px]

        /* MOBILE Figma */
        max-[400px]:w-full
max-[400px]:h-auto

        max-[400px]:rounded-[20px]
        max-[400px]:p-4
        max-[400px]:gap-4
      "
    >
      {/* Heading */}
      <div className="flex items-center gap-2 max-[400px]:gap-1">
        <h1
          className="text-[#586082] font-bold lg:text-[28px]"
          style={{
            fontFamily: "ABC Repro",
            lineHeight: "30px",
            fontSize: "30px",
          }}
        >
          Repairwala Products Repair Services
        </h1>

        <CgArrowTopRight
          className="text-[#586082]"
          size={50}
        />
      </div>

      {/* Category Pills */}
      <div
        className="
          flex flex-col gap-3

          /* MOBILE layout */
          max-[400px]:flex-row
          max-[400px]:flex-wrap
          max-[400px]:gap-2
        "
      >
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`
              lg:px-10 lg:py-2 lg:text-base rounded-lg font-medium transition-all
              
              /* MOBILE sizes */
              max-[400px]:h-[24px]
              max-[400px]:rounded-[5px]
              max-[400px]:px-[10px]
              max-[400px]:py-[5px]
              max-[400px]:text-[12px]

              ${
                selectedCategory === cat._id
                  ? "bg-white shadow text-[#586082]"
                  : "bg-transparent text-black"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ServicesSideCard;
