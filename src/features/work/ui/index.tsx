"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import cls from "./style.module.scss";

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsWrapperRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      const cards = document.querySelectorAll(`.${cls.card}`);

      if (!cards.length) {
        console.error("Cards not found");
        return;
      }

      const card = cards[0] as HTMLElement;
      const cardWidth = card.offsetWidth;
      const gap = 32;
      const totalCardsWidth = (cardWidth + gap) * cards.length;
      const visibleWidth = cardsWrapperRef.current!.offsetWidth;
      const xMovement = totalCardsWidth - visibleWidth - cardWidth * 0;
      gsap.to(cardsWrapperRef.current, {
        x: () => -xMovement,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${xMovement}`,
          pin: true,
          scrub: 1,
        },
      });
    }, 100);
  }, []);

  return (
    <section id="work" className={cls.work} ref={containerRef}>
      <div className={`container ${cls.container}`}>
        <div className={cls.titleWrapper}>
          <h2 className={cls.sectionTitle}>
            <AnimatedText text="Latest Work" delay={0.3} />
          </h2>
        </div>

        <div className={cls.cardsWrapper} ref={cardsWrapperRef}>
          <div className={cls.card}>
            <h2>Project 1</h2>
          </div>
          <div className={cls.card}>
            <h2>Project 2</h2>
          </div>
          <div className={cls.card}>
            <h2>Project 3</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
