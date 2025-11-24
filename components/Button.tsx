import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-lg font-bold transition-all duration-200 active:scale-95 shadow-md flex justify-center items-center gap-2";
  
  const variants = {
    primary: "bg-mkp-red text-white hover:bg-red-800 border-2 border-transparent",
    secondary: "bg-mkp-gray text-white hover:bg-gray-800 border-2 border-transparent",
    outline: "bg-white text-mkp-red border-2 border-mkp-red hover:bg-red-50",
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};