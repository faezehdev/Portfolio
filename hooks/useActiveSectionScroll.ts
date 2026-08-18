import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollWrapperHandle } from "@/components/scroll/ScrollWrapper";
import gsap from "gsap";
import { useDetectSize } from "./shared/useDetectSize";
import { useScrollSpy } from "./shared/useScrollSpy";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
export interface activeOnScrollReturnType {
  scrollWrapperRef: React.RefObject<ScrollWrapperHandle | null>;

  isManualScroll: boolean;

  currentSection: number | null;

  firstSectionRef: React.RefObject<HTMLElement | null>;

  sectionIds: string[];

  activeId: string | null;

  handleMenuClick: (index: number) => void;

  setCurrentSection: Dispatch<SetStateAction<number | null>>;
}

const useActiveSectionScroll = (): activeOnScrollReturnType => {
  const scrollWrapperRef = useRef<ScrollWrapperHandle>(null);

  const firstSectionRef = useRef<HTMLElement | null>(null);

  const [isManualScroll, setIsManualScroll] = useState(false);

  const [currentSection, setCurrentSection] = useState<number | null>(0);

  const sectionIds = ["section-0", "section-1", "section-2", "section-3"];

  const { breakpoint } = useDetectSize();

  const isMobile = breakpoint === "xs" || breakpoint === "sm";

  /*
   * ScrollSpy فقط برای Mobile
   */
  const activeId = useScrollSpy(isMobile ? sectionIds : [], 100);

  /*
   * Mobile:
   * IntersectionObserver
   */
  useEffect(() => {
    if (!isMobile) return;

    if (!activeId) return;

    if (isManualScroll) return;

    const parts = activeId.split("-");

    const sectionIndex = Number(parts[1]);

    if (!Number.isNaN(sectionIndex)) {
      setCurrentSection(sectionIndex);
    }
  }, [activeId, isManualScroll, isMobile]);

  /*
   * Resize
   */
  useEffect(() => {
    const handleResize = () => {
      window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = (index: number) => {
    setIsManualScroll(true);
    setCurrentSection(index);

    // =====================================
    // HOME
    // خارج از ScrollWrapper / GSAP
    // =====================================
    if (index === 0) {
      const firstSection = firstSectionRef.current;

      if (firstSection) {
        const rect = firstSection.getBoundingClientRect();

        const targetY = window.scrollY + rect.top;

        gsap.to(window, {
          scrollTo: {
            y: targetY,
          },
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            setCurrentSection(0);
            ScrollTrigger.refresh();
            setIsManualScroll(false);
          },
        });
      } else {
        // fallback اگر ref هنوز وصل نشده بود
        gsap.to(window, {
          scrollTo: {
            y: 0,
          },
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            setCurrentSection(0);
            ScrollTrigger.refresh();
            setIsManualScroll(false);
          },
        });
      }

      return;
    }

    // =====================================
    // DESKTOP
    // Projects = 1
    // About   = 2
    // Contact = 3
    // =====================================
    if (!isMobile) {
      scrollWrapperRef.current?.scrollToSection(index);

      window.setTimeout(() => {
        setIsManualScroll(false);
      }, 1000);

      return;
    }

    // =====================================
    // MOBILE
    // =====================================
    const target = document.getElementById(`section-${index}`);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    window.setTimeout(() => {
      setIsManualScroll(false);
    }, 1000);
  };
  return {
    scrollWrapperRef,

    isManualScroll,

    currentSection,

    firstSectionRef,

    sectionIds,

    activeId,

    handleMenuClick,

    setCurrentSection,
  };
};

export default useActiveSectionScroll;
