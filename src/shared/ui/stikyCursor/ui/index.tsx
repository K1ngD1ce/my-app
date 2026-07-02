import cls from "./style.module.scss";

import type { SpringOptions, TransformProperties } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  transform,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface CursorProps {
  stickyElement: React.RefObject<HTMLDivElement | null>;
}

interface Point {
  x: number;
  y: number;
}


export default function Cursor({ stickyElement }: CursorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isInterectiveLink, setIsInterectiveLink] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isInverse, setIsInverse] = useState(false);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorInner = useRef<HTMLDivElement | null>(null);
  const cursorSize = isInterectiveLink
    ? 80
    : isHovered
    ? 60
    : isLinkHovered
    ? 30
    : 10;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  //Smooth out the mouse values
  const smoothOptions: SpringOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  
  const rotate = (distance: Point) => {
    if (!cursor.current) return;
    const angle = Math.atan2(distance.y, distance.x);
    animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });

    if (cursorInner.current) {
      animate(cursorInner.current, { rotate: `-${angle}rad` }, { duration: 0 });
    }
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    const isOutside =
      clientX <= 0 ||
      clientY <= 0 ||
      clientX >= window.innerWidth ||
      clientY >= window.innerHeight;

    setIsHidden(isOutside);

    const element = e.target as HTMLElement | null;
    const cursorAttr = element
      ?.closest("[data-cursor]")
      ?.getAttribute("data-cursor");
    setIsInverse(cursorAttr === "inverse");
    setIsInterectiveLink(cursorAttr === "interactive");
    const isLink = element?.closest('a, button, [role="button"]');
    setIsLinkHovered(!!isLink);

    if (!stickyElement.current) {
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
      return;
    }

    const {
      left,
      top,
      height,
      width,
    } = stickyElement.current.getBoundingClientRect();

    //center position of the stickyElement
    const center = { x: left + width / 2, y: top + height / 2 };

    if (isHovered) {
      const distance = { x: clientX - center.x, y: clientY - center.y };

      //rotate
      rotate(distance);

      //stretch based on the distance
      const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
      const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3]);
      const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);
      scale.x.set(newScaleX);
      scale.y.set(newScaleY);

      mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
      mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
    } else {
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);

      scale.x.set(1);
      scale.y.set(1);
    }
  };

  const manageMouseOver = () => {
    setIsHovered(true);
  };

  const manageMouseLeave = () => {
    setIsHovered(false);
    if (cursor.current) {
      animate(
        cursor.current,
        { scaleX: 1, scaleY: 1 },
        {
          type: "spring",
          duration: 0.1,
        }
      );
    }

    if (cursorInner.current) {
      animate(cursorInner.current, { rotate: `0deg` }, { duration: 0.1 });
    }
  };

  const handleLinkMouseEnter = () => {
    setIsLinkHovered(true);
  };

  const handleLinkMouseLeave = () => {
    setIsLinkHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHidden(false);
  };

  const handleMouseLeave = () => {
    setIsHidden(true);
  };

  useEffect(() => {
    const links = document.querySelectorAll('a, button, [role="button"]');

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkMouseEnter);
      link.addEventListener("mouseleave", handleLinkMouseLeave);
    });

    const stickyElementCurrent = stickyElement.current;

    if (stickyElementCurrent) {
      stickyElementCurrent.addEventListener("mouseenter", manageMouseOver);
      stickyElementCurrent.addEventListener("mouseleave", manageMouseLeave);
    }

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkMouseEnter);
        link.removeEventListener("mouseleave", handleLinkMouseLeave);
      });

      if (stickyElementCurrent) {
        stickyElementCurrent.removeEventListener(
          "mouseenter",
          manageMouseOver,
        );
        stickyElementCurrent.removeEventListener(
          "mouseleave",
          manageMouseLeave,
        );
      }
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [isHovered, isLinkHovered]);

  const template = (transform: TransformProperties) => {
  const { rotate, scaleX, scaleY } = transform;

  return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
};
  const cursorClasses = [
    cls.cursor,
    isHidden && cls.hidden,
    isLinkHovered && cls.pointer,
    isInterectiveLink && cls.interactive,
    isInverse && cls.inverse,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      transformTemplate={template}
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scaleX: scale.x,
        scaleY: scale.y,
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
      className={cursorClasses}
      ref={cursor}
    >
      <div ref={cursorInner} className={cls.cursorInner}>
        {isInterectiveLink && <span className={cls.text}>Visit</span>}
      </div>
    </motion.div>
  );
}
