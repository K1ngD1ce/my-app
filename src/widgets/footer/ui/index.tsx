import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import cls from "./style.module.scss";
import AnimatedText from "@/shared/ui/animatedText/AnimatedText";
import Magnetic from "@/shared/ui/magnetic";
import SmoothLink from "@/shared/ui/smoothLink";
import Marquee from "@/shared/ui/marquee/ui";
export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("mthor@vk.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const manageMouseEnter = () => {
    setIsHovered(true);
  };

  const manageMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <footer className={cls.footer} id="contacts">
      <div className={`container`}>
        <div className={cls.footerTop}>
          <h2 className="sectionTitle">
            <AnimatedText text="Work with me" />
          </h2>
          <button
            className={cls.mail}
            onMouseEnter={manageMouseEnter}
            onMouseLeave={manageMouseLeave}
            onClick={handleCopy}
          >
            <span>mthor@vk.com</span>
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className={cls.clickToCopy}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 15, duration: 0.3 }}
                >
                  {copied ? "Copied!" : "Click to copy"}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
      <Marquee text="Thanks for watching"/>
      <div className="container">
        <div className={cls.footerBottom}>
          <span>All rights reserved &copy; MThor </span>
          <Magnetic>
            <SmoothLink href="#top">↑ Back to top</SmoothLink>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
