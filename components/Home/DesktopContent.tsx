import { FC } from "react"
import ScrollWrapper from "../scroll/ScrollWrapper"
import { activeOnScrollReturnType } from "@/hooks/useActiveSectionScroll";
import Slider from "./Seaction2/Slider";
import AboutMe from "./Section3/AboutMe";
import ContactMe from "./Section4/ContactMe";
export type DesktopContentPropType = Pick<
  activeOnScrollReturnType,
  "firstSectionRef" | "currentSection" | "scrollWrapperRef"|"setCurrentSection"
>;
const DesktopContent:FC<DesktopContentPropType> = ({firstSectionRef,
currentSection,
setCurrentSection,
scrollWrapperRef})=>{
    return(
        <>
            <ScrollWrapper firstSectionRef={firstSectionRef} currentSection={currentSection} setCurrentSection={setCurrentSection} ref={scrollWrapperRef}  >

              <section
                id="section-1"
                className="section lg:w-screen overflow-hidden md:h-screen flex items-center justify-center text-6xl font-bold">

                <Slider />

              </section>

              <section
                id="section-2"
                className="section lg:w-screen overflow-hidden md:h-screen flex items-center justify-center text-6xl font-bold">

                <AboutMe />
              </section>

              <section
                id="section-3"
                className="section lg:w-screen md:h-screen flex items-center justify-center text-6xl font-bold">

                <ContactMe />
              </section>



            </ScrollWrapper>
        </>
    )
}
export default DesktopContent