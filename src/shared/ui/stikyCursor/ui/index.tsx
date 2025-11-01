import { useEffect, useRef, useState } from "react";
import cls from "./style.module.scss";
import {
  motion,
  transform,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface CursorProps {
  stickyElement: React.RefObject<HTMLElement>;
}

export default function Cursor({ stickyElement }: CursorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const cursor = useRef(null);
  const cursorSize = isHovered ? 60 : isLinkHovered ? 30 : 10;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  //Smooth out the mouse values
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const rotate = (distance) => {
    const angle = Math.atan2(distance.y, distance.x);
    animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });
  };

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

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

  const manageMouseOver = (e) => {
    setIsHovered(true);
  };

  const manageMouseLeave = (e) => {
    setIsHovered(false);
    animate(
      cursor.current,
      { scaleX: 1, scaleY: 1 },
      { duration: 0.1 },
      { type: "spring" }
    );
  };

  const handleLinkMouseEnter = () => {
    setIsLinkHovered(true);
  };

  const handleLinkMouseLeave = () => {
    setIsLinkHovered(false);
  };

  useEffect(() => {
    const links = document.querySelectorAll('a, button, [role="button"]');

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkMouseEnter);
      link.addEventListener("mouseleave", handleLinkMouseLeave);
    });

    if (stickyElement.current) {
      stickyElement.current.addEventListener("mouseenter", manageMouseOver);
      stickyElement.current.addEventListener("mouseleave", manageMouseLeave);
    }

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkMouseEnter);
        link.removeEventListener("mouseleave", handleLinkMouseLeave);
      });

      if (stickyElement.current) {
        stickyElement.current.removeEventListener(
          "mouseenter",
          manageMouseOver
        );
        stickyElement.current.removeEventListener(
          "mouseleave",
          manageMouseLeave
        );
      }

      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [isHovered, isLinkHovered]);

  const template = ({ rotate, scaleX, scaleY }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

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
      className={cls.cursor}
      ref={cursor}
    ></motion.div>
  );
}
