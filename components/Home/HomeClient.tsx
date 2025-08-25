'use client';

import ScrollWrapper, { ScrollWrapperHandle } from '@/components/scroll/ScrollWrapper';
import Header from '@/components/header/header';
import { useEffect, useRef, useState } from 'react';
import HeroSection from './HeroSection';
import SharedLayout from '@/app/[locale]/(shared)/layout';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Slider from './Seaction2/Slider';
import AboutMe from './Section3/AboutMe';
import ContactMe from './Section4/ContactMe';
import { useDetectSize } from '@/hooks/shared/useDetectSize';
import { useScrollSpy } from '@/hooks/shared/useScrollSpy';
gsap.registerPlugin(ScrollTrigger);
export default function HomeClient() {
  const scrollWrapperRef = useRef<ScrollWrapperHandle>(null);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const firstSectionRef = useRef<HTMLElement | null>(null);
  const { breakpoint } = useDetectSize()

  const sectionIds = ['section-0', 'section-1', 'section-2', 'section-3'];
  const activeId = useScrollSpy(sectionIds, 100);
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  useEffect(() => {
    if (activeId == null) return
    if (!isManualScroll && activeId && breakpoint == 'sm' || breakpoint == 'xs') {
      const sectionIndex = parseInt(activeId.split('-')[1]);
      if (!isNaN(sectionIndex)) {
        setCurrentSection(sectionIndex);
      }
    }
  }, [activeId, isManualScroll]);

  const handleMenuClick = (index: number) => {
    setIsManualScroll(true);
    if (index === 0 && firstSectionRef.current) {
      setActiveSection(0);
      firstSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (index === -1) {
      setActiveSection(-1);
    } else {
      console.log('setActiveSection', index);
      setActiveSection(index);
    }
    setTimeout(() => {
      setIsManualScroll(false);
    }, 1000);
  };
  useEffect(() => {
    console.log('your breakpoint', breakpoint);

  }, [breakpoint])
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

    if (isMobile) return;
    if (isManualScroll) return
    const onScroll = () => {
      if (!firstSectionRef.current) return;
      const rect = firstSectionRef.current.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      const offsetBottom = offsetTop + rect.height;
      const scrollY = window.scrollY || window.pageYOffset;
      console.log(scrollY);

      if (scrollY > 0 && scrollY < rect.height) {
        setCurrentSection(0);
      } else if (scrollY < 50) {
        setCurrentSection(-1);
      }

      else if (scrollY >= offsetTop - 50 && scrollY < offsetBottom - 50) {
        setCurrentSection(0);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [breakpoint, firstSectionRef]);
  return (
    <>
      <Header currentSection={currentSection} handleMenuClick={handleMenuClick} activeSection={activeSection} />
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

              <section
                id="section-1"
                className="section lg:w-screen overflow-hidden  flex items-center justify-center text-6xl font-bold">

                <Slider />

              </section>

              <section
                id="section-2"
                className="section py-[2em] lg:w-screen overflow-hidden  flex items-center justify-center text-6xl font-bold">

                <AboutMe />
              </section>

              <section
                id="section-3"
                className="section lg:w-screen pb-[3em] flex items-center justify-center text-6xl font-bold">

                <ContactMe />
              </section>

            </>
          ) : (
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

          )
        }

      </SharedLayout>
    </>
  );
}
