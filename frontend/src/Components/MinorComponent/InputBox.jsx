import React from "react";

const InputBox = ({
  children,
  label,
  id,
  register,
  validation = {},  // ⭐ new
  type = "text",
  placeholder = "",
  className = "",
  bg = "bg-accent"
}) => {
  return (
    <div className={`relative w-auto h-[54px] border-1 rounded-xl p-2 ${className} ${bg}`}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, validation)}   // ⭐ validation injected here
        className={`w-full h-full p-2 focus:outline-none ${bg}`}
      />

      <label
        htmlFor={id}
        className={`absolute -top-4 left-4 w-auto whitespace-normal ${bg}`}
      >
        {label}
      </label>

      {children}
    </div>
  );
};

export default InputBox;
