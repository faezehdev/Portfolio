// import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollWrapperHandle } from "@/components/scroll/ScrollWrapper";
// import { useDetectSize } from "./shared/useDetectSize";
// import { useScrollSpy } from "./shared/useScrollSpy";

// export interface activeOnScrollReturnType {
//   scrollWrapperRef: React.RefObject<ScrollWrapperHandle | null>;
//   isManualScroll: boolean;
//   currentSection: number | null;
//   firstSectionRef: React.RefObject<HTMLElement | null>;
//   sectionIds: string[];
//   activeId: string | null;
//   handleMenuClick: (index: number) => void;
//   setCurrentSection: Dispatch<SetStateAction<number | null>>;
// }

// const useActiveSectionScroll = (): activeOnScrollReturnType => {
//   const scrollWrapperRef = useRef<ScrollWrapperHandle>(null);
//   const firstSectionRef = useRef<HTMLElement | null>(null);

//   const [isManualScroll, setIsManualScroll] = useState(false);
//   const [currentSection, setCurrentSection] = useState<number | null>(null);

//   const sectionIds = ["section-0", "section-1", "section-2", "section-3"];
//   const activeId = useScrollSpy(sectionIds, 100);
//   const { breakpoint } = useDetectSize();
//   // useEffect(() => {
//   //   setCurrentSection(-1);
//   //   const onResize = () => {
//   //     setTimeout(() => {
//   //       ScrollTrigger.refresh();
//   //       console.log("ScrollTrigger refresh");
//   //     }, 100);
//   //   };

//   //   window.addEventListener("resize", onResize);
//   //   return () => window.removeEventListener("resize", onResize);
//   // }, []);

//   useEffect(() => {
//     if (!activeId) return;

//     const onResize = () => {
//       setTimeout(() => {
//         ScrollTrigger.refresh();
//       }, 100);
//     };

//     if (!isManualScroll && (breakpoint === "sm" || breakpoint === "xs")) {
//       const sectionIndex = Number(activeId.split("-")[1]);
//       if (!isNaN(sectionIndex)) {
//         setCurrentSection(sectionIndex);
//       }
//     }

//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, [activeId, isManualScroll, breakpoint]);

//   const handleMenuClick = (index: number) => {
//     setIsManualScroll(true);

//     if (index === 0 && firstSectionRef.current) {
//       setCurrentSection(0);
//       firstSectionRef.current.scrollIntoView({ behavior: "smooth" });
//     } else {
//       setCurrentSection(index);
//     }

//     setTimeout(() => {
//       setIsManualScroll(false);
//     }, 1000);
//   };

//   return {
//     scrollWrapperRef,
//     isManualScroll,
//     currentSection,
//     firstSectionRef,
//     sectionIds,
//     activeId,
//     handleMenuClick,
//     setCurrentSection,
//   };
// };

// export default useActiveSectionScroll;

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollWrapperHandle } from "@/components/scroll/ScrollWrapper";
import { useDetectSize } from "./shared/useDetectSize";
import { useScrollSpy } from "./shared/useScrollSpy";

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

    /*
     * =====================================
     * HOME
     * =====================================
     *
     * Home همیشه ابتدای صفحه است.
     * روی Desktop وابسته به firstSectionRef نیستیم.
     */
    if (index === 0) {
      gsap.to(window, {
        scrollTo: {
          y: 0,
        },
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      window.setTimeout(() => {
        setIsManualScroll(false);
      }, 900);

      return;
    }

    /*
     * =====================================
     * DESKTOP
     * Projects = 1
     * About   = 2
     * Contact = 3
     * =====================================
     */
    if (!isMobile) {
      scrollWrapperRef.current?.scrollToSection(index);

      window.setTimeout(() => {
        setIsManualScroll(false);
      }, 1000);

      return;
    }

    /*
     * =====================================
     * MOBILE
     * =====================================
     */
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
  // /*
  //  * Menu click
  //  */
  // const handleMenuClick = (index: number) => {
  //   setIsManualScroll(true);

  //   /*
  //    * SECTION 0
  //    *
  //    * این سکشن خارج از ScrollWrapper است.
  //    */
  //   if (
  //     index === 0 &&
  //     firstSectionRef.current
  //   ) {
  //     setCurrentSection(0);

  //     firstSectionRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });

  //     window.setTimeout(() => {
  //       setIsManualScroll(false);
  //     }, 1000);

  //     return;
  //   }

  //   /*
  //    * SECTION 1, 2, 3
  //    *
  //    * Desktop
  //    */
  //   if (!isMobile) {
  //     setCurrentSection(index);

  //     scrollWrapperRef.current?.scrollToSection(
  //       index,
  //     );

  //     window.setTimeout(() => {
  //       setIsManualScroll(false);
  //     }, 1000);

  //     return;
  //   }

  //   /*
  //    * Mobile
  //    */
  //   const target = document.getElementById(
  //     `section-${index}`,
  //   );

  //   if (target) {
  //     setCurrentSection(index);

  //     target.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }

  //   window.setTimeout(() => {
  //     setIsManualScroll(false);
  //   }, 1000);
  // };

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
