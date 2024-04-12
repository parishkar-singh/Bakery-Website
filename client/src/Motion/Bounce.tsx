import {motion} from "framer-motion";
import React from "react";

interface BounceProps {
    whileHoverCustom?: number,
    whileTapCustom?: number,
    text?: string
    height?: number
    width?: number
    className?: string
    motionClassName?: string
    textSize?: number
    size?: number
    children?: React.ReactNode
}

const Bounce: React.FC<BounceProps> = ({size, motionClassName, whileTapCustom,whileHoverCustom,text, textSize, children, width, className, height}) => {
    return (
        <div>
            <motion.div
                className={className}
    // whileInView={{x: [-100, 0], opacity: [0, 1]}}
    whileHover={ whileHoverCustom?{scale:whileHoverCustom}:{ scale: 1.6}}
    whileTap={whileTapCustom?{scale:whileTapCustom,borderRadius: "100%"}:{scale: 1.4,borderRadius: "100%"}}
    initial={{scale: 0}}
    animate={{rotate: 0, scale: 1}}
    transition={{
        type: "spring",
            stiffness: 260,
            damping: 20
    }}
>
    {children ? (
        React.cloneElement(children as React.ReactElement, {text})
    ) : (
        <span>{text}</span>
    )}
    </motion.div>
    </div>
);
}
export default Bounce;