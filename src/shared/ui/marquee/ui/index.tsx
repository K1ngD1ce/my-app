import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import cls from "./style.module.scss";
import gsap from "gsap";

interface MarqueeProps {
  text: string;
}

export default function Marquee({ text }: MarqueeProps) {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const marquee = useRef(null);

  const animationRef = useRef({
    xPercent: 0,
    direction: -1,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          animationRef.current.direction = self.direction * -1;
        },
      });
    }, marquee);

    const animate = () => {
      const { xPercent, direction } = animationRef.current;

      let newXPercent = xPercent;

      newXPercent += 0.1 * direction;

      if (newXPercent < -100) {
        newXPercent = 0;
      } else if (newXPercent > 0) {
        newXPercent = -100;
      }

      animationRef.current.xPercent = newXPercent;

      if (firstText.current && secondText.current) {
        gsap.set([firstText.current, secondText.current], {
          xPercent: newXPercent,
        });
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={marquee} className={cls.marquee}>
      <p ref={firstText}>{text}<span>—</span></p>
      <p ref={secondText}>{text}<span>—</span></p>
    </div>
  );
}
