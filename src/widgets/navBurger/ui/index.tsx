"use client";
import cls from "./style.module.scss";
import LinkItem from "./link/index";
import Curve from "./curve";
import { motion } from "framer-motion";
import { menuSlide } from "../lib/animate";
import Magnetic from "@/shared/ui/magnetic/index";

export default function NavBurger() {
  const navItems = [
    {
      title: "Home",
      href: "#top",
    },
    {
      title: "About",
      href: "#about",
    },
    {
      title: "Work",
      href: "#work",
    },
    {
      title: "Contacts",
      href: "#contacts",
    },
  ];

  const socialItemsNet = [
    {
      title: "Mail",
      href: "mailto:mthor@vk.com",
    },
    {
      title: "Telegram",
      href: "https://t.me/MTh0rrr",
    },
    {
      title: "Instagram",
      href: "",
    },
  ];

  return (
    <motion.div
      variants={menuSlide}
      animate="enter"
      exit="exit"
      initial="initial"
      className={cls.menu}
      
    >
      <div className={cls.body} data-cursor="inverse">
        <div className={cls.nav}>
          {navItems.map((item, index) => {
            return (
              <Magnetic key={index}>
                <LinkItem data={{ ...item, index }} />
              </Magnetic>
            );
          })}
        </div>
        <div className={cls.footer}>
          <ul className={`list__reset`}>
            {socialItemsNet.map((item, index) => {
              return (
                <li key={`${item.title}-${index}`}>
                  <a href={item.href} target="_blank">{item.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}
