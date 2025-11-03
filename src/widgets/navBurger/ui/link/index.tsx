import SmoothLink from "@/shared/ui/smoothLink";
import cls from "./style.module.scss";
import { motion } from "framer-motion";
import { slide } from "../../lib/animate";

interface LinkItemProps {
  data: DataProp;
}

interface DataProp {
  title: string;
  href: string;
  index: number;
}

export default function LinkItem({ data }: LinkItemProps) {
  return (
    <motion.div
      custom={data.index}
      variants={slide}
      animate="enter"
      exit="exit"
      initial="initial"
      className={cls.link}
    >
      <SmoothLink href={data.href}>{data.title}</SmoothLink>
    </motion.div>
  );
}
