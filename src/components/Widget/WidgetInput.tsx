import React, { HTMLInputTypeAttribute, ReactNode } from "react";
import classNames from "classnames";

interface WidgetInputProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  className?: string;
  required?: boolean | undefined;
  icon?: ReactNode;
}

const WidgetInput: React.FC<WidgetInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  className,
  required,
  icon,
}) => {
  const baseStyles =
    "input w-full rounded-2xl text-black h-8 focus:outline-none placeholder:text-gray-400 placeholder:text-sm text-sm pl-4";

  const combinedClassName = classNames(baseStyles, className);

  return (
    <div className="w-full h-full">
      <input
        type={type}
        placeholder={placeholder}
        className={combinedClassName}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
      />
      {/* 如果传入了图标，则显示图标 */}
      {icon && <div className="flex items-center">{icon}</div>}
    </div>
  );
};

export default WidgetInput;
