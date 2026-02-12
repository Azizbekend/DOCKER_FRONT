import { StyleColor, styleColorEnum } from "./config";

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  styleColor?: StyleColor;
};

// Цветовые классы для кнопок
const colorClasses: Record<StyleColor, string> = {
  blue: "bg-[#4A85F6] text-white hover:bg-[#3a6bc9] active:bg-[#2a52a0] shadow-sm hover:shadow-md",
  blueOutline: "border border-[#4A85F6] text-[#4A85F6] bg-white hover:bg-[#4A85F6] hover:text-white shadow-sm hover:shadow-md",
  gray: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 shadow-sm hover:shadow-md",
  red: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md",
  green: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-sm hover:shadow-md",
  white: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 shadow-sm hover:shadow-md"
};

export const Button = (props: Props) => {
  const {
    children,
    className = "",
    onClick,
    disabled = false,
    type = "button",
    style,
    styleColor = "blue"
  } = props;

  // Получаем классы для выбранного цвета
  const buttonColorClass = colorClasses[styleColor] || colorClasses.blue;
  
  // Классы для disabled состояния
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-300 hover:text-gray-500 shadow-none" 
    : "";

  return (
    <button
      name="button"
      type={type}
      disabled={disabled}
      className={`
        flex items-center justify-center 
        px-4 py-2.5 
        font-medium rounded-lg 
        transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A85F6]
        ${buttonColorClass}
        ${disabledClasses}
        ${className}
      `}
      onClick={(e) => {
        if (type !== "submit") {
          e.preventDefault();
          e.stopPropagation();
        }
        onClick?.(e);
      }}
      style={style}
    >
      {children}
    </button>
  );
};