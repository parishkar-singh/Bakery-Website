'use client'

import React from "react";
import {motion} from "framer-motion";
import { useAuth } from "@/Context/AuthContext";
import AccountCard from "@/Components/Cards/AccountCard";
import SignIn from "@/Containers/SignIn";
import SignUp from "@/Containers/SignUp";

const Account: React.FunctionComponent = React.memo(() => {
    const { user, logout } = useAuth();
    return (
        <div className={`flex  items-center w-screen h-screen`}>
            {user ? (
                <>
                    <div className={`flex flex-col w-full h-full`}>
                        <AccountCard Background={`red`} Heading={user.username} />
                        <AccountCard Background={`green`} Heading={user.email} />
                    </div>
                    <motion.div
                        whileTap={{ scale: 2, borderRadius: "100%" }}
                        initial={{scale: 0 ,x:2160}}
                        animate={{scale: 1 ,x:0}}
                        transition={{
                            type: "spring",
                            stiffness: 50,
                            damping: 15,
                            duration: 0.5
                        }}
                        className={`flex justify-center items-center w-full h-full bg-orange-500 font-oswald`}>
                        <button className={`text-8xl`} onClick={logout}>Logout</button>
                    </motion.div>
                </>
            ) : (
                // If user is not logged in, show sign up and sign in buttons
                <>
                    <SignIn/>
                    <SignUp/>
                </>
            )}
        </div>
    )
})
export default Account;