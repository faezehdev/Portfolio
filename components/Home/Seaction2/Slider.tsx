
"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef } from "react";

import Project from "./Project";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "@/components/shared/title/Title";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Slider = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    let ctx: gsap.Context | null = null;

    const initializeAnimation = () => {
      const horizontalTrigger = ScrollTrigger.getById("horizontal-scroll");

      const containerAnimation = horizontalTrigger?.animation;

      if (!containerAnimation) {
        timeoutId = setTimeout(initializeAnimation, 100);

        return;
      }

      ctx = gsap.context(() => {
        const slides = slidesRef.current.filter(
          (el): el is HTMLDivElement => el !== null,
        );

        /*
         * --------------------------------
         * INITIAL STATE
         * --------------------------------
         */

        gsap.set(slides, {
          opacity: 0,
          y: 50,
          force3D: true,
        });

        if (titleRef.current) {
          gsap.set(titleRef.current, {
            opacity: 0,
            x: -50,
            force3D: true,
          });
        }

        /*
         * --------------------------------
         * TIMELINE
         * --------------------------------
         */

        const tl = gsap.timeline({
          paused: true,

          defaults: {
            ease: "power2.out",
          },
        });

        /*
         * TITLE
         */

        if (titleRef.current) {
          tl.to(
            titleRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              overwrite: "auto",
            },
            0,
          );
        }

        /*
         * PROJECTS
         */

        tl.to(
          slides,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            overwrite: "auto",
          },
          0.15,
        );

        /*
         * --------------------------------
         * SCROLL TRIGGER
         * --------------------------------
         */

        ScrollTrigger.create({
          trigger: sectionRef.current,

          containerAnimation,

          start: "left 85%",
          end: "left 25%",

          /*
           * وقتی وارد Projects می‌شویم
           */

          onEnter: () => {
            tl.play();
          },
        });
      }, sectionRef);
    };

    initializeAnimation();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      ctx?.revert();
    };
  }, []);

  const renderSlides = () => {
    return [0, 1, 2, 3].map((_, index) => (
      <SwiperSlide
        key={index}
        className="
          h-full
          w-full
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >
        <div
          ref={(el) => {
            slidesRef.current[index] = el;
          }}
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
          "
        >
          <Project />
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div
      ref={sectionRef}
      className="
        mx-auto
        my-auto
        flex
        h-auto
        w-[80%]
        flex-col
        lg:max-h-svh
      "
    >
      <Title ref={titleRef} tag="h2" className="persian">
        پروژه های من
      </Title>

      <Swiper
        className="w-full"
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
          },
        }}
      >
        {renderSlides()}
      </Swiper>
    </div>
  );
};

export default Slider;
