"use client";

import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useDetectSize } from "@/hooks/shared/useDetectSize";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useScrollDrag } from "@/hooks/useScrollDrag";
import { useScrollWrapperEffects } from "@/hooks/useScrollWrapperEffects";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export interface ScrollWrapperHandle {
  scrollToHorizontalProgress: (progress: number) => void;
  scrollToSection: (index: number) => void;
  getContainer: () => HTMLDivElement | null;
}

interface ScrollWrapperProps {
  children: ReactNode;
  scrollToId?: string;
  currentSection?: number | null;
  setCurrentSection?: (section: number) => void;
  firstSectionRef: React.RefObject<HTMLElement | null>;
  isRtl?: boolean;
}

const ScrollWrapper = forwardRef<ScrollWrapperHandle, ScrollWrapperProps>(
  ({ children, scrollToId, setCurrentSection, isRtl = false }, ref) => {
    const { breakpoint, mounted } = useDetectSize();

    const horizontalScroll = useHorizontalScroll({
      breakpoint,
      setCurrentSection,
      isRtl,
    });

    const {
      container,
      content,
      scrollbar,
      thumb,
      scrollTrigger,
      scrollStart,
      scrollEnd,
      isMobile,
      killScrollAnimation,
      initializeScroll,
      scrollToHorizontalProgress,
      scrollToSection,
      getContainer,
    } = horizontalScroll;

   const { isDragging, onDragStart } = useScrollDrag({
  scrollbar,
  thumb,
  scrollStart,
  scrollEnd,
  scrollTrigger,
  isRtl,
});
    useScrollWrapperEffects({
      breakpoint,
      isMobile,
      container,
      content,
      initializeScroll,
      killScrollAnimation,
    });

    const scrollVerticallyToSection = useCallback(() => {
      if (!container.current) {
        return;
      }

      const rect = container.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const targetY = rect.top + scrollY;

      gsap.to(window, {
        scrollTo: {
          y: targetY,
        },
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    }, [container]);

    useEffect(() => {
      if (!mounted || !scrollToId) {
        return;
      }

      scrollVerticallyToSection();
    }, [mounted, scrollToId, scrollVerticallyToSection]);
useEffect(() => {
  if (!mounted || isMobile) return;

  killScrollAnimation();

  const rafId = window.requestAnimationFrame(() => {
    initializeScroll();
    ScrollTrigger.refresh();
  });

  return () => {
    window.cancelAnimationFrame(rafId);
  };
}, [isRtl, mounted, isMobile, initializeScroll, killScrollAnimation]);
    useImperativeHandle(
      ref,
      () => ({
        scrollToHorizontalProgress,
        scrollToSection,
        getContainer,
      }),
      [scrollToHorizontalProgress, scrollToSection, getContainer],
    );

    return (
      <div
        ref={container}
        id="scroll-wrapper"
        className="
          relative
          w-full
          md:h-dvh
          sm:h-auto
          overflow-hidden
          flex
          flex-col
        "
      >
        <div
          ref={content}
          dir={isRtl?"rtl": "ltr"}
          className="
            flex
            flex-col
            md:flex-row
            md:h-full
            md:w-fit
            w-full
            gap-10
            md:gap-0
            overflow-hidden
          "
        >
          {children}
        </div>

        {mounted && !isMobile && (
          <div
            ref={scrollbar}
            className="
              fixed
              z-[9999]
              bottom-5
              left-1/2
              h-[3px]
              w-[80%]
              -translate-x-1/2
              rounded
              bg-gray-300
            "
            style={{
              userSelect: isDragging ? "none" : "auto",
            }}
          >
            <div
              ref={thumb}
              className="
                absolute
                top-0
                left-0
                h-full
                cursor-pointer
                rounded
                bg-primary
              "
              onMouseDown={onDragStart}
            />
          </div>
        )}
      </div>
    );
  },
);

ScrollWrapper.displayName = "ScrollWrapper";

export default ScrollWrapper;