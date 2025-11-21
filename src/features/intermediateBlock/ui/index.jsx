import cls from "./style.module.scss"
import Image from "next/image"
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from "@/app/store/hooks";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";

export default function IntermediateBlock() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const isLoading = useAppSelector((state) => state.preloader.isLoading);
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

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
    ]

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (inView && !isLoading) {
            setIsAnimating(true);

            const interval = setInterval(() => {
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }, 2500);

            return () => clearInterval(interval);
        } else {
            setIsAnimating(false);
        }
    }, [inView, isLoading, words.length]);

    return (
        <section ref={container} className={cls.intermediateBlock}>
            <div ref={ref}>
                <h2>
                    <AnimatedText text="Everything starts with" triggerAnimation={!isLoading && inView} />
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
                    <Image loading="lazy" width={2560} height={1440} src="/assets/images/background.png" alt="image" />
                </motion.div>
            </div>
        </section>
    )
}