"use client";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import cls from "./style.module.scss";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from "@/app/store/hooks";
import { useState, useCallback } from "react";
import { useGetAboutContentQuery } from "@/app/store/mockApi";

export interface AboutDataType {
  description: string;
}

export default function About() {
  const { data, isLoading, error } = useGetAboutContentQuery();
  const isPreLoading = useAppSelector((state) => state.preloader.isLoading);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  const handleInView = useCallback(
    (inView: boolean) => {
      if (!isPreLoading && inView && !hasBeenInView) {
        setHasBeenInView(true);
      }
    },
    [isPreLoading, hasBeenInView]
  );

  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: handleInView,
  });

  const pathVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.3,
        },
      },
    },
  };

  const fillVariants: Variants = {
    hidden: {
      fillOpacity: 0,
    },
    visible: {
      fillOpacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  if (isLoading || !data) {
    return <span>Load...</span>;
  }

  if (error) {
    return console.log(`Error data about ${error}`);
  }

  return (
    <section id="about" className={cls.about}>
      <div className={`container ${cls.container}`}>
        {!isPreLoading && (
          <div className={cls.textWrapper} ref={ref}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={cls.iconWrapper}
            >
              <svg viewBox="0 0 640 640">
                <motion.path
                  d="M320 64C337.7 64 352 78.3 352 96L352 264.6L496 181.5C511.3 172.7 530.9 177.9 539.7 193.2C548.5 208.5 543.3 228.1 528 236.9L384 320L528 403.1C543.3 411.9 548.6 431.5 539.7 446.8C530.8 462.1 511.3 467.4 496 458.5L352 375.4L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 375.4L144 458.5C128.7 467.3 109.1 462.1 100.3 446.8C91.5 431.5 96.7 412 112 403.1L256 320L112 236.9C96.7 228 91.5 208.5 100.3 193.1C109.1 177.7 128.7 172.6 144 181.4L288 264.6L288 96C288 78.3 302.3 64 320 64z"
                  fill="var(--orange)"
                  stroke="var(--orange)"
                  strokeWidth="0"
                  variants={fillVariants}
                  initial="hidden"
                  animate={hasBeenInView ? "visible" : "hidden"}
                />
                <motion.path
                  d="M320 64C337.7 64 352 78.3 352 96L352 264.6L496 181.5C511.3 172.7 530.9 177.9 539.7 193.2C548.5 208.5 543.3 228.1 528 236.9L384 320L528 403.1C543.3 411.9 548.6 431.5 539.7 446.8C530.8 462.1 511.3 467.4 496 458.5L352 375.4L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 375.4L144 458.5C128.7 467.3 109.1 462.1 100.3 446.8C91.5 431.5 96.7 412 112 403.1L256 320L112 236.9C96.7 228 91.5 208.5 100.3 193.1C109.1 177.7 128.7 172.6 144 181.4L288 264.6L288 96C288 78.3 302.3 64 320 64z"
                  fill="none"
                  stroke="var(--orange)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={hasBeenInView ? "visible" : "hidden"}
                />
              </svg>
            </motion.div>
            <h2
              className={`sectionTitle ${cls.sectionTitle}`}
              data-scroll-direction="vertical"
            >
              <AnimatedText text={data?.description} delay={0.5} />
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={cls.iconWrapper}
            >
              <svg viewBox="0 0 640 640">
                <motion.path
                  d="M320 64C337.7 64 352 78.3 352 96L352 264.6L496 181.5C511.3 172.7 530.9 177.9 539.7 193.2C548.5 208.5 543.3 228.1 528 236.9L384 320L528 403.1C543.3 411.9 548.6 431.5 539.7 446.8C530.8 462.1 511.3 467.4 496 458.5L352 375.4L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 375.4L144 458.5C128.7 467.3 109.1 462.1 100.3 446.8C91.5 431.5 96.7 412 112 403.1L256 320L112 236.9C96.7 228 91.5 208.5 100.3 193.1C109.1 177.7 128.7 172.6 144 181.4L288 264.6L288 96C288 78.3 302.3 64 320 64z"
                  fill="var(--orange)"
                  stroke="var(--orange)"
                  strokeWidth="0"
                  variants={fillVariants}
                  initial="hidden"
                  animate={hasBeenInView ? "visible" : "hidden"}
                />
                <motion.path
                  d="M320 64C337.7 64 352 78.3 352 96L352 264.6L496 181.5C511.3 172.7 530.9 177.9 539.7 193.2C548.5 208.5 543.3 228.1 528 236.9L384 320L528 403.1C543.3 411.9 548.6 431.5 539.7 446.8C530.8 462.1 511.3 467.4 496 458.5L352 375.4L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 375.4L144 458.5C128.7 467.3 109.1 462.1 100.3 446.8C91.5 431.5 96.7 412 112 403.1L256 320L112 236.9C96.7 228 91.5 208.5 100.3 193.1C109.1 177.7 128.7 172.6 144 181.4L288 264.6L288 96C288 78.3 302.3 64 320 64z"
                  fill="none"
                  stroke="var(--orange)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={hasBeenInView ? "visible" : "hidden"}
                />
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
