"use client";
import cls from "./style.module.scss";
import gsap from "gsap";
import WorkCard from "@/entities/work-block-card/ui";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGetWorksQuery } from "@/app/store/mockApi";
import { useEffect, useRef, useCallback } from "react";

export default function Work() {
  const { data, isLoading, error } = useGetWorksQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setupAnimation = useCallback(() => {
    if (!containerRef.current || !cardsWrapperRef.current) return;

    scrollTriggerRef.current?.kill();
    gsap.killTweensOf(cardsWrapperRef.current);
    gsap.set(cardsWrapperRef.current, { clearProps: "x" });

    const isMobile = window.innerWidth <= 768;

    if (isMobile) return;

    const wrapper = cardsWrapperRef.current;
    const cards = wrapper.children;
    if (!cards.length) return;

    const cardWidth = (cards[0] as HTMLElement).offsetWidth;
    const gap = 50;
    const totalCardsWidth = (cardWidth + gap) * cards.length - gap;
    const visibleWidth = wrapper.offsetWidth;
    const xMovement = Math.max(0, totalCardsWidth - visibleWidth);

    if (xMovement === 0) return;

    const tween = gsap.to(wrapper, {
      x: -xMovement,
      ease: "none",
    });

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${xMovement}`,
      pin: true,
      scrub: 1,
      animation: tween,
      invalidateOnRefresh: true,
    });
  }, []);

  useEffect(() => {
    if (!data) return;

    gsap.registerPlugin(ScrollTrigger);

    const initTimer = setTimeout(setupAnimation, 150);

    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(setupAnimation, 200);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(initTimer);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      window.removeEventListener("resize", handleResize);
      scrollTriggerRef.current?.kill();
      if (cardsWrapperRef.current) {
        gsap.killTweensOf(cardsWrapperRef.current);
      }
    };
  }, [data, setupAnimation]);

  if (isLoading || !data) return <span>Load...</span>;
  if (error) return null;

  return (
    <section id="work" className={cls.work} ref={containerRef}>
      <div className={`container ${cls.container}`}>
        <h2 className={cls.sectionTitle}>
          <AnimatedText text={data?.title} delay={0.3} />
        </h2>

        <div className={cls.cardsWrapper} ref={cardsWrapperRef}>
          {data?.works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
