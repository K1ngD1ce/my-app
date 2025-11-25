import cls from "./style.module.scss";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useAppSelector } from "@/app/store/hooks";
import { useGetHeroContentQuery } from "@/app/store/mockApi";

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

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  if (isLoading || !data) {
    return <span>Load..</span>;
  }

  if (error) {
    return console.log(`Error data hero ${error}`);
  }
  return (
    <motion.section style={{ y }} className={cls.intro} ref={container}>
      <div className={`container ${cls.container}`}>
        <div className={`textWrapper ${cls.textWrapper}`}>
          {!isPreLoading && (
            <h2 className={`sectionTitle ${cls.sectionTitle}`}>
              <AnimatedText
                delay={0.5}
                text={data?.greeting}
                triggerAnimation={!isPreLoading}
              />
              <AnimatedText
                text={data?.description}
                delay={1}
                triggerAnimation={!isPreLoading}
              />
            </h2>
          )}
        </div>
      </div>
      <div className={cls.invitation}>{`{ Scroll down to explore }`}</div>
    </motion.section>
  );
}
