import SmoothLink from "@/shared/ui/smoothLink";
import cls from "./style.module.scss";
import { motion } from "framer-motion";
import { slide } from "../../lib/animate";

interface LinkItemProps {
  data: DataProp;
  onClick?: () => void;
}

interface DataProp {
  title: string;
  href: string;
  index: number;
}

export default function LinkItem({ data, onClick }: LinkItemProps) {
  const handleClick = () => {

    onClick?.();
  };
  return (
    <motion.div
      custom={data.index}
      variants={slide}
      animate="enter"
      exit="exit"
      initial="initial"
      className={cls.link}
      onClick={handleClick}
    >
      <SmoothLink href={data.href}>{data.title}</SmoothLink>
    </motion.div>
  );
}
