// import { FC } from "react"
// import ScrollWrapper from "../scroll/ScrollWrapper"
// import { activeOnScrollReturnType } from "@/hooks/useActiveSectionScroll";
// import Slider from "./Seaction2/Slider";
// import AboutMe from "./Section3/AboutMe";
// import ContactMe from "./Section4/ContactMe";
// export type DesktopContentPropType = Pick<
//   activeOnScrollReturnType,
//   "firstSectionRef" | "currentSection" | "scrollWrapperRef"|"setCurrentSection"
// >;
// const DesktopContent:FC<DesktopContentPropType> = ({firstSectionRef,
// currentSection,
// setCurrentSection,
// scrollWrapperRef})=>{
//     return(
//         <>
//             <ScrollWrapper firstSectionRef={firstSectionRef} currentSection={currentSection} setCurrentSection={setCurrentSection} ref={scrollWrapperRef}  >

//               <section
//                 id="section-1"
//                 className="section lg:w-screen overflow-hidden md:h-screen flex items-center justify-center text-6xl font-bold">

//                 <Slider />

//               </section>

//               <section
//                 id="section-2"
//                 className="section lg:w-screen overflow-hidden md:h-screen flex items-center justify-center text-6xl font-bold">

//                 <AboutMe />
//               </section>

//               <section
//                 id="section-3"
//                 className="section lg:w-screen md:h-screen flex items-center justify-center text-6xl font-bold">

//                 <ContactMe />
//               </section>



//             </ScrollWrapper>
//         </>
//     )
// }
// export default DesktopContent

"use client";

import AboutMe from "./Section3/AboutMe";
import ContactMe from "./Section4/ContactMe";
import { FC } from "react";
import ScrollWrapper from "../scroll/ScrollWrapper";
import Slider from "./Seaction2/Slider";
import { activeOnScrollReturnType } from "@/hooks/useActiveSectionScroll";

export type DesktopContentPropType = Pick<
  activeOnScrollReturnType,
  | "firstSectionRef"
  | "currentSection"
  | "scrollWrapperRef"
  | "setCurrentSection"
>;

const DesktopContent: FC<DesktopContentPropType> = ({
  firstSectionRef,
  currentSection,
  setCurrentSection,
  scrollWrapperRef,
}) => {
  return (
    <ScrollWrapper
      ref={scrollWrapperRef}
      firstSectionRef={firstSectionRef}
      currentSection={currentSection}
      setCurrentSection={setCurrentSection}
    >
      {/* =========================
          SECTION 1
      ========================== */}
      <section
        id="section-1"
        data-section-index="1"
        dir="rtl"
        className="
          section
          w-screen
          h-screen
          shrink-0
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >
        <Slider />
      </section>

      {/* =========================
          SECTION 2
      ========================== */}
      <section
        id="section-2"
        data-section-index="2"
        dir="rtl"
        className="
          section
          w-screen
          h-screen
          shrink-0
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >
        <AboutMe />
      </section>

      {/* =========================
          SECTION 3
      ========================== */}
      <section
        id="section-3"
        data-section-index="3"
        dir="rtl"
        className="
          section
          w-screen
          h-screen
          shrink-0
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >
        <ContactMe />
      </section>
    </ScrollWrapper>
  );
};

export default DesktopContent;