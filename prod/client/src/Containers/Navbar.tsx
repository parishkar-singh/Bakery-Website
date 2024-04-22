'use client'

import React from 'react';
import {motion} from "framer-motion";
import Bounce from "@/Motion/Bounce"

const Navbar: React.FunctionComponent = React.memo(() => {
    const buttonClass = `font-sonsie text-xs md:text-2xl font-black`
    return (
        <motion.nav className={'select-none overflow-visible fixed top-0 left-0 w-screen transition-100 ease-in'}
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    whileTap={{
                        scale: 1.1,
                        borderRadius: "100%",
                        cursor: "grabbing"
                    }}
                    whileHover={{scale: 1}}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10
                    }}
                    style={{
                        borderRadius: 30,
                        cursor: "grab",
                    }}
                    drag
                    dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                    dragTransition={{bounceStiffness: 600, bounceDamping: 20}}
                    dragElastic={0.7}>
            <motion.div className={`flex  justify-center items-center`}>
                <motion.div
                    animate={{
                        width: '45%',
                        transition: {
                            type: 'spring',
                            stiffness: 500,
                            damping: 15,
                        },
                    }}
                    whileTap={{width: '60%'}}
                    whileHover={{width: '50%'}}
                    className={` select-none  px-1 md:px-10   flex items-center  text-white  backdrop-blur bg-white/25 h-[70px] mt-4 rounded-full border-none transition duration-200 ease-in justify-between`}>

                    <Bounce>
                        <a draggable={false} className=" text-red-600" href="/prod/client/src/app/builder/page">
                            <h1 className={buttonClass}>Page</h1>
                        </a>
                    </Bounce>
                    <Bounce whileTapCustom={0.7}>
                        <a draggable={false} href="/">
                            <h1 className={`p-4 bg-gradient-to-r from-violet-950 via-purple-800 to-violet-950 bg-clip-text text-transparent font-sonsie text-5xl select-none`}>Biskits</h1>
                        </a>
                    </Bounce>
                    <Bounce>
                        <a draggable={false} className={'text-blue-600'} href="/account">
                            <h1 className={buttonClass}>Account</h1>
                        </a>
                    </Bounce>
                </motion.div>
            </motion.div>
        </motion.nav>
    );

});

export default Navbar;