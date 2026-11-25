"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "@/components/shared/title/Title";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const t = useTranslations("aboutSection");
  const locale = useLocale();
  const isRtl = locale === "fa";
  const rawSkills = t.raw("skills");
  const skills = Array.isArray(rawSkills) ? (rawSkills as string[]) : [];

  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const hasPlayedRef = useRef(false);

  const playEntrance = useCallback(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          x: isRtl ? 50 : -50,
          force3D: true,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          x: isRtl ? -50 : 50,
          force3D: true,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
  }, [isRtl]);

  const resetEntrance = useCallback(() => {
    hasPlayedRef.current = false;

    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        x: isRtl ? 50 : -50,
        force3D: true,
      });
    }

    if (textRef.current) {
      gsap.set(textRef.current, {
        opacity: 0,
        x: isRtl ? -50 : 50,
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
    let rafId: number | null = null;

    const checkInViewport = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vw = window.innerWidth;

      const isInView = rect.left < vw * 0.92 && rect.right > vw * 0.08;

      if (isInView) {
        playEntrance();
      } else if (rect.left >= vw || rect.right <= 0) {
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

        const onScrollOrTick = () => {
          if (rafId !== null) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(checkInViewport);
        };

        window.addEventListener("scroll", onScrollOrTick, { passive: true });
        checkInViewport();

        return () => {
          window.removeEventListener("scroll", onScrollOrTick);
        };
      }, sectionRef);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        checkInViewport();
      });
    };

    initializeAnimation();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId !== null) cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [isRtl, playEntrance, resetEntrance]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        lg:min-w-[800px]
        min-h-[75dvh]
        lg:h-dvh
        px-4
        sm:px-8
        py-10
        lg:py-16
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
          bg-purple/20
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
          bg-primary/20
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-2xl
          lg:max-w-4xl
          rounded-3xl
          bg-dark/90
          border
          border-primary/40
          shadow-[0_12px_40px_rgba(116,100,201,0.16)]
          p-6
          sm:p-10
          lg:p-14
        "
      >
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary via-purple to-primary" />

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs sm:text-sm font-medium text-text-white">
            <span className="h-2 w-2 rounded-full bg-purple" />
            <span>{t("badge")}</span>
          </div>

          <Title ref={titleRef} tag="h2">
            {t("title")}
          </Title>

          <p
            ref={textRef}
            className="
              text-sm
              sm:text-base
              lg:text-lg
              leading-8
              sm:leading-9
              font-light
              text-text-white/90
            "
          >
            {t("description")}
          </p>

          <div className="pt-4 border-t border-grey-dark/50 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm text-grey">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-grey-dark/60 text-text-white/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;