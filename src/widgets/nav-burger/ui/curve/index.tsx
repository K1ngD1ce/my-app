import cls from "./style.module.scss";
import { motion } from "framer-motion";
import { pathAnimation } from "../../lib/animate";

const Curve = () => {
  return (
    <svg className={cls.svgCurve}>
      <motion.path
        variants={pathAnimation}
        initial="initial"
        animate="enter"
        exit="exit"
      ></motion.path>
    </svg>
  );
};

export default Curve;
