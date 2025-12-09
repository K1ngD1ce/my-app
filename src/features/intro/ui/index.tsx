"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { finishLoading } from "@/shared/ui/preloader/model/loaderSlice";
import Preloader from "@/shared/ui/preloader/ui/";
import Header from "@/widgets/header/ui";
import Footer from "@/widgets/footer/ui";
import Intro from "@/features/intro/ui";
import Cursor from "@/shared/ui/stikyCursor/ui";
import About from "@/features/about/ui";
import Work from "@/features/work/ui";
import IntermediateBlock from "@/features/intermediateBlock/ui";
import TechStack from "@/features/techStack/ui";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.preloader.isLoading);
  const stickyElement = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Проверка на мобильные устройства
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let locomotiveScroll: any = null;

    (async () => {

      if (isMobile) {
        setTimeout(() => {
          dispatch(finishLoading());
          document.body.style.cursor = "default";
          window.scrollTo(0, 0);
        }, 2000);
        return;
      }


      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScroll = new LocomotiveScroll({
        smooth: true,
        multiplier: 0.8, 
        touchMultiplier: 2, 
        lerp: 0.1, 

        smartphone: {
          smooth: false,
        },
        tablet: {
          smooth: false,
        },
      });

      setTimeout(() => {
        dispatch(finishLoading());
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);

        if (locomotiveScroll) {
          setTimeout(() => {
            locomotiveScroll.update();
          }, 100);
        }
      }, 2000);
    })();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, [dispatch, isMobile]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {!isMobile && <Cursor stickyElement={stickyElement} />}

      <Header ref={stickyElement} />
      <main>
        <Intro />
        <About />
        <IntermediateBlock />
        <Work />
        {/* <TechStack /> */}
      </main>
      <Footer />
    </>
  );
}
