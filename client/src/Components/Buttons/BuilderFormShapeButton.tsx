import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaSquare, FaCircle } from 'react-icons/fa';
import { BsTriangle } from 'react-icons/bs';
import { IconType } from "react-icons";
import Bounce from "@/Motion/Bounce.tsx";
import { shadowTextMd } from "@/Utils/CssModules.ts";

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const BuilderFormShapeButton: React.FC<InputProps> = React.memo((props) => {
    // Define the available shapes and their corresponding icons
    const shapes: { [key: string]: IconType } = {
        square: FaSquare,
        star: FaStar,
        triangle: BsTriangle,
        circle: FaCircle
    };

    // State to track the current shape
    const [currentShape, setCurrentShape] = useState<keyof typeof shapes>(props.value);

    const handleClick = () => {
        const shapeKeys = Object.keys(shapes);
        const currentIndex = shapeKeys.findIndex(key => key === currentShape);
        const nextIndex = (currentIndex + 1) % shapeKeys.length;
        const nextShapeKey = shapeKeys[nextIndex];
        setCurrentShape(nextShapeKey as keyof typeof shapes);
        props.onChange(nextShapeKey);
    };

    // Get the current shape icon
    const Icon = shapes[currentShape];

    return (
        <motion.div
            whileTap={{ scale: 2, borderRadius: "100%" }}
            initial={{ scale: .6, x: -1080 }}
            animate={{ scale: 1, x: 0 }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.1
            }}
            className={`relative overflow-clip select-none w-full h-full flex flex-col justify-center items-center group `}
        >
            <img
                draggable={false}
                className={'absolute object-cover group-hover:scale-125 transition duration-500 group-hover:blur-lg h-full w-full'}
                src={'/builder/shapes.jpg'}
                alt=""
            />
            <span style={{ ...shadowTextMd }} className="drop-shadow-4xl relative font-sonsie text-4xl text-white">Shape</span>
            {Icon && (
                <Bounce whileTapCustom={.6} whileHoverCustom={1.1}>
                    <Icon onClick={handleClick} className="drop-shadow-4xl relative h-44 w-44" />
                </Bounce>
            )}
        </motion.div>
    );
});

export default BuilderFormShapeButton;
