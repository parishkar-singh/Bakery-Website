'use client'

import React from "react";
import {motion} from "framer-motion";

interface BounceProps {
    whileHoverCustom?: number;
    whileTapCustom?: number;
    text?: string;
    height?: number;
    width?: number;
    className?: string;
    motionClassName?: string;
    textSize?: number;
    size?: number;
    children?: React.ReactNode;
}

const Bounce: React.FC<BounceProps> = React.memo(
    ({
         size,
         motionClassName,
         whileTapCustom,
         whileHoverCustom,
         text,
         textSize,
         children,
         width,
         className,
         height,
     }) => {
        return (
            <>
                <motion.div
                    className={className}
                    whileInView={{ x: [-50, 0]}}
                    whileHover={whileHoverCustom ? { scale: whileHoverCustom } : { scale: 1.6 }}
                    whileTap={
                        whileTapCustom
                            ? { scale: whileTapCustom, borderRadius: "100%" }
                            : { scale: 1.4, borderRadius: "100%" }
                    }
                    initial={{ scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {children ? (
                        React.cloneElement(children as React.ReactElement, { text })
                    ) : (
                        <span>{text}</span>
                    )}
                </motion.div>
            </>
        );
    }
);

export default Bounce;
