'use client';

import ScrollWrapper from '@/components/scroll/ScrollWrapper';
import Header from '@/components/header/header';
import HeroSection from './HeroSection';
import SharedLayout from '@/app/[locale]/(shared)/layout';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useDetectSize } from '@/hooks/shared/useDetectSize';
import useActiveSectionScroll from '@/hooks/useActiveSectionScroll';
import MobileContent from './MobileContent';
import DesktopContent from './DesktopContent';
gsap.registerPlugin(ScrollTrigger);
export default function HomeClient() {
  const { breakpoint } = useDetectSize();
  const {
    scrollWrapperRef,
    currentSection,
    firstSectionRef,
    handleMenuClick,
    setCurrentSection
  }= useActiveSectionScroll()

  return (
    <>
      <Header currentSection={currentSection} handleMenuClick={handleMenuClick} />
      <SharedLayout>
        <section
          ref={firstSectionRef}
          id="section-0"
          className="w-full overflow-hidden mf:min-h-screen flex flex-col items-center justify-center text-6xl font-bold"
        >
          <HeroSection />
        </section>

        {
          breakpoint === 'md' || breakpoint === 'xs' ? (
            <>

          <MobileContent/>

            </>
          ) : (
        <DesktopContent
        firstSectionRef={firstSectionRef}
          currentSection={currentSection}
          scrollWrapperRef={scrollWrapperRef}
          setCurrentSection={setCurrentSection}
        />

          )
        }

      </SharedLayout>
    </>
  );
}
