import { useCallback, useImperativeHandle, useRef } from "react";

import { Breakpoint } from "@/hooks/shared/useDetectSize";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollWrapperHandle } from "@/components/scroll/ScrollWrapper";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface UseHorizontalScrollProps {
  breakpoint: Breakpoint;
  setCurrentSection?: (section: number) => void;
}

export const useHorizontalScroll = ({
  breakpoint,
  setCurrentSection,
}: UseHorizontalScrollProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  const scrollbar = useRef<HTMLDivElement | null>(null);
  const thumb = useRef<HTMLDivElement | null>(null);

  const scrollTrigger = useRef<ScrollTrigger | null>(null);
  const animation = useRef<gsap.core.Tween | null>(null);

  const scrollStart = useRef(0);
  const scrollEnd = useRef(0);

  const isMobile = breakpoint === "xs" || breakpoint === "sm";

  const getSections = useCallback((): HTMLElement[] => {
    if (!content.current) {
      return [];
    }

    return Array.from(content.current.children) as HTMLElement[];
  }, []);

  const killScrollAnimation = useCallback(() => {
    scrollTrigger.current?.kill();
    animation.current?.kill();

    scrollTrigger.current = null;
    animation.current = null;

    gsap.set(content.current, {
      clearProps: "transform",
    });
  }, []);

  const updateScrollbar = useCallback(() => {
    if (
      !content.current ||
      !container.current ||
      !scrollbar.current ||
      !thumb.current
    ) {
      return;
    }

    const totalWidth = content.current.scrollWidth;
    const viewportWidth = container.current.clientWidth;

    if (totalWidth <= viewportWidth) {
      thumb.current.style.width = "100%";
      thumb.current.style.left = "0px";
      return;
    }

    const scrollbarWidth = scrollbar.current.clientWidth;

    const thumbWidth =
      (viewportWidth / totalWidth) * scrollbarWidth;

    thumb.current.style.width = `${Math.max(
      20,
      thumbWidth,
    )}px`;

    const progress = scrollTrigger.current?.progress ?? 0;

    const maxThumbPosition =
      scrollbarWidth - thumb.current.clientWidth;

    thumb.current.style.left = `${
      progress * maxThumbPosition
    }px`;
  }, []);

  const initializeScroll = useCallback(() => {
    if (isMobile) {
      return;
    }

    if (!container.current || !content.current) {
      return;
    }

    const containerElement = container.current;
    const contentElement = content.current;

    /*
     * Kill old instance
     */
    killScrollAnimation();

    /*
     * Sections
     */
    const sections = getSections();

    if (!sections.length) {
      return;
    }

    /*
     * Real horizontal distance
     */
    const scrollDistance = Math.max(
      0,
      contentElement.scrollWidth -
        containerElement.clientWidth,
    );

    if (scrollDistance <= 0) {
      updateScrollbar();
      return;
    }

    /*
     * Initial scrollbar
     */
    updateScrollbar();

    /*
     * Horizontal animation
     */
    const horizontalAnimation = gsap.to(contentElement, {
      x: -scrollDistance,
      ease: "none",
      duration: 1,
      paused: true,
    });

    animation.current = horizontalAnimation;

    /*
     * ScrollTrigger
     */
    const trigger = ScrollTrigger.create({
      id: "horizontal-scroll",

      animation: horizontalAnimation,

      trigger: containerElement,

      start: "top top",

      end: `+=${scrollDistance}`,

      scrub: 0.3,

      pin: true,

      anticipatePin: 1,

      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const progress = self.progress;

        /*
         * Custom scrollbar
         */
        if (thumb.current && scrollbar.current) {
          const maxThumbPosition =
            scrollbar.current.clientWidth -
            thumb.current.clientWidth;

          thumb.current.style.left = `${
            progress * maxThumbPosition
          }px`;
        }

        /*
         * Active section
         */
        const totalSections = sections.length;

        if (!totalSections || !setCurrentSection) {
          return;
        }

        const horizontalIndex = Math.min(
          totalSections - 1,
          Math.round(
            progress * (totalSections - 1),
          ),
        );

        const sectionIndex = horizontalIndex + 1;

        setCurrentSection(sectionIndex);
      },

      onEnter: () => {
        if (setCurrentSection) {
          setCurrentSection(1);
        }
      },

      onLeave: () => {
        if (setCurrentSection) {
          setCurrentSection(sections.length);
        }
      },

      onLeaveBack: () => {
        if (setCurrentSection) {
          setCurrentSection(0);
        }
      },
    });

    scrollTrigger.current = trigger;

    /*
     * Save exact scroll boundaries
     */
    scrollStart.current = trigger.start;
    scrollEnd.current = trigger.end;

    /*
     * Final refresh
     */
    ScrollTrigger.refresh();

    /*
     * Update after refresh
     */
    updateScrollbar();
  }, [
    getSections,
    isMobile,
    killScrollAnimation,
    setCurrentSection,
    updateScrollbar,
  ]);

  const scrollToHorizontalProgress = useCallback(
    (progress: number) => {
      if (!scrollTrigger.current) {
        return;
      }

      progress = Math.max(
        0,
        Math.min(1, progress),
      );

      const targetY =
        scrollStart.current +
        (scrollEnd.current - scrollStart.current) *
          progress;

      gsap.to(window, {
        scrollTo: {
          y: targetY,
        },

        duration: 0.8,

        ease: "power2.out",
      });
    },
    [],
  );

  const scrollToSection = useCallback(
    (index: number) => {
      if (!scrollTrigger.current) {
        return;
      }

      const sections = getSections();

      if (!sections.length) {
        return;
      }

      /*
       * Home
       */
      if (index === 0) {
        const home =
          document.getElementById("section-0");

        if (home) {
          const rect =
            home.getBoundingClientRect();

          const targetY =
            rect.top + window.scrollY;

          gsap.to(window, {
            scrollTo: {
              y: targetY,
            },

            duration: 0.8,

            ease: "power2.out",
          });
        }

        return;
      }

      const horizontalIndex = index - 1;

      if (
        horizontalIndex < 0 ||
        horizontalIndex >= sections.length
      ) {
        return;
      }

      const progress =
        sections.length === 1
          ? 0
          : horizontalIndex /
            (sections.length - 1);

      const targetY =
        scrollStart.current +
        (scrollEnd.current - scrollStart.current) *
          progress;

      gsap.to(window, {
        scrollTo: {
          y: targetY,
        },

        duration: 0.8,

        ease: "power2.out",
      });
    },
    [getSections],
  );

  const getContainer = useCallback(() => {
    return container.current;
  }, []);

  return {
    container,
    content,
    scrollbar,
    thumb,

    scrollTrigger,
    animation,

    scrollStart,
    scrollEnd,

    isMobile,

    getSections,
    killScrollAnimation,
    updateScrollbar,
    initializeScroll,

    scrollToHorizontalProgress,
    scrollToSection,
    getContainer,
  };
};