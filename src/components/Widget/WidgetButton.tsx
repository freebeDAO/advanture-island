import React from "react";
import classNames from "classnames";

interface WidgetButtonProps {
  style: "primary" | "secondary";
  onClick?: (() => void) | undefined;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
}

const WidgetButton: React.FC<WidgetButtonProps> = ({
  style,
  onClick,
  disabled,
  loading,
  className,
  type,
  children,
}) => {
  const baseStyles = {
    primary: "text-white rounded-xl",
    secondary: "border border-green-500 rounded-lg hover:bg-green-600",
  };

  const defaultWidth = {
    primary: "w-full",
    secondary: "w-[128px]",
  };

  const defaultHeight = {
    primary: "h-[50px]",
    secondary: "h-[40px]",
  };

  const defaultFontSize = {
    primary: "text-xl",
    secondary: "text-base",
  };

  const combinedClassName = classNames(
    baseStyles[style],
    disabled || loading ? "opacity-50" : "",
    className,
    {
      [defaultWidth[style]]: !className?.includes("w-"),
      [defaultHeight[style]]: !className?.includes("h-"),
      [defaultFontSize[style]]: !className?.includes("text-"),
    }
  );

  return (
    <button
      className={combinedClassName}
      onClick={() => {
        if (disabled || loading) {
          return;
        }
        onClick && onClick();
      }}
      type={type}
    >
      {style === "secondary" ? (
        <span className="text-green-500 leading-6">{children}</span>
      ) : (
        children
      )}
    </button>
  );
};

export default WidgetButton;
