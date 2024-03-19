"use client";

import React from "react";

interface CustomButtonProps {
  title: string;
  type: "button";
  bgColor: string;
  textStyle?: string;
  handleClick: () => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  type,
  bgColor,
  textStyle,
  handleClick,
}) => {
  return (
    <button
      type={type}
      className={`${bgColor} flex justify-center rounded-lg px-6 py-1`}
      onClick={handleClick}
    >
      <span className={`text-white font-bold ${textStyle}`}>{title}</span>
    </button>
  );
};

export default CustomButton;
