import React from "react";

interface InputProps {
    name: string;
    value: number;
    onChange: (name: string, value: number) => void;
}

const BuilderFormInput: React.FC<InputProps> = ({ name, value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        onChange(name, newValue);
    };

    return <input type="number" value={value} onChange={handleChange} />;
};

export default BuilderFormInput;
