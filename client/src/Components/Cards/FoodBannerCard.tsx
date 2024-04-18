import {ColorClassMap} from "@/Utils/Constants.ts";
import React from "react";
import Bounce from "@/Motion/Bounce.tsx";
import {motion} from "framer-motion";

export interface RecipeDetails {
    name: string;
    shape: string;
    temperature: number;
    calories: number;
    oil: number;
    sugar: number;
    fiber: number;
    soda: number;
    nuts: number;
    cookingTime: number;
    price: number;
}

interface BannerCardProps {
    Background: string;
    Image: string;
    Heading: string;
    Details: RecipeDetails;
}

const FoodBannerCard: React.FunctionComponent<BannerCardProps> = React.memo(({Background, Image, Heading, Details}) => {
    // console.log(Details)
    const BannerBackgroundClass: string = ColorClassMap[Background] || 'bg-gray-500';
    return (
        <motion.div
            whileTap={{scale: 2, borderRadius: "100%"}}
            initial={{scale: 0, y: 2160}}
            animate={{scale: 1, y: 0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.5
            }}
            className={`relative flex justify-center items-center select-none ${BannerBackgroundClass} w-full h-full group`}
        >
            <img draggable="false"
                 className="absolute  group-hover:scale-125 w-full h-full object-contain filter group-hover:blur-lg transition duration-500 ease-in-out"
                 src={Image} alt=""/>
            {/*<Bounce whileTapCustom={0.5}>*/}
            {/*    <h1 className="relative drop-shadow-4xl font-sonsie group-hover:scale-125 transition duration-200 text-5xl ">{Heading}</h1>*/}
            {/*</Bounce>*/}
            <div
                className="absolute text-xl flex flex-col  p-2 backdrop-blur-xl bg-black/10 rounded-3xl justify-center items-center gap-2  font-oswald h-3/4 w-3/2  ">
                <p>Name: {Details?.name}</p>
                <p>Shape: {Details?.shape}</p>
                <p>Temperature: {Details?.temperature}</p>
                <p>Calories: {Details?.calories}</p>
                <div className={`flex gap-2 rounded-3xl `}>
                    <p>Oil: {Details?.oil}</p>
                    <p>Sugar: {Details?.sugar}</p>
                    <p>Fiber: {Details?.fiber}</p>
                    <p>Soda: {Details?.soda}</p>
                    <p>Nuts: {Details?.nuts}</p>
                </div>
                <p>Cooking Time: {Details?.cookingTime}</p>
                <p>Price: ${Details?.price/10}</p>
            </div>
        </motion.div>
    );
});
export default FoodBannerCard