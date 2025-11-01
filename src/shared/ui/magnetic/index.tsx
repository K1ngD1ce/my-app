import { ReactElement, useRef, useState } from "react";
import { motion } from "framer-motion";
import cls from "@/widgets/header/ui/style.module.scss";
interface MagneticProps {
  children: ReactElement;
  className?: string;
}

export default function Magnetic({ children, className }: MagneticProps) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const moduleClass = className && cls[className as keyof typeof cls];

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      className={moduleClass || ""}
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
