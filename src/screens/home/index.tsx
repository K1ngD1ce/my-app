"use client";

import Work from "@/features/work/ui";
import Intro from "@/features/intro/ui";
import About from "@/features/about/ui";
import Header from "@/widgets/header/ui";
import Cursor from "@/shared/ui/stikyCursor/ui";
import Footer from "@/widgets/footer/ui";
import Preloader from "@/shared/ui/preloader/ui/";
import IntermediateBlock from "@/features/intermediateBlock/ui";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { finishLoading } from "@/shared/ui/preloader/model/loaderSlice";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.preloader.isLoading);
  const stickyElement = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    (async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 0,
        wheelMultiplier: 1,
      });

      lenis.on("scroll", () => ScrollTrigger.update());

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      setTimeout(() => {
        dispatch(finishLoading());
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 300);
      }, 2000);

      return () => {
        lenis.destroy();
        gsap.ticker.remove((time) => lenis.raf(time * 1000));
      };
    })();
  }, [dispatch]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Cursor stickyElement={stickyElement} />
      <Header ref={stickyElement} />
      <main>
        <Intro />
        <About />
        <IntermediateBlock />
        <Work />
      </main>
      <Footer />
    </>
  );
}
