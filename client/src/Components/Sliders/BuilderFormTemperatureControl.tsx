import React from "react";
import {motion} from "framer-motion";
import {useGesture} from "react-use-gesture";

interface TemperatureControlProps {
    value: number;
    onChange: (newValue: number) => void;
}

const BuilderFormTemperatureControl: React.FC<TemperatureControlProps> = React.memo(({value, onChange}) => {
    const bind = useGesture({
        onDrag: ({movement: [dx]}) => {
            const sensitivityFactor = 0.3;
            const percentage = dx * sensitivityFactor / window.innerWidth;
            const newValue = value + Math.round(percentage * (200 - 100));
            onChange(Math.max(100, Math.min(200, newValue)));
        }
    });

    const percentage = (value - 100) / 100;
    const progress = percentage * 100;
    const red = Math.round(255 * percentage);
    const blue = Math.round(255 * (1 - percentage));
    const backgroundColor = `rgb(${red}, 0, ${blue})`;

    return (
        <motion.div
            {...bind()}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.1
            }}
            className={`group select-none relative overflow-hidden w-full h-full flex justify-center items-center`}
        >
            {/* Display current temperature */}
            <img draggable={false}
                 className={'absolute group-hover:scale-125 transition duration-500  object-cover h-full w-full '}
                 src={'/builder/fire.jpg'} alt=""/>
            <motion.div
                className={`absolute  h-full w-full opacity-50 left-0 `}
                initial={{x: -2160}}
                animate={{x: 0, width: `${progress}%`, backgroundColor}}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    duration: 0.2
                }}
            />
            <motion.span
                className="transition duration-300 select-none inline-flex relative font-bold text-9xl text-white"
                style={{pointerEvents: "none"}}>
                {value}°C
            </motion.span>
        </motion.div>
    );
});

export default BuilderFormTemperatureControl;
