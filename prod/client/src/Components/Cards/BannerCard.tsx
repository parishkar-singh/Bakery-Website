'use client'
import React from 'react';
import Bounce from "@/Motion/Bounce";
import {motion} from 'framer-motion';
import {ColorClassMap} from "@/Utils/Constants";

interface BannerCardProps {
    Background: string;
    Image: string;
    Heading: string;
}
const BannerCard: React.FunctionComponent<BannerCardProps> = React.memo(({ Background, Image, Heading }) => {
    const BannerBackgroundClass:string = ColorClassMap[Background] || 'bg-gray-500';
    return (
        <motion.div
            whileTap={{ scale: 2, borderRadius: "100%" }}
            initial={{scale: 0 ,y:2160}}
            animate={{scale: 1 ,y:0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.5
            }}
            className={`relative flex justify-center items-center select-none ${BannerBackgroundClass} w-full h-full group`}
        >
            <img draggable="false" className="absolute  group-hover:scale-125 w-full h-full object-contain filter group-hover:blur-lg transition duration-500 ease-in-out" src={Image} alt="" />
            <Bounce whileTapCustom={0.5}>
                <h1 className="relative drop-shadow-4xl font-sonsie group-hover:scale-125 transition duration-200 text-5xl ">{Heading}</h1>
            </Bounce>
        </motion.div>
    );
});

export default BannerCard;
