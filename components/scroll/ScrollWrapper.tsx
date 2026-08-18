// "use client";

// import React, {
//   ReactNode,
//   forwardRef,
//   useCallback,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from "react";

// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import gsap from "gsap";
// import { useDetectSize } from "@/hooks/shared/useDetectSize";

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// export interface ScrollWrapperHandle {
//   scrollToHorizontalProgress: (progress: number) => void;
//   scrollToSection: (index: number) => void;
//   getContainer: () => HTMLDivElement | null;
// }

// interface ScrollWrapperProps {
//   children: ReactNode;
//   scrollToId?: string;
//   currentSection?: number | null;
//   setCurrentSection?: (section: number) => void;
//   firstSectionRef: React.RefObject<HTMLElement | null>;
// }

// const ScrollWrapper = forwardRef<ScrollWrapperHandle, ScrollWrapperProps>(
//   ({ children, scrollToId, setCurrentSection }, ref) => {
//     const container = useRef<HTMLDivElement | null>(null);
//     const content = useRef<HTMLDivElement | null>(null);

//     const scrollbar = useRef<HTMLDivElement | null>(null);
//     const thumb = useRef<HTMLDivElement | null>(null);

//     const scrollTrigger = useRef<ScrollTrigger | null>(null);
//     const animation = useRef<gsap.core.Tween | null>(null);

//     const initializationTimer = useRef<ReturnType<typeof setTimeout> | null>(
//       null,
//     );

//     const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const { breakpoint } = useDetectSize();

//     const [isDragging, setIsDragging] = useState(false);

//     const scrollStart = useRef(0);
//     const scrollEnd = useRef(0);

//     const dragStartX = useRef(0);
//     const dragStartScrollY = useRef(0);

//     const isMobile = breakpoint === "xs" || breakpoint === "sm";

//     /*
//      * =========================================
//      * Get sections
//      * =========================================
//      */

//     const getSections = useCallback((): HTMLElement[] => {
//       if (!content.current) {
//         return [];
//       }

//       return Array.from(content.current.children) as HTMLElement[];
//     }, []);

//     /*
//      * =========================================
//      * Kill current ScrollTrigger
//      * =========================================
//      */

//     const killScrollAnimation = useCallback(() => {
//       scrollTrigger.current?.kill();
//       animation.current?.kill();

//       scrollTrigger.current = null;
//       animation.current = null;

//       gsap.set(content.current, {
//         clearProps: "transform",
//       });
//     }, []);

//     /*
//      * =========================================
//      * Update custom scrollbar
//      * =========================================
//      */

//     const updateScrollbar = useCallback(() => {
//       if (
//         !content.current ||
//         !container.current ||
//         !scrollbar.current ||
//         !thumb.current
//       ) {
//         return;
//       }

//       const totalWidth = content.current.scrollWidth;
//       const viewportWidth = container.current.clientWidth;

//       if (totalWidth <= viewportWidth) {
//         thumb.current.style.width = "100%";
//         thumb.current.style.left = "0px";
//         return;
//       }

//       const scrollbarWidth = scrollbar.current.clientWidth;

//       const thumbWidth = (viewportWidth / totalWidth) * scrollbarWidth;

//       thumb.current.style.width = `${Math.max(20, thumbWidth)}px`;

//       const progress = scrollTrigger.current?.progress ?? 0;

//       const maxThumbPosition = scrollbarWidth - thumb.current.clientWidth;

//       thumb.current.style.left = `${progress * maxThumbPosition}px`;
//     }, []);

//     /*
//      * =========================================
//      * Initialize horizontal ScrollTrigger
//      * =========================================
//      */

//     const initializeScroll = useCallback(() => {
//       if (isMobile) {
//         return;
//       }

//       if (!container.current || !content.current) {
//         return;
//       }

//       const containerElement = container.current;

//       const contentElement = content.current;

//       /*
//        * Kill old instance
//        */

//       killScrollAnimation();

//       /*
//        * Make sure browser layout is updated
//        */

//       ScrollTrigger.refresh();

//       /*
//        * =====================================
//        * Calculate real horizontal distance
//        * =====================================
//        */

//       const sections = getSections();

//       if (!sections.length) {
//         return;
//       }

//       const scrollDistance = Math.max(
//         0,
//         contentElement.scrollWidth - containerElement.clientWidth,
//       );
//       if (scrollDistance <= 0) {
//         updateScrollbar();
//         return;
//       }

//       /*
//        * =====================================
//        * Initial scrollbar
//        * =====================================
//        */

//       updateScrollbar();

//       /*
//        * =====================================
//        * Horizontal animation
//        * =====================================
//        */

//       const horizontalAnimation = gsap.to(contentElement, {
//         x: -scrollDistance,
//         ease: "none",
//         duration: 1,
//         paused: true,
//       });

//       animation.current = horizontalAnimation;

//       /*
//        * =====================================
//        * ScrollTrigger
//        * =====================================
//        */

//       const trigger = ScrollTrigger.create({
//         id: "horizontal-scroll",

//         animation: horizontalAnimation,

//         trigger: containerElement,

//         start: "top top",

//         end: `+=${scrollDistance}`,

//         /*
//          * ScrollSmoother خودش smooth
//          * می‌کند، بنابراین اینجا
//          * smoothing خیلی زیاد نمی‌کنیم.
//          */

//         scrub: 0.3,

//         pin: true,

//         anticipatePin: 1,

//         invalidateOnRefresh: true,

//         onUpdate: (self) => {
//           const progress = self.progress;

//           /*
//            * ===========================
//            * Custom scrollbar
//            * ===========================
//            */

//           if (thumb.current && scrollbar.current) {
//             const maxThumbPosition =
//               scrollbar.current.clientWidth - thumb.current.clientWidth;

//             thumb.current.style.left = `${progress * maxThumbPosition}px`;
//           }

//           /*
//            * ===========================
//            * Active section
//            * ===========================
//            */

//           const totalSections = sections.length;

//           if (!totalSections || !setCurrentSection) {
//             return;
//           }

//           const horizontalIndex = Math.min(
//             totalSections - 1,
//             Math.round(progress * (totalSections - 1)),
//           );

//           const sectionIndex = horizontalIndex + 1;

//           setCurrentSection(sectionIndex);
//         },

//         /*
//          * ===========================
//          * Enter horizontal section
//          * ===========================
//          */

//         onEnter: () => {
//           if (setCurrentSection) {
//             setCurrentSection(1);
//           }
//         },

//         /*
//          * ===========================
//          * Leave horizontal area
//          * ===========================
//          */

//         onLeave: () => {
//           if (setCurrentSection) {
//             setCurrentSection(sections.length);
//           }
//         },

//         /*
//          * ===========================
//          * Go back to Hero / Home
//          * ===========================
//          */

//         onLeaveBack: () => {
//           if (setCurrentSection) {
//             setCurrentSection(0);
//           }
//         },
//       });

//       scrollTrigger.current = trigger;

//       /*
//        * Save exact scroll boundaries
//        */

//       scrollStart.current = trigger.start;

//       scrollEnd.current = trigger.end;

//       /*
//        * Final refresh
//        */

//       ScrollTrigger.refresh();

//       /*
//        * Update after refresh
//        */

//       updateScrollbar();
//     }, [
//       getSections,
//       isMobile,
//       killScrollAnimation,
//       setCurrentSection,
//       updateScrollbar,
//     ]);

//     /*
//      * =========================================
//      * Imperative API
//      * =========================================
//      */

//     useImperativeHandle(
//       ref,
//       () => ({
//         /*
//          * Scroll using progress
//          */

//         scrollToHorizontalProgress: (progress: number) => {
//           if (!scrollTrigger.current) {
//             return;
//           }

//           progress = Math.max(0, Math.min(1, progress));

//           const targetY =
//             scrollStart.current +
//             (scrollEnd.current - scrollStart.current) * progress;

//           gsap.to(window, {
//             scrollTo: {
//               y: targetY,
//             },

//             duration: 0.8,

//             ease: "power2.out",
//           });
//         },

//         /*
//          * Scroll to section
//          */

//         scrollToSection: (index: number) => {
//           if (!scrollTrigger.current) {
//             return;
//           }

//           const sections = getSections();

//           if (!sections.length) {
//             return;
//           }

//           /*
//            * Header:
//            *
//            * 0 = Home
//            * 1 = Section 1
//            * 2 = Section 2
//            * 3 = Section 3
//            */

//           if (index === 0) {
//             const home = document.getElementById("section-0");

//             if (home) {
//               const rect = home.getBoundingClientRect();

//               const targetY = rect.top + window.scrollY;

//               gsap.to(window, {
//                 scrollTo: {
//                   y: targetY,
//                 },

//                 duration: 0.8,

//                 ease: "power2.out",
//               });
//             }

//             return;
//           }

//           const horizontalIndex = index - 1;

//           if (horizontalIndex < 0 || horizontalIndex >= sections.length) {
//             return;
//           }

//           /*
//            * Calculate progress
//            */

//           const progress =
//             sections.length === 1 ? 0 : horizontalIndex / (sections.length - 1);

//           /*
//            * Calculate target scroll
//            */

//           const targetY =
//             scrollStart.current +
//             (scrollEnd.current - scrollStart.current) * progress;

//           gsap.to(window, {
//             scrollTo: {
//               y: targetY,
//             },

//             duration: 0.8,

//             ease: "power2.out",
//           });
//         },

//         getContainer: () => container.current,
//       }),
//       [getSections],
//     );

//     /*
//      * =========================================
//      * Initial setup
//      * =========================================
//      */

//     useEffect(() => {
//       if (isMobile) {
//         killScrollAnimation();
//         return;
//       }

//       if (!container.current || !content.current) {
//         return;
//       }

//       /*
//        * Give DOM / images / fonts time
//        * to calculate their final dimensions.
//        */

//       initializationTimer.current = setTimeout(() => {
//         initializeScroll();
//       }, 150);

//       return () => {
//         if (initializationTimer.current) {
//           clearTimeout(initializationTimer.current);
//         }

//         killScrollAnimation();
//       };
//     }, [breakpoint, isMobile, initializeScroll, killScrollAnimation]);

//     /*
//      * =========================================
//      * Resize
//      * =========================================
//      */

//     useEffect(() => {
//       if (isMobile) {
//         return;
//       }

//       const handleResize = () => {
//         if (refreshTimer.current) {
//           clearTimeout(refreshTimer.current);
//         }

//         refreshTimer.current = setTimeout(() => {
//           /*
//            * Recalculate everything.
//            *
//            * فقط refresh کافی نیست،
//            * چون viewport width تغییر کرده.
//            */

//           initializeScroll();
//         }, 200);
//       };

//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);

//         if (refreshTimer.current) {
//           clearTimeout(refreshTimer.current);
//         }
//       };
//     }, [isMobile, initializeScroll]);

//     /*
//      * =========================================
//      * Orientation change
//      * =========================================
//      */

//     useEffect(() => {
//       if (isMobile) {
//         return;
//       }

//       const handleOrientationChange = () => {
//         setTimeout(() => {
//           initializeScroll();
//         }, 300);
//       };

//       window.addEventListener("orientationchange", handleOrientationChange);

//       return () => {
//         window.removeEventListener(
//           "orientationchange",
//           handleOrientationChange,
//         );
//       };
//     }, [isMobile, initializeScroll]);

//     /*
//      * =========================================
//      * Window load
//      * =========================================
//      *
//      * برای زمانی که تصاویر / فونت‌ها
//      * بعد از initialize اندازه‌شان
//      * تغییر می‌کند.
//      */

//     useEffect(() => {
//       if (isMobile) {
//         return;
//       }

//       const handleLoad = () => {
//         setTimeout(() => {
//           initializeScroll();
//         }, 100);
//       };

//       window.addEventListener("load", handleLoad);

//       return () => {
//         window.removeEventListener("load", handleLoad);
//       };
//     }, [isMobile, initializeScroll]);

//     /*
//      * =========================================
//      * External vertical navigation
//      * =========================================
//      */

//     const scrollVerticallyToSection = useCallback(() => {
//       if (!container.current) {
//         return;
//       }

//       const rect = container.current.getBoundingClientRect();

//       const scrollY = window.scrollY || window.pageYOffset;

//       const targetY = rect.top + scrollY;

//       gsap.to(window, {
//         scrollTo: {
//           y: targetY,
//         },

//         duration: 0.8,

//         ease: "power2.out",

//         onComplete: () => {
//           ScrollTrigger.refresh();
//         },
//       });
//     }, []);

//     useEffect(() => {
//       if (!scrollToId) {
//         return;
//       }

//       scrollVerticallyToSection();
//     }, [scrollToId, scrollVerticallyToSection]);

//     /*
//      * =========================================
//      * Drag start
//      * =========================================
//      */

//     const onDragStart = (e: React.MouseEvent) => {
//       e.preventDefault();

//       if (!scrollTrigger.current) {
//         return;
//       }

//       setIsDragging(true);

//       dragStartX.current = e.clientX;

//       dragStartScrollY.current = window.scrollY || window.pageYOffset;

//       window.addEventListener("mousemove", onDragMove);

//       window.addEventListener("mouseup", onDragEnd);
//     };

//     /*
//      * =========================================
//      * Drag move
//      * =========================================
//      */

//     const onDragMove = useCallback((e: MouseEvent) => {
//       if (!thumb.current || !scrollbar.current) {
//         return;
//       }

//       const dx = e.clientX - dragStartX.current;

//       const scrollbarWidth = scrollbar.current.clientWidth;

//       const thumbWidth = thumb.current.clientWidth;

//       const range = scrollbarWidth - thumbWidth;

//       if (range <= 0) {
//         return;
//       }

//       const scrollRange = scrollEnd.current - scrollStart.current;

//       if (scrollRange <= 0) {
//         return;
//       }

//       /*
//        * Position when drag started
//        */

//       const startProgress = Math.max(
//         0,
//         Math.min(
//           1,
//           (dragStartScrollY.current - scrollStart.current) / scrollRange,
//         ),
//       );

//       let newLeft = startProgress * range + dx;

//       newLeft = Math.max(0, Math.min(range, newLeft));

//       const progress = newLeft / range;

//       const targetScrollY = scrollStart.current + scrollRange * progress;

//       window.scrollTo({
//         top: targetScrollY,
//         behavior: "auto",
//       });
//     }, []);

//     /*
//      * =========================================
//      * Drag end
//      * =========================================
//      */

//     const onDragEnd = useCallback(() => {
//       setIsDragging(false);

//       window.removeEventListener("mousemove", onDragMove);

//       window.removeEventListener("mouseup", onDragEnd);
//     }, [onDragMove]);

//     /*
//      * =========================================
//      * Cleanup drag on unmount
//      * =========================================
//      */

//     useEffect(() => {
//       return () => {
//         window.removeEventListener("mousemove", onDragMove);

//         window.removeEventListener("mouseup", onDragEnd);
//       };
//     }, [onDragMove, onDragEnd]);

//     /*
//      * =========================================
//      * Render
//      * =========================================
//      */

//     return (
//       <div
//         ref={container}
//         id="scroll-wrapper"
//         className="
//         relative
//         w-full
//         md:h-dvh
//         sm:h-auto
//         overflow-hidden
//         flex
//         flex-col
//       "
//       >
//         <div
//           ref={content}
//           dir="ltr"
//           className="
//           flex
//           flex-col
//           md:flex-row
//           md:h-full
//           md:w-fit
//           w-full
//           gap-10
//           md:gap-0
//           overflow-hidden
//         "
//         >
//           {children}
//         </div>

//         {!isMobile && (
//           <div
//             ref={scrollbar}
//             className="
//             fixed
//             z-[9999]
//             bottom-5
//             left-1/2
//             h-[3px]
//             w-[80%]
//             -translate-x-1/2
//             rounded
//             bg-gray-300
//           "
//             style={{
//               userSelect: isDragging ? "none" : "auto",
//             }}
//           >
//             <div
//               ref={thumb}
//               className="
//               absolute
//               top-0
//               left-0
//               h-full
//               cursor-pointer
//               rounded
//               bg-primary
//             "
//               onMouseDown={onDragStart}
//             />
//           </div>
//         )}
//       </div>
//     );
//   },
// );

// ScrollWrapper.displayName = "ScrollWrapper";

// export default ScrollWrapper;
"use client";

import React, {
  ReactNode,
  forwardRef,
  useCallback,
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
}

const ScrollWrapper = forwardRef<ScrollWrapperHandle, ScrollWrapperProps>(
  ({ children, scrollToId, setCurrentSection }, ref) => {
    const { breakpoint, mounted } = useDetectSize();

    const horizontalScroll = useHorizontalScroll({
      breakpoint,
      setCurrentSection,
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

    /*
     * Drag
     */
    const { isDragging, onDragStart } = useScrollDrag({
      scrollbar,
      thumb,
      scrollStart,
      scrollEnd,
      scrollTrigger,
    });

    /*
     * Effects
     */
    useScrollWrapperEffects({
      breakpoint,
      isMobile,
      container,
      content,
      initializeScroll,
      killScrollAnimation,
    });

    /*
     * External vertical navigation
     */
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

    /*
     * scrollToId
     */
    React.useEffect(() => {
      if (!mounted) {
        return;
      }

      if (!scrollToId) {
        return;
      }

      scrollVerticallyToSection();
    }, [mounted, scrollToId, scrollVerticallyToSection]);

    /*
     * Imperative API
     */
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
          dir="ltr"
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
