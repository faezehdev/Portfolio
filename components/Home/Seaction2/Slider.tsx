import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Project from './Project';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Title from '@/components/shared/title/Title';

gsap.registerPlugin(ScrollTrigger);

const Slider = () => {
  const sectionRef = useRef(null);
const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef(null);
  useEffect(() => {
    const waitForScrollAnimation = () => {
      const containerAnimation = ScrollTrigger.getById('horizontal-scroll')?.animation;
      if (!containerAnimation) {
        setTimeout(waitForScrollAnimation, 100);
        return;
      }

      const ctx = gsap.context(() => {
        slidesRef.current.forEach((el, index) => {
          if (el) {
            gsap.from(el, {
              scrollTrigger: {
                trigger: el,
                containerAnimation,
                start: 'top 100%',
                end: 'right',
                // scrub: 1,
              },
              opacity: 0,
              y: 50,
              duration: 1,
              delay: index * 0.2,
              ease: 'power2.out',
            });
          }
        });
           gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation,
      start: 'top 80%',
                end: 'right',
          // scrub: 1,
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out',
      });
      }, sectionRef);
    };

    waitForScrollAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const renderSlides = () => {
  return [0, 1, 2, 3].map((_, i) => (
    <SwiperSlide
      key={i}
      className="w-full h-full overflow-hidden flex justify-center items-center"
    >
      <div
        ref={(el) => {
  slidesRef.current[i] = el;
}}

        className="w-full h-full flex justify-center items-center"
      >
        <Project />
      </div>
    </SwiperSlide>
  ));
};

  return (
    <div
      ref={sectionRef}
      className="w-[80%] my-auto flex-col mx-auto flex h-auto lg:max-h-svh"
    >
        <Title ref={titleRef} tag='h2' className='persian'>
           پروژه های من
        </Title>
      <Swiper
        className="w-full overflow-hidden"
        spaceBetween={50}
        slidesPerView={3}
          breakpoints={{
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 1.2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2.5,
    },
    1280: {
      slidesPerView: 3,
    },}}
      >
        
        {renderSlides()}
      </Swiper>
    </div>
  );
};

export default Slider;
