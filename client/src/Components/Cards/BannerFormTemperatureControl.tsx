import React, { useState } from "react";
import { motion } from "framer-motion";

interface TemperatureControlProps {
    value: number;
    minValue: number;
    maxValue: number;
    step: number;
    onChange: (newValue: number) => void;
}

const BannerFormTemperatureControl: React.FC<TemperatureControlProps> = ({ value, minValue, maxValue, step, onChange }) => {
    const handleClick = (increase: boolean) => {
        if (increase && value < maxValue) {
            onChange(value + step);
        } else if (!increase && value > minValue) {
            onChange(value - step);
        }
    };

    return (
        <div className=" select-none relative bg-black overflow-hidden w-full h-full flex justify-center items-center">
            {/* Left side for decreasing temperature */}
            <motion.div
                onClick={() => handleClick(false)}
                initial={{scale: 1.2}}
                whileTap={{scale: 2}}
                className=" absolute left-0  blur-2xl top-0 bottom-0 bg-blue-600 w-1/4 cursor-pointer"
            />
            {/* Right side for increasing temperature */}
            <motion.div
                onClick={() => handleClick(true)}
                initial={{scale: 1.2}}
                whileTap={{scale:2}}
                className="absolute blur-2xl  right-0 top-0 bottom-0 bg-red-600 w-1/4 cursor-pointer"
            />
            {/* Display current temperature */}
            <span className="select-none inline-flex relative font-bold text-9xl text-white"
                  style={{ pointerEvents: "none"}}>{value}°C</span>


        </div>
    );
};

export default BannerFormTemperatureControl;
