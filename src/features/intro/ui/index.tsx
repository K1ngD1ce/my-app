import cls from "./style.module.scss";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useAppSelector } from "@/app/store/hooks";
import { useGetHeroContentQuery } from "@/app/store/mockApi";
import SceneIntro from "@/shared/ui/introScene";

export default function Intro() {
  const { data, isLoading, error } = useGetHeroContentQuery();

  const isPreLoading = useAppSelector((state) => state.preloader.isLoading);

  const container = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? container : undefined,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.95]);

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  if (isLoading || !data) {
    return <span>Load..</span>;
  }

  if (error) {
    return console.log(`Error data hero ${error}`);
  }
  return (
    <motion.section
      style={{ y, opacity, scale }}
      className={cls.intro}
      ref={container}
    >
      <div className={`container ${cls.container}`}>
        {!isPreLoading && (
          <motion.div
            style={{
              y: textY,
              opacity: textOpacity,
            }}
            className={`textWrapper ${cls.textWrapper}`}
          >
            <span className={cls.smallTitle}>
              <AnimatedText
                delay={0.5}
                text={data?.smallTitle}
                triggerAnimation={!isPreLoading}
              />
            </span>

            <h2 className={`sectionTitle ${cls.sectionTitle}`}>
              <AnimatedText
                delay={1}
                text={data?.greeting}
                triggerAnimation={!isPreLoading}
              />
            </h2>
            <h3 className={cls.description}>
              <AnimatedText
                text={data?.description}
                delay={1.5}
                triggerAnimation={!isPreLoading}
              />
            </h3>
          </motion.div>
        )}
        <div className={cls.sceneWrapper}>
          <SceneIntro />
        </div>
      </div>
      <motion.div
        className={cls.invitation}
        style={{
          y: textY,
          opacity: textOpacity,
        }}
      >
        {`{ Scroll down to explore }`}
      </motion.div>
    </motion.section>
  );
}
