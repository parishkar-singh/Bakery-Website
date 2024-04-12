import { motion } from "framer-motion";
import { MouseEvent } from "react";

interface ButtonProps {
  text: string;
  sidebar?: boolean;
  ButtonClass?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ href, text, sidebar,ButtonClass, onClick }) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    
    if (href) {
      window.location.href = href;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`rounded-3xl ${ButtonClass} ${
        !sidebar
          ? `bg-neutral-300 text-black dark:text-white dark:bg-neutral-900 dark:hover:bg-neutral-800 `
          : "   dark:bg-black dark:hover:bg-neutral-800"
      } h-12 p-2 px-4 `}
      whileHover={{ scale: 1.17 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.button>
  );
};

export default Button;
