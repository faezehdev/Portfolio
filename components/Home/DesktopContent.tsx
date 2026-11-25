import React, { FC } from "react";

import AboutMe from "./Section3/AboutMe";
import ContactMe from "./Section4/ContactMe";
import { ProjectData } from "@/app/[locale]/page";
import ScrollWrapper from "../scroll/ScrollWrapper";
import Slider from "./Seaction2/Slider";
import { activeOnScrollReturnType } from "@/hooks/useActiveSectionScroll";
import { useLocale } from "next-intl";

export type DesktopContentPropType = Pick<
  activeOnScrollReturnType,
  | "firstSectionRef"
  | "currentSection"
  | "scrollWrapperRef"
  | "setCurrentSection"
> & {
  projects: ProjectData[];
};

const sectionBaseClass =
  "section shrink-0 w-screen min-h-dvh h-auto md:h-screen overflow-hidden flex items-center justify-center py-8 md:py-0";

const DesktopContent: FC<DesktopContentPropType> = ({
  firstSectionRef,
  currentSection,
  setCurrentSection,
  scrollWrapperRef,
  projects,
}) => {
  const locale = useLocale();
  const isRtl = locale === "fa";

  const sections = [
    <section
      key="section-1"
      id="section-1"
      data-section-index="1"
      dir={isRtl ? "rtl" : "ltr"}
      className={sectionBaseClass}
    >
      <Slider projects={projects} />
    </section>,
    <section
      key="section-2"
      id="section-2"
      data-section-index="2"
      dir={isRtl ? "rtl" : "ltr"}
      className={sectionBaseClass}
    >
      <AboutMe />
    </section>,
    <section
      key="section-3"
      id="section-3"
      data-section-index="3"
      dir={isRtl ? "rtl" : "ltr"}
      className={`${sectionBaseClass} md:min-w-[500px]`}
    >
      <ContactMe />
    </section>,
  ];

  return (
    <ScrollWrapper
      ref={scrollWrapperRef}
      firstSectionRef={firstSectionRef}
      currentSection={currentSection}
      setCurrentSection={setCurrentSection}
      isRtl={isRtl}
    >
      {sections}
    </ScrollWrapper>
  );
};

export default DesktopContent;