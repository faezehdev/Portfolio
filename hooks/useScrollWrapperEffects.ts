import { useEffect, useRef } from "react";

import { Breakpoint } from "@/hooks/shared/useDetectSize";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

interface UseScrollWrapperEffectsProps {
  breakpoint: Breakpoint;
  isMobile: boolean;
  container: React.RefObject<HTMLDivElement | null>;
  content: React.RefObject<HTMLDivElement | null>;
  initializeScroll: () => void;
  killScrollAnimation: () => void;
}

export const useScrollWrapperEffects = ({
  breakpoint,
  isMobile,
  container,
  content,
  initializeScroll,
  killScrollAnimation,
}: UseScrollWrapperEffectsProps) => {
  const initializationTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const refreshTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  /*
   * Initial setup
   */
  useEffect(() => {
    if (isMobile) {
      killScrollAnimation();
      return;
    }

    if (!container.current || !content.current) {
      return;
    }

    initializationTimer.current =
      setTimeout(() => {
        initializeScroll();
      }, 150);

    return () => {
      if (initializationTimer.current) {
        clearTimeout(
          initializationTimer.current,
        );
      }

      killScrollAnimation();
    };
  }, [
    breakpoint,
    isMobile,
    initializeScroll,
    killScrollAnimation,
    container,
    content,
  ]);

  /*
   * Resize
   */
  useEffect(() => {
    if (isMobile) {
      return;
    }

    const handleResize = () => {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }

      refreshTimer.current = setTimeout(() => {
        initializeScroll();
      }, 200);
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );

      if (refreshTimer.current) {
        clearTimeout(
          refreshTimer.current,
        );
      }
    };
  }, [isMobile, initializeScroll]);

  /*
   * Orientation change
   */
  useEffect(() => {
    if (isMobile) {
      return;
    }

    const handleOrientationChange = () => {
      setTimeout(() => {
        initializeScroll();
      }, 300);
    };

    window.addEventListener(
      "orientationchange",
      handleOrientationChange,
    );

    return () => {
      window.removeEventListener(
        "orientationchange",
        handleOrientationChange,
      );
    };
  }, [isMobile, initializeScroll]);

  /*
   * Window load
   */
  useEffect(() => {
    if (isMobile) {
      return;
    }

    const handleLoad = () => {
      setTimeout(() => {
        initializeScroll();
      }, 100);
    };

    window.addEventListener(
      "load",
      handleLoad,
    );

    return () => {
      window.removeEventListener(
        "load",
        handleLoad,
      );
    };
  }, [isMobile, initializeScroll]);
};