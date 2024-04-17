import React, {useState} from "react";
import {motion} from "framer-motion";
import {ColorClassMap} from "@/Utils/Constants.ts";
import {FaStar, FaSquare, FaCircle} from 'react-icons/fa';
import {BsTriangle} from 'react-icons/bs';
import {IconType} from "react-icons";
import Bounce from "@/Motion/Bounce.tsx";
import {BadgeDollarSign, HandCoins, HeartPulse, Scale} from "lucide-react";
import {shadowTextMd} from "@/Utils/CssModules.ts";

interface InputProps {
    onChange: (name: string, value: number) => void;
}

interface RecipeStatsItemProps {
    info: string
    unit?: string
}

const RecipeStatItem: React.FunctionComponent<RecipeStatsItemProps> = React.memo((props): React.ReactNode => {
    return <>
        <motion.span
            whileTap={{scale: 2}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.1
            }}
            className={`backdrop-blur bg-black/10  gap-2 flex rounded-full h-44 w-44 items-center justify-center`}>{props.info} {
            props.unit && <span className={`text-2xl `}>{props.unit}</span>
        }
        </motion.span>
    </>
})
const RecipeStats: React.FC<InputProps> = React.memo(() => {
    // Define the available shapes and their corresponding icons

    return (
        <div
            className={`relative overflow-clip select-none w-full h-full flex flex-col justify-center items-center group `}
        >
            <img draggable={false}
                 className={'absolute object-cover group-hover:scale-125 transition duration-500 group-hover:blur-lg  h-full w-full '}
                 src={'/builder/nutritional.jpg'} alt=""/>
            {/*<span style={{...shadowTextMd}}*/}
            {/*      className=" drop-shadow-4xl relative p-2  font-sonsie text-4xl text-white">At a Glance</span>*/}
            <div className={`relative italic grid grid-rows-2 grid-cols-2 text-6xl gap-2 font-black font-oswald`}>
                <RecipeStatItem info={'$40'}/>
                <RecipeStatItem info={'200'} unit={`kcal`}/>
                <RecipeStatItem info={'10'} unit={`min`}/>
                <RecipeStatItem info={'5'} unit={`gram`}/>
            </div>

            {/*{Icon && (*/}
            {/*    <Bounce whileTapCustom={.6} whileHoverCustom={1.1}>*/}
            {/*        <Icon onClick={handleClick} className={`drop-shadow-4xl relative h-44 w-44`}/>*/}
            {/*    </Bounce>*/}
            {/*)}*/}
        </div>
    );
});

export default RecipeStats;
