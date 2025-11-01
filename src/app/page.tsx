"use client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { finishLoading } from "@/shared/ui/preloader/model/loaderSlice";

import Preloader from "@/shared/ui/preloader/ui/";
import Header from "@/widgets/header/ui";
import Footer from "@/widgets/footer/ui";
import Intro from "@/features/intro";
import Cursor from "@/shared/ui/stikyCursor/ui";
import About from "@/features/about/ui";
import Work from "@/features/work/ui";

export default function Home() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.preloader.isLoading);
  const stickyElement = useRef(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        dispatch(finishLoading());
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);

        setTimeout(() => {
          locomotiveScroll.current?.update();
        }, 100);
      }, 2000);
    })();
  }, [dispatch]);

  return (
    <main data-scroll-container>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Cursor stickyElement={stickyElement} />
      <Header ref={stickyElement} />
      <Intro />
      <About />
      <Work />
      <Footer />
    </main>
  );
}
