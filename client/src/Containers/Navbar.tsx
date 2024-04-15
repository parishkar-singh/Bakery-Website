import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import Bounce from "@/Motion/Bounce.tsx";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "@/Redux/Store.ts";

interface NavbarProps {
    navItems?: string[]
}

interface navMotionProps {
    children: React.ReactNode
}


const Navbar: React.FC<NavbarProps> = React.memo(() => {
    const theme = useSelector((state: RootState) => shallowEqual);
    const [isExpanded, setIsExpanded] = useState(false);
    const buttonClass = `font-sonsie text-xs md:text-xl font-black`

    const handleImageHover = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    }


    return (
        <motion.div className={'overflow-visible  fixed top-0 left-0 w-screen select-none  transition-100 ease-in'}
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10
                    }}
                    whileHover={{scale: 1}}
                    style={{
                        borderRadius: 30,
                        cursor: "grab",
                    }}
                    whileTap={{
                        scale: 1.1,
                        borderRadius: "100%",
                        cursor: "grabbing"
                    }}
                    drag
                    dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                    dragTransition={{bounceStiffness: 600, bounceDamping: 20}}
                    dragElastic={0.7}>
            <motion.div className={`flex  justify-center items-center`}>
                <motion.nav
                    animate={{
                        width: '45%',
                        transition: {
                            type: 'spring',
                            stiffness: 500,
                            damping: 15,
                        },
                    }}
                    whileTap={{width:'60%'}}
                    whileHover={{width: '50%'}}
                    className={` select-none  px-1 md:px-10   flex items-center  text-white  backdrop-blur bg-white/25 h-[70px] mt-4 rounded-full border-none transition duration-200 ease-in justify-between`}>

                    <Bounce>
                        <a draggable={false} className=" text-red-600" href="/builder">
                            <h1 className={buttonClass}>Builder</h1>
                        </a>
                    </Bounce>
                    <Bounce whileTapCustom={0.7}>
                        <a draggable={false} href="/">
                            <h1 className={`p-4 bg-gradient-to-r from-violet-950 via-purple-800 to-violet-950 bg-clip-text text-transparent font-sonsie text-5xl select-none`}>Tasty</h1>
                        </a>
                    </Bounce>
                    <Bounce>
                        <a draggable={false} className={'text-blue-600'} href="/account">
                            <h1 className={buttonClass}>Account</h1>
                        </a>
                    </Bounce>
                </motion.nav>
            </motion.div>
        </motion.div>
    );

});

export default Navbar;