"use client";
import Link from "next/link";
import { ReactNode, MouseEvent } from "react";

interface SmoothLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  duration?: number;
}

interface LocomotiveScrollInstance {
  scrollTo: (
    target: HTMLElement | number,
    options?: {
      duration?: number;
      offset?: number;
      easing?: number[];
    }
  ) => void;
}

declare global {
  interface Window {
    locomotiveScroll?: LocomotiveScrollInstance;
  }
}

export default function SmoothLink({
  href,
  children,
  className,
  duration = 1.5,
}: SmoothLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      const locomotiveScroll = window.locomotiveScroll;
      const targetId = href.substring(1);

      if (locomotiveScroll) {
        if (targetId === "top" || targetId === "") {
          locomotiveScroll.scrollTo(0, {
            duration,
            easing: [0.0, 0.0, 0.0, 1.0],
          });
        } else {
          const target = document.getElementById(targetId);
          if (target) {
            locomotiveScroll.scrollTo(target, {
              duration,
              offset: -100,
              easing: [0.25, 0.0, 0.35, 1.0],
            });
          }
        }
      } else {
        if (targetId === "top" || targetId === "") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const target = document.getElementById(targetId);
          target?.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
