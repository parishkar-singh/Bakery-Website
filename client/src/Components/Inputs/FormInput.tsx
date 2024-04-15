import React, { useState, ChangeEvent } from "react";

interface FormInputProps {
    type?: "text" | "email" | "password" | "number";
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 type = "text",
                                                 label,
                                                 name,
                                                 placeholder = "",
                                                 required = false,
                                             }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setError(null);
    };

    const validateInput = (): boolean => {
        if (required && value.trim() === "") {
            setError(`${label} is required`);
            return false;
        }

        if (type === "email" && !validateEmail(value)) {
            setError("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (validateInput()) {
            console.log("Form submitted with value:", value);
        }
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className={`text-black`} htmlFor={name}>{label}</label>
                <input
                    className={`text-black outline-none rounded  p-2 font-oswald `}
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    required={required}
                />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormInput;
