import { Variants } from "framer-motion";

const initialPath = `M100 0 L100 ${
  window.innerHeight
} Q-100 ${window.innerHeight / 2} 100 0`;
const targetPath = `M100 0 L100 ${
  window.innerHeight
} Q100 ${window.innerHeight / 2} 100 0`;

export const menuSlide: Variants = {
  initial: {
    x: "calc(100% + 100px)",
  },
  enter: {
    x: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slide: Variants = {
  initial: {
    x: "80px",
  },
  enter: (i: number) => ({
    x: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: "80px",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

export const pathAnimation: Variants = {
  initial: {
    d: initialPath,
  },
  enter: {
    d: targetPath,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    d: initialPath,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};
