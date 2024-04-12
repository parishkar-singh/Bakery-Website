import { motion } from "framer-motion";
import React, { useCallback, useMemo } from "react";

interface AuthButtonProps {
  text: string;
  sidebar?: boolean;
  ButtonClass?: string;
  href?: string;
}

const AuthButton: React.FC<AuthButtonProps> = React.memo(({ href, text, ButtonClass }) => {
  const handleClick = useCallback(() => {
    if (href) {
      window.location.href = href;
    }
  }, [href]);

  const buttonClassname = useMemo(() => `rounded-3xl ${ButtonClass} bg-green-600 transition duration-100 hover:bg-yellow-600 h-12 p-2 px-6 font-semibold`, [ButtonClass]);

  return (
      <motion.button
          onClick={handleClick}
          className={buttonClassname}
          whileHover={{ scale: 1.17 }}
          whileTap={{ scale: 0.9 }}
      >
        {text}
      </motion.button>
  );
});

export default AuthButton;
