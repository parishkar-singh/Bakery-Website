import React from 'react';
import Bounce from "@/Motion/Bounce.tsx";
import { motion } from 'framer-motion';
import {ColorClassMap} from "@/Utils/Constants.ts";

interface BannerCardProps {
    Background: string;
    // Image: string;
    Heading: string;
}
const AccountCard: React.FunctionComponent<BannerCardProps> = React.memo(({ Background, Heading }) => {
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
            <Bounce whileTapCustom={0.5}>
                <h1 className="relative drop-shadow-4xl font-oswald italic group-hover:scale-125 transition duration-200 text-7xl ">{Heading}</h1>
            </Bounce>
        </motion.div>
    );
});

export default AccountCard;
