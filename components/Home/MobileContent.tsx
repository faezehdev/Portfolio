"use client";

import AboutMe from "./Section3/AboutMe";
import ContactMe from "./Section4/ContactMe";
import Slider from "./Seaction2/Slider";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/shared/useScrollReveal";

const MobileSection = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id={id}
      className="
        section
        mobile-section-reveal
        overflow-hidden
        flex
        items-center
        justify-center
        text-6xl
        font-bold
      "
    >
      {children}
    </section>
  );
};

const MobileContent = () => {
  return (
    <>
      <MobileSection id="section-1">
        <Slider />
      </MobileSection>

      <MobileSection id="section-2">
        <AboutMe />
      </MobileSection>

      <MobileSection id="section-3">
        <ContactMe />
      </MobileSection>
    </>
  );
};

export default MobileContent;
