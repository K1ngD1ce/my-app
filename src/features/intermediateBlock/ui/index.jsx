import cls from "./style.module.scss"
import Image from "next/image"
import { useScroll, useTransform, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from "@/app/store/hooks";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import { useRef, useState, useEffect, useCallback } from "react";

export default function IntermediateBlock() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const isLoading = useAppSelector((state) => state.preloader.isLoading);
    const container = useRef(null);
    const intervalRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const words = [
        "curiosity",
        "любопытства",
        "curiosité",
        "curiosità",
        "curiosidade",
        "好奇心",
        "nyfikenhet",
        "Neugier",
        "nieuwsgierigheid"
    ];


    const isAnimating = inView && !isLoading;

    const startAnimation = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setCurrentWordIndex(prev => (prev + 1) % words.length);
        }, 2500);
    }, [words.length]);

    const stopAnimation = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isAnimating) {
            startAnimation();
        } else {
            stopAnimation();
        }

        return () => {
            stopAnimation();
        };
    }, [isAnimating, startAnimation, stopAnimation]);

    return (
        <section ref={container} className={cls.intermediateBlock}>
            <div ref={ref}>
                <h2>
                    <AnimatedText text="Everything starts with" triggerAnimation={isAnimating} />
                    {isAnimating ? (
                        <div>
                            <motion.span
                                className={cls.lastWord}
                                key={currentWordIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    duration: 0.5
                                }}
                            >
                                {words[currentWordIndex]}
                            </motion.span>
                            .
                        </div>
                    ) : (
                        <div>
                            <span className={cls.lastWord}>curiosity</span>.
                        </div>
                    )}
                </h2>
            </div>

            <div style={{ position: "fixed", top: "-10vh", left: "0", height: "120vh", width: "100%" }}>
                <motion.div style={{ y, position: "relative", height: "100%", width: "100%" }}>
                    <Image
                        loading="lazy"
                        width={2560}
                        height={1440}
                        src="/assets/images/background.png"
                        alt="image"
                    />
                </motion.div>
            </div>
        </section>
    );
}