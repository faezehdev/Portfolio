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
      {/* <section
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

      <section
        id="section-2"
        data-section-index="2"
        dir="rtl"
        className="
          w-screen
      section
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

      <section
        id="section-3"
        data-section-index="3"
        dir="rtl"
        className="
         w-screen
      section
      h-screen
      shrink-0
      overflow-hidden
      flex
      items-center
      justify-center
    "
      >
        <ContactMe />
      </section> */}
      <section
        id="section-1"
        data-section-index="1"
        dir="rtl"
        className="
    section
    h-screen
    shrink-0
    overflow-hidden
    flex
    w-screen
    items-center
    justify-center
  "
      >
        <Slider />
      </section>

      <section
        id="section-2"
        data-section-index="2"
        dir="rtl"
        className="
    section
    h-screen
  w-screen
    overflow-hidden
    flex
    items-center
    justify-center
s
  "
      >
        <AboutMe />
      </section>

      <section
        id="section-3"
        data-section-index="3"
        dir="rtl"
        className="
    section
    h-screen
     min-w-[500px]
       w-screen
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
