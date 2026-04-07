import React from "react";
type Variant = "primary" | "secondary" | "danger" | "outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const base = "min-h-12 px-4 py-2 rounded-sm cursor-pointer ";
  const variantClass: Record<Variant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline:
      "bg-white text-yellow-500 border border-yellow-500 hover:bg-yellow-50",
  };
  return (
    <button
      {...props}
      className={`${base} ${variantClass[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
