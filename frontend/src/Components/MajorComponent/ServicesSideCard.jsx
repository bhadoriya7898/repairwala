import React, { useEffect, useState } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { getBrandCategoriesAPI } from "../../api/api.js";

const ServicesSideCard = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getBrandCategoriesAPI();
      setCategories(res.data.data);
    };
    fetchCategories();
  }, []);

  // ⭐ DEFAULT SELECT TELEVISION
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const tv = categories.find((c) =>
        c.name.toLowerCase().includes("tele")
      );

      if (tv) {
        setSelectedCategory(tv._id);
      }
    }
  }, [categories]);

  return (
    <aside
      className="
        bg-[#C6DBDB] rounded-2xl p-5 flex flex-col gap-8

        lg:w-[320px] lg:h-[679px]

        max-sm:w-full
        max-sm:h-auto
        max-sm:rounded-[20px]
        max-sm:p-4
        max-sm:gap-4
      "
    >
      <div className="flex items-center gap-2 max-sm:gap-1">
        <h1
          className="text-[#586082] font-bold lg:text-[35px]"
          style={{
            fontFamily: "ABC Repro",
            lineHeight: "30px",
            fontSize: "25px",
          }}
        >
          Repairwala Products Repair Services
        </h1>

        <CgArrowTopRight className="text-[#586082]" size={42} />
      </div>

      <div
        className="
          flex flex-col gap-3
          max-sm:flex-row
          max-sm:flex-wrap
          max-sm:gap-2
        "
      >
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`
              lg:px-10 lg:py-2 lg:text-base rounded-lg font-medium transition-all

              max-sm:h-[26px]
              max-sm:px-[10px]
              max-sm:py-[4px]
              max-sm:text-[12px]
              max-sm:rounded-[6px]

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
