"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import cls from "./style.module.scss";
import { useGetWorksQuery } from "@/app/store/mockApi";
import Link from "next/link";
import Image from "next/image";

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
            <Link
              href={work.href}
              key={work.id}
              className={cls.card}
              data-cursor="interactive"
              target="_blank"
              onMouseEnter={(e) => {
                document.dispatchEvent(
                  new MouseEvent("mousemove", {
                    clientX: e.clientX,
                    clientY: e.clientY,
                  }),
                );
              }}
            >
              <div className={cls.imgWrapper}>
                {work.img ? (
                  <Image
                    src={work.img}
                    alt={work.name}
                    width={2560}
                    height={1440}
                    priority={work.id <= 2}
                    loading={work.id <= 2 ? "eager" : "lazy"}
                  />
                ) : (
                  <div className={cls.inDeveloping}>
                    <h2>Project0{work.id}</h2>
                  </div>
                )}
                {work.background_card && (
                  <Image
                    className={cls.backgroundCard}
                    src={work.background_card}
                    alt={`background-${work.name}`}
                    width={2560}
                    height={1440}
                    loading="lazy"
                  />
                )}
              </div>
              <div className={cls.textWrapper}>
                {work.description && <span>{work.description}</span>}
                <span className={cls.name}>( {work.name} )</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
