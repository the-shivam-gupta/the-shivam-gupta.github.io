"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/register";
import { initGlobalReveals } from "@/animations/reveal";
import { initParallax } from "@/animations/parallax";
import { initMagnetic } from "@/animations/magnetic";
import {
  isDesktopPointer,
  prefersReducedMotion,
} from "@/animations/reducedMotion";
import { setLenis, getLenis } from "@/lib/lenis-instance";
import { useLoader } from "@/lib/loader-context";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const { ready } = useLoader();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      setLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      anchors: true,
    });

    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      initGlobalReveals(root);
      initParallax(root);
      if (isDesktopPointer()) initMagnetic(root);
    }, root);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [ready]);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (ready) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [ready]);

  return (
    <div ref={scope} id="top">
      {children}
    </div>
  );
}