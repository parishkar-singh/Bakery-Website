import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { LuSunMoon } from "react-icons/lu";
import {toggleTheme} from "@/Redux/Actions.ts";

const DarkModeButton = () => {
    const dispatch = useDispatch();

    const handleThemeSwitch = () => {
        dispatch(toggleTheme());
    };


    return (
        <motion.button
            onClick={handleThemeSwitch}
            className={`dark:bg-neutral-900 rounded-full bg-red-500 hover:text-yellow-500 hover:bg-neutral-800 h-12 w-12 flex justify-center items-center`}
            whileHover={{ scale: 1.17 }}
            whileTap={{ scale: 0.9 }}>
            <LuSunMoon size={26} />
        </motion.button>
    );
};

export default DarkModeButton;
