"use client";
import cls from "./style.module.scss";
import { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { opacity, slideUp } from "../lib/animate";

const words = [
  "Hello",
  "Привет",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const isMountedRef = useRef(false);

  useEffect(() => {
    const updateDimension = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const rafId = requestAnimationFrame(updateDimension);

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      requestAnimationFrame(updateDimension);
    };

    window.addEventListener("resize", handleResize);
    isMountedRef.current = true; // ← Изменил на useRef

    return () => {
      isMountedRef.current = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 150
    );
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };
  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={cls.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.h2 variants={opacity} initial="initial" animate="enter">
            {words[index]}
          </motion.h2>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
