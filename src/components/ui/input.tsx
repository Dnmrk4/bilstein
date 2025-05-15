import React from "react";
import Input from "@/components/ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputComponent: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <Input
      className={`w-full p-2 rounded bg-neutral-800 text-gray-300 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      value="Test"
      onChange={() => console.log("Input changed")}
      placeholder="Test input"
      {...props}
    />
  );
};

export default InputComponent;
