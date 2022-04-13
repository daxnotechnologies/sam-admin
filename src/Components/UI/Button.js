import React from "react";

const Button = ({ children, alt, onClick, type }) => {
  return (
    <button
      className={`${
        alt
          ? "border border-red-500 text-red-500 hover:text-white hover:bg-red-500"
          : "text-white bg-primary hover:bg-green-700 hover:drop-shadow-xl hover:shadow-sm"
      } transition-all duration-300 text-sm py-[6px] px-[12px] rounded-md`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
