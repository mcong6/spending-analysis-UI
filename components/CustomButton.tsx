"use client";

import React from "react";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  title: string;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
  className?: string;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onClick,
  variant = "contained",
  color = "primary",
  size = "medium",
  className,
  type = "button",
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      className={className}
      type={type}
    >
      {title}
    </Button>
  );
};

export default CustomButton;