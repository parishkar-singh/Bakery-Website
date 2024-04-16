import React, { useState } from "react";
import { motion } from "framer-motion";

interface TemperatureControlProps {
    value: number;
    minValue: number;
    maxValue: number;
    step: number;
    onChange: (newValue: number) => void;
}

const BuilderFormTemperatureControl: React.FC<TemperatureControlProps> = React.memo( ({ value, minValue, maxValue, step, onChange }) => {
    const handleClick = (increase: boolean) => {
        if (increase && value < maxValue) {
            onChange(value + step);
        } else if (!increase && value > minValue) {
            onChange(value - step);
        }
    };

    return (
        <motion.div
            initial={{scale: 0 ,y:2160}}
            animate={{scale: 1 ,y:0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.1
            }}
            className=" group select-none relative bg-gradient-to-r from-blue-600 via-black to-red-600 overflow-hidden w-full h-full flex justify-center items-center">
            {/* Left side for decreasing temperature */}
            <div
                onClick={() => handleClick(false)}
                className=" absolute left-0  top-0 bottom-0 w-1/2 cursor-pointer"
            />
            {/* Right side for increasing temperature */}
            <div
                onClick={() => handleClick(true)}
                className="absolute right-0 top-0 bottom-0  w-1/2 cursor-pointer"
            />
            {/* Display current temperature */}
            <motion.span
                className="transition duration-300 select-none inline-flex relative font-bold text-9xl text-white"
                  style={{ pointerEvents: "none"}}>{value}°C</motion.span>


        </motion.div>
    );
});

export default BuilderFormTemperatureControl;
