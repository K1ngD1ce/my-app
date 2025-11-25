"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import cls from "./style.module.scss";
import { useGetWorksQuery } from "@/app/store/mockApi";

export default function Work() {
  const { data, isLoading, error } = useGetWorksQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsWrapperRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const setupAnimation = () => {
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

      const isMobile = window.innerWidth <= 1200;
      const xMovement = isMobile
        ? totalCardsWidth - visibleWidth
        : totalCardsWidth - visibleWidth - cardWidth * 0;

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });

      gsap.to(cardsWrapperRef.current, {
        x: () => -xMovement,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${xMovement}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    };

    setTimeout(setupAnimation, 100);

    const handleResize = () => {
      setTimeout(setupAnimation, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  if (isLoading || !data) {
    return <span>Load...</span>;
  }

  if (error) {
    return console.log(`Error data works ${error}`);
  }

  return (
    <section id="work" className={cls.work} ref={containerRef}>
      <div className={`container ${cls.container}`}>
        <div className={cls.titleWrapper}>
          <h2 className={cls.sectionTitle}>
            <AnimatedText text={data?.title} delay={0.3} />
          </h2>
        </div>

        <div className={cls.cardsWrapper} ref={cardsWrapperRef}>
          {data?.works.map((work) => {
            return (
              <div key={work.id} className={cls.card}>
                <h2>{work.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
