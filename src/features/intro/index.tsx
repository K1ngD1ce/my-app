import cls from "./style.module.scss";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useAppSelector } from "@/app/store/hooks";
export default function Intro() {
  const isLoading = useAppSelector((state) => state.preloader.isLoading);

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);
  return (
    <motion.section style={{ y }} className={cls.intro} ref={container}>
      <div className={`container ${cls.container}`}>
        <div className={`textWrapper ${cls.textWrapper}`}>
          {!isLoading && (
            <h2 className={`sectionTitle ${cls.sectionTitle}`}>
              <AnimatedText
                delay={0.5}
                text="Hi, I'm Maxim Thorshin "
                triggerAnimation={!isLoading}
              />
              <AnimatedText
                text="A Frontend Developer who bridges thoughtful design with clean, functional code."
                delay={1}
                triggerAnimation={!isLoading}
              />
            </h2>
          )}
        </div>
      </div>
      <div className={cls.invitation}>{`{ Scroll down to explore }`}</div>
    </motion.section>
  );
}
