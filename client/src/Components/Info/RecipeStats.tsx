import React, {useState} from "react";
import {motion} from "framer-motion";
import {ColorClassMap} from "@/Utils/Constants.ts";
import {FaStar, FaSquare, FaCircle} from 'react-icons/fa';
import {BsTriangle} from 'react-icons/bs';
import {IconType} from "react-icons";
import Bounce from "@/Motion/Bounce.tsx";
import {BadgeDollarSign, HandCoins, HeartPulse, Scale} from "lucide-react";

interface InputProps {
    value: number;
    Background: string;
    onChange: (name: string, value: number) => void;
}

const RecipeStats: React.FC<InputProps> = React.memo(({ value, onChange}) => {

    // Define the available shapes and their corresponding icons
    const shapes: { [key: string]: IconType } = {
        star: FaStar,
        square: FaSquare,
        triangular: BsTriangle,
        circular: FaCircle
    };

    // State to track the current shape
    const [currentShape, setCurrentShape] = useState<keyof typeof shapes>("star");

    const handleClick = () => {
        const shapeKeys = Object.keys(shapes);
        const currentIndex = shapeKeys.findIndex(key => key === currentShape);
        const nextIndex = (currentIndex + 1) % shapeKeys.length;
        const nextShapeKey = shapeKeys[nextIndex];
        setCurrentShape(nextShapeKey as keyof typeof shapes);
    };

    // Get the current shape icon
    const Icon = shapes[currentShape];

    return (
        <motion.div
            initial={{scale: 0, y: 2160}}
            animate={{scale: 1, y: 0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.5
            }}
            className={`relative overflow-clip select-none w-full h-full flex flex-col justify-center items-center group `}
        >
            <img draggable={false}
                 className={'absolute object-cover group-hover:scale-125 transition duration-500 group-hover:blur-lg  h-full w-full '}
                 src={'/builder/nutritional.jpg'} alt=""/>
            <div className="flex justify-center items-center drop-shadow-4xl relative  font-sonsie text-4xl text-white">
                <BadgeDollarSign size={60}/> vs <HeartPulse size={60}/> </div>
            <div className={`relative italic flex text-6xl gap-2 font-black font-oswald`}>
                <motion.span
                    whileTap={{scale: 2}}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        duration: 0.5
                    }}
                    className={`backdrop-blur-xl bg-black/10 flex rounded-full h-44 w-44 items-center justify-center `}>$40
                </motion.span>
                <motion.span
                    whileTap={{scale: 2}}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        duration: 0.5
                    }}
                    className={`backdrop-blur-xl bg-black/10  gap-2 flex rounded-full h-44 w-44 items-center justify-center`}>200 <span
                    className={`text-2xl `}>
                    Kcal
                </span>
                </motion.span>
            </div>

            {/*{Icon && (*/}
            {/*    <Bounce whileTapCustom={.6} whileHoverCustom={1.1}>*/}
            {/*        <Icon onClick={handleClick} className={`drop-shadow-4xl relative h-44 w-44`}/>*/}
            {/*    </Bounce>*/}
            {/*)}*/}
        </motion.div>
    );
});

export default RecipeStats;
