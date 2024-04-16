import React from "react";
import {motion} from "framer-motion";
import {ColorClassMap} from "@/Utils/Constants.ts";

interface InputProps {
    name: string;
    value: number;
    Background: string;
    Label: string;
    image: string;
    onChange: (name: string, value: number) => void;
    delay: number// Define the motion direction prop
}

const BuilderFormInput: React.FC<InputProps> = ({name, delay, image, value, onChange, Background, Label}) => {
    const BuilderFormInputBackgroundClass: string = ColorClassMap[Background] || 'bg-gray-500';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        onChange(name, newValue);
    };

    return (
        <motion.div
            initial={{x: 2160}}
            animate={{x: 0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.5,
                delay: delay ? delay : 0.5
            }}
            className={`select-none  relative w-full h-full flex  flex-col gap-2 justify-center items-center group  ${BuilderFormInputBackgroundClass}`}>
            <img draggable={false}
                 className={'absolute group-hover:scale-125 transition duration-500 group-hover:blur-lg object-contain h-full w-full '}
                 src={image} alt=""/>
            <motion.div className={`p-2  flex flex-col rounded-3xl items-center justify-center `}>
                <span
                    className={"font-sonsie text-white drop-shadow-4xl  rounded-3xl text-6xl  relative select-none  "}>{Label}</span>
                <div>
                <input
                    className=" bg-transparent w-44 h-44 text-8xl italic drop-shadow-4xl font-black text-center text font-oswald  relative rounded-3xl text-white outline-none select-none"
                    type="number"
                    value={value}
                    onChange={handleChange}
                    inputMode="numeric"
                    draggable={false}
                    pattern="[0-9]*"
                />
                    <span className={`relative text-xl italic font-black`}>gm</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BuilderFormInput;
