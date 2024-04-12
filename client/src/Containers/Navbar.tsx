import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";

import {BsGithub, BsInstagram, BsLinkedin} from "react-icons/bs";
import {BiCollapseAlt, BiCookie} from "react-icons/bi";
import {IoShareSocialSharp} from "react-icons/io5";
import Bounce from "@/Motion/Bounce.tsx";

interface NavbarProps {
    navItems?: string[]
}

interface navMotionProps {
    children: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({navItems}) => {
    const spanClassName = 'w-14 h-14  text-xl rounded-full inline-flex  items-center justify-center transition duration-250 ease-in'
    const [isExpanded, setIsExpanded] = useState(false);

    const handleThemeSwitch = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        // setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    const handleImageHover = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const containerVariants = {
        expanded: {
            width: '75%',
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 15,
            },
        },
        collapsed: {
            width: '45%',
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 15,
            },
        },
    };
    return (
        <motion.div className={'overflow-visible select-none  sticky top-0 z-50 transition-100 ease-in'}
                    initial={{scale: 0}}
                    animate={{scale: .9}}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    whileHover={{scale: 1}}
                    style={{
                        borderRadius: 30,
                        cursor: "grab",
                    }}
                    whileTap={{
                        scale: 1.2,
                        borderRadius: "100%",
                        cursor: "grabbing"
                    }}
                    drag
                    dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                    dragTransition={{bounceStiffness: 600, bounceDamping: 20}}
                    dragElastic={0.7}>
            <motion.div className={`flex justify-center items-center`}>
                <motion.nav
                    variants={containerVariants}
                    animate={isExpanded ? 'expanded' : 'collapsed'}
                    whileHover={
                        isExpanded ? {width: '70%',} : {width: '50%'}}
                    className={`select-none z-99999999 flex items-center  text-white  backdrop-blur bg-white/10 dark:bg-neutral-950/10 h-[60px] mt-4 rounded-full border-none transition duration-200 ease-in justify-between`}>
                    <Bounce>
                        <h1 className={`text-black font-sonsie text-xl font-black`}>Order</h1>
                    </Bounce>
                    <Bounce>
                        <h1 className={`text-black font-sonsie text-xl font-black`}>Builder</h1>
                    </Bounce>
                    <Bounce>
                        <h1 className={`text-black font-sonsie text-xl font-black`}>Coffee</h1>
                    </Bounce>
                    <Bounce>
                        <h1 className={`text-black font-sonsie text-xl font-black`}>Seasonal</h1>
                    </Bounce>
                    
                </motion.nav>
            </motion.div>
        </motion.div>
    );
};

export default Navbar;