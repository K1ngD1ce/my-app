import Link from "next/link";
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
      <Link href={data.href}>{data.title}</Link>
    </motion.div>
  );
}
