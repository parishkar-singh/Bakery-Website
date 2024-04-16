import React from "react";
import {motion} from "framer-motion";
import {ColorClassMap} from "@/Utils/Constants.ts";

interface InputProps {
    name: string;
    value: number;
    Background: string;
    Label: string;
    onChange: (name: string, value: number) => void;
    icon: React.ComponentType<any>;
    delay: number
}

const BuilderFormButton: React.FC<InputProps> = React.memo(({
                                                                name,
                                                                value,
                                                                delay,
                                                                onChange,
                                                                Background,
                                                                Label,
                                                                icon: Icon
                                                            }) => {
    const BuilderFormInputBackgroundClass: string = ColorClassMap[Background] || 'bg-gray-500';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = parseFloat(event.target.value);
        onChange(name, newValue);
    };

    return (
        <motion.div
            whileTap={{scale: 2, borderRadius: "100%"}}
            initial={{scale: .5, x: 2160}}
            animate={{scale: 1, x: 0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: .5,
                delay: delay ? delay : 0.5
            }}
            className={`group select-none w-full h-full flex flex-col justify-center items-center ${BuilderFormInputBackgroundClass}`}>
            <span className="font-sonsie text-4xl text-white">{Label}</span>
            {Icon && <Icon className="h-44 w-44"/>}
        </motion.div>
    );
});

export default BuilderFormButton;
