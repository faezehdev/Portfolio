import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const isManualScrollRef = useRef(false);

  const [currentSection, setCurrentSection] = useState<number | null>(0);

  const sectionIds = ["section-0", "section-1", "section-2", "section-3"];

  const { breakpoint } = useDetectSize();
  const isMobile = breakpoint === "xs" || breakpoint === "sm";

  const activeId = useScrollSpy(isMobile ? sectionIds : [], 100);

  const setManualScrollState = (value: boolean) => {
    isManualScrollRef.current = value;
    setIsManualScroll(value);
  };

  useEffect(() => {
    if (!isMobile) return;
    if (!activeId || isManualScrollRef.current) return;

    const parts = activeId.split("-");
    const sectionIndex = Number(parts[1]);

    if (!Number.isNaN(sectionIndex)) {
      setCurrentSection(sectionIndex);
    }
  }, [activeId, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (index: number) => {
    setManualScrollState(true);
    setCurrentSection(index);

    if (index === 0) {
      const firstSection = firstSectionRef.current;
      const targetY = firstSection
        ? window.scrollY + firstSection.getBoundingClientRect().top
        : 0;

      gsap.to(window, {
        scrollTo: { y: targetY },
        duration: 0.8,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          setCurrentSection(0);
          ScrollTrigger.refresh();
          setManualScrollState(false);
        },
      });
      return;
    }

    if (!isMobile) {
      scrollWrapperRef.current?.scrollToSection(index);

      window.setTimeout(() => {
        setManualScrollState(false);
      }, 950);
      return;
    }

    const target = document.getElementById(`section-${index}`);
    if (target) {
      const headerOffset = 90;
      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: headerOffset,
        },
        duration: 0.85,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          setCurrentSection(index);
          setManualScrollState(false);
        },
      });
    } else {
      setManualScrollState(false);
    }
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