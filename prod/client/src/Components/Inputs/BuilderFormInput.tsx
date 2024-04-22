'use client'

import React from "react";
import {motion} from "framer-motion";
import {shadowTextLg, shadowTextMd} from "@/Utils/CssModules";

interface InputProps {
    name: string;
    value: number;
    Background: string;
    Label: string;
    image: string;
    onChange: (name: string, value: number) => void;
    disabled?: boolean;
}

const BuilderFormInput: React.FC<InputProps> = React.memo((props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue: number = parseFloat(event.target.value);
        newValue = Math.abs(newValue);
        props.onChange(props.name, newValue);
    };

    return (
        <motion.div
            initial={{scale: .6 ,x:-1080}}
            animate={{scale: 1 ,x:0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.1
            }}
            className={`${props.disabled? " grayscale blur-sm  backdrop-blur-sm ":" "}  select-none overflow-clip relative w-full h-full flex  flex-col gap-2 justify-center items-center group  `}>
            <img draggable={false}
                 className={'absolute group-hover:scale-125 transition duration-500 group-hover:blur-lg object-cover h-full w-full '}
                 src={props.image} alt=""/>
            <motion.div className={`p-2 flex flex-col rounded-3xl items-center justify-center `}>

                <div className={`flex flex-col justify-center items-center`}>
                    <input
                        className=" bg-transparent w-full h-44 text-8xl italic drop-shadow-4xl font-black text-center text font-oswald  relative rounded-3xl text-white outline-none select-none"
                        type="number"
                        style={{...shadowTextMd}}
                        value={props.value}
                        onChange={handleChange}
                        inputMode="numeric"
                        draggable={false}
                        pattern="[0-9]*"
                        disabled={props.disabled}
                    />
                    <span style={{...shadowTextLg}} className={`relative text-xl italic font-black`}>mg</span>
                    <span
                        style={{...shadowTextLg}}
                        className={"font-sonsie text-white drop-shadow-4xl  rounded-3xl text-6xl  relative select-none  "}>{props.Label}</span>
                </div>
            </motion.div>
        </motion.div>
    );
});

export default BuilderFormInput;
