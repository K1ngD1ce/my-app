import cls from "./style.module.scss";
import Link from "next/link";
import Logo from "@/shared/icons/Logo.svg";
import { forwardRef, ForwardedRef, useState } from "react";
import Magnetic from "@/shared/ui/magnetic";
import NavBurger from "@/widgets/navBurger/ui";
import { AnimatePresence } from "framer-motion";

const Header = forwardRef(function Index(
  props: object,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <header className={cls.header}>
        <div className={`container ${cls.container} `}>
          <Link  className={cls.logo} href="/">
            <Logo width="110" height="40" />
          </Link>

          <Magnetic className={`magneticBurgerBtn`}>
            <div
              onClick={() => {
                setIsActive((prev) => !prev);
              }}
              className={`${cls.burger} ${isActive ? cls.burgerActive : ""}`}
            >
              <div ref={ref} className={cls.bounds}></div>
            </div>
          </Magnetic>
        </div>
      </header>
      <AnimatePresence mode="wait">{isActive && <NavBurger />}</AnimatePresence>
    </>
  );
});

export default Header;
