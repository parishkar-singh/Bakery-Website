import React from 'react';
import Bounce from "@/Motion/Bounce.tsx";
import { motion } from 'framer-motion';

interface BannerCardProps {
    Background: string;
    Image: string;
    Heading: string;
}

const BannerCard: React.FunctionComponent<BannerCardProps> = React.memo(({ Background, Image, Heading }) => {
    const colorClassMap: { [key: string]: string } = {
        red: 'bg-red-600',
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        yellow: 'bg-yellow-500',
        orange: 'bg-orange-500'
    };

    const backgroundClass = colorClassMap[Background] || 'bg-gray-500';

    return (
        <motion.div
            whileTap={{ scale: 2, borderRadius: "100%" }}
            initial={{scale: 0 ,y:3840}}
            animate={{scale: 1 ,y:0}}

            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.5
            }}
            className={`relative flex justify-center items-center select-none ${backgroundClass} w-full h-full group`}
        >
            <img draggable="false" className="absolute  group-hover:scale-125 w-full h-full object-contain filter group-hover:blur-lg transition duration-500 ease-in-out" src={Image} alt="" />
            <Bounce whileTapCustom={0.5}>
                <h1 className="relative font-sonsie group-hover:scale-125 transition duration-200 text-5xl ">{Heading}</h1>
            </Bounce>
        </motion.div>
    );
});

export default BannerCard;
