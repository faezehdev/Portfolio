import { ScrollWrapperHandle } from "@/components/scroll/ScrollWrapper";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useScrollSpy } from "./shared/useScrollSpy";
import { useDetectSize } from "./shared/useDetectSize";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface activeOnScrollParamType {}

export interface activeOnScrollReturnType {
  scrollWrapperRef: React.RefObject<ScrollWrapperHandle|null> ;
  isManualScroll: boolean;
  currentSection: number | null;
  firstSectionRef: React.RefObject<HTMLElement | null>;
  sectionIds: string[];
  activeId: string | null;
  handleMenuClick: (index: number) => void;
  setCurrentSection:Dispatch<SetStateAction<number | null>>
}

const useActiveSectionScroll = (): activeOnScrollReturnType => {
  const scrollWrapperRef = useRef<ScrollWrapperHandle>(null);
  const firstSectionRef = useRef<HTMLElement | null>(null);

  const [isManualScroll, setIsManualScroll] = useState(false);
  const [currentSection, setCurrentSection] = useState<number | null>(null);

  const sectionIds = ["section-0", "section-1", "section-2", "section-3"];
  const activeId = useScrollSpy(sectionIds, 100);
  const { breakpoint } = useDetectSize();
  useEffect(() => {
    setCurrentSection(-1)
    const onResize = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
        console.log('ScrollTrigger refresh');

      }, 100);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    if (!activeId) return;

    const onResize = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    if (
      !isManualScroll &&
      (breakpoint === "sm" || breakpoint === "xs")
    ) {
      const sectionIndex = Number(activeId.split("-")[1]);
      if (!isNaN(sectionIndex)) {
        setCurrentSection(sectionIndex);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId, isManualScroll, breakpoint]);

  const handleMenuClick = (index: number) => {
    setIsManualScroll(true);

    if (index === 0 && firstSectionRef.current) {
      setCurrentSection(0);
      firstSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      setCurrentSection(index);
    }

    setTimeout(() => {
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
    setCurrentSection
  };
};

export default useActiveSectionScroll;
