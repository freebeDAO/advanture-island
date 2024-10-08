import React from 'react';

interface SelectProps {
    value: string;
    onValueChange: (value: string) => void;
    options: { label: string; value: string }[];
    label?: string;
}

interface InputProps {
    type?: string;
    value: any;
    min?: string;
    max?: string;
    step?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}


const Select: React.FC<SelectProps> = ({ value, onValueChange, options, label }) => {
    return (
        <div className="flex flex-col space-y-1">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <select
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const Input: React.FC<InputProps> = ({ type = 'text', min, max, step, value, onChange, label }) => {
    return (
        <div className="flex flex-col space-y-1">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <input
                type={type}
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
        </div>
    );
};

export { Select, Input };