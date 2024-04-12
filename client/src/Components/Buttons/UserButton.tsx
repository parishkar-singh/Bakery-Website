import { motion } from "framer-motion";
import { MouseEvent } from "react";

interface UserButtonProps {
  text: string;
  sidebar?: boolean;
  ButtonClass?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Add onClick handler
}

const UserButton: React.FC<UserButtonProps> = ({ href, text, sidebar, ButtonClass, onClick }) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (href) {
      console.log('href auth Routes is called')
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
          ? `bg-neutral-900 hover:bg-neutral-800`
          : "  bg-black hover:bg-neutral-800"
      } h-12 p-2 px-4 `}
      whileHover={{ scale: 1.17 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.button>
  );
};

export default UserButton;
