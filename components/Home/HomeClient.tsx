// 'use client';

// import DesktopContent from './DesktopContent';
// import Header from '@/components/header/header';
// import HeroSection from './HeroSection';
// import MobileContent from './MobileContent';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SharedLayout from '@/app/[locale]/(shared)/layout';
// import gsap from 'gsap';
// import useActiveSectionScroll from '@/hooks/useActiveSectionScroll';
// import { useDetectSize } from '@/hooks/shared/useDetectSize';

// gsap.registerPlugin(ScrollTrigger);
// export default function HomeClient() {
//   const { breakpoint } = useDetectSize();
//   const {
//     scrollWrapperRef,
//     currentSection,
//     firstSectionRef,
//     handleMenuClick,
//     setCurrentSection
//   }= useActiveSectionScroll()
// const isMobile = breakpoint === "xs" || breakpoint === "sm";
//   return (
//     <>
//       <Header currentSection={currentSection} handleMenuClick={handleMenuClick} />
//       <SharedLayout>
//         <section
//           ref={firstSectionRef}
//           id="section-0"
//           className="w-full overflow-hidden mf:min-h-screen flex flex-col items-center justify-center text-6xl font-bold"
//         >
//           <HeroSection />
//         </section>

//         {
//           isMobile ? (
//             <>

//           <MobileContent/>

//             </>
//           ) : (
//         <DesktopContent
//         firstSectionRef={firstSectionRef}
//           currentSection={currentSection}
//           scrollWrapperRef={scrollWrapperRef}
//           setCurrentSection={setCurrentSection}
//         />

//           )
//         }

//       </SharedLayout>
//     </>
//   );
// }
"use client";

import DesktopContent from "./DesktopContent";
import Header from "@/components/header/header";
import HeroSection from "./HeroSection";
import MobileContent from "./MobileContent";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SharedLayout from "@/app/[locale]/(shared)/layout";
import gsap from "gsap";
import useActiveSectionScroll from "@/hooks/useActiveSectionScroll";
import { useDetectSize } from "@/hooks/shared/useDetectSize";

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient() {
  const { breakpoint } = useDetectSize();

  const {
    scrollWrapperRef,
    currentSection,
    firstSectionRef,
    handleMenuClick,
    setCurrentSection,
  } = useActiveSectionScroll();

  const isMobile = breakpoint === "xs" || breakpoint === "sm";

  return (
    <>
      <Header
        currentSection={currentSection}
        handleMenuClick={handleMenuClick}
      />

      <SharedLayout>
        {/* =========================
            SECTION 0
            Normal vertical scroll
        ========================== */}
        <section
          ref={firstSectionRef}
          id="section-0"
          className="
            w-full
            min-h-screen
            overflow-hidden
            flex
            flex-col
            items-center
            justify-center
            text-6xl
            font-bold
          "
        >
          <HeroSection />
        </section>

        {/* =========================
            MOBILE
        ========================== */}
        {isMobile ? (
          <MobileContent />
        ) : (
          /* =========================
             DESKTOP
             Horizontal scroll
          ========================== */
          <DesktopContent
            firstSectionRef={firstSectionRef}
            currentSection={currentSection}
            scrollWrapperRef={scrollWrapperRef}
            setCurrentSection={setCurrentSection}
          />
        )}
      </SharedLayout>
    </>
  );
}