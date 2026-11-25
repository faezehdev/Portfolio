"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import Project from "./Project";
import { ProjectData } from "@/app/[locale]/page";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "@/components/shared/title/Title";
import { gsap } from "gsap";

interface SliderProps {
  projects: ProjectData[];
}

gsap.registerPlugin(ScrollTrigger);

const Slider = ({ projects = [] }: SliderProps) => {
  const t = useTranslations("projectsSection");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const sectionRef = useRef<HTMLElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const hasPlayedRef = useRef(false);

  const playEntrance = useCallback(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const slides = slidesRef.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: isRtl ? 40 : -40, force3D: true },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    if (slides.length > 0) {
      gsap.fromTo(
        slides,
        { opacity: 0, y: 40, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          delay: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
  }, [isRtl]);

  const resetEntrance = useCallback(() => {
    hasPlayedRef.current = false;

    const slides = slidesRef.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );

    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        x: isRtl ? 40 : -40,
        force3D: true,
      });
    }

    if (slides.length > 0) {
      gsap.set(slides, {
        opacity: 0,
        y: 40,
        force3D: true,
      });
    }
  }, [isRtl]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    resetEntrance();

    let attempts = 0;
    const maxAttempts = 40;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let ctx: gsap.Context | null = null;

    const checkVisibility = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      const isInView =
        rect.left < viewportWidth * 0.85 && rect.right > viewportWidth * 0.15;

      if (isInView) {
        playEntrance();
      } else if (rect.left >= viewportWidth || rect.right <= 0) {
        resetEntrance();
      }
    };

    const initializeAnimation = () => {
      const horizontalTrigger = ScrollTrigger.getById("horizontal-scroll");
      const containerAnimation = horizontalTrigger?.animation;

      if (!containerAnimation || !sectionRef.current) {
        attempts += 1;
        if (attempts < maxAttempts) {
          timeoutId = setTimeout(initializeAnimation, 100);
        } else {
          playEntrance();
        }
        return;
      }

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          containerAnimation,
          start: "left right",
          end: "right left",
          onEnter: playEntrance,
          onEnterBack: playEntrance,
          onLeaveBack: resetEntrance,
          onLeave: resetEntrance,
        });

        const onContainerUpdate = () => {
          requestAnimationFrame(checkVisibility);
        };

        containerAnimation.eventCallback("onUpdate", onContainerUpdate);
        checkVisibility();

        return () => {
          containerAnimation.eventCallback("onUpdate", null);
        };
      }, sectionRef);
    };

    initializeAnimation();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      ctx?.revert();
    };
  }, [isRtl, playEntrance, resetEntrance, projects.length]);

const renderSlides = () => {
  return projects.map((project, index) => (
    <SwiperSlide
      key={project.id}
      className="!w-auto !h-auto shrink-0 flex items-center justify-center"
    >
      <div
        ref={(el) => {
          slidesRef.current[index] = el;
        }}
        className="flex items-center justify-center py-2"
      >
        <Project project={project} />
      </div>
    </SwiperSlide>
  ));
};

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        min-h-[75dvh]
        lg:h-dvh
        px-4
        sm:px-8
        py-10
        lg:py-14
        flex
        items-center
        justify-center
        text-text-white
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -top-10
          -right-10
          w-64
          h-64
          lg:w-80
          lg:h-80
          rounded-full
          bg-primary/20
          blur-3xl
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-10
          -left-10
          w-64
          h-64
          lg:w-80
          lg:h-80
          rounded-full
          bg-purple/20
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          rounded-3xl
          bg-dark/90
          border
          border-primary/40
          shadow-[0_12px_40px_rgba(116,100,201,0.16)]
          p-6
          sm:p-8
          lg:p-10
          flex
          flex-col
          gap-6
        "
      >
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary via-purple to-primary" />

        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-medium text-text-white">
            <span className="h-2 w-2 rounded-full bg-purple" />
            <span>{t("badge")}</span>
          </div>

          <Title ref={titleRef} tag="h2">
            {t("title")}
          </Title>

          <p className="text-xs sm:text-sm lg:text-base font-light text-text-white/80 max-w-xl">
            {t("description")}
          </p>
        </div>

        <div className="w-full pt-2">
        <Swiper
  className="w-full !overflow-visible sm:!overflow-hidden"
  spaceBetween={24}
  slidesPerView="auto"
  breakpoints={{
    320: {
      spaceBetween: 16,
    },
    640: {
      spaceBetween: 20,
    },
    1024: {
      spaceBetween: 24,
    },
  }}
>
  {renderSlides()}
</Swiper>
        </div>
      </div>
    </section>
  );
};

export default Slider;