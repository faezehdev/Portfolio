"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "@/components/shared/title/Title";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface ContactMeProp {}

const ContactMe: React.FC<ContactMeProp> = () => {
  const t = useTranslations("contactSection");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const hasPlayedRef = useRef(false);

  const playEntrance = useCallback(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: isRtl ? 40 : -40, force3D: true },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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
        x: isRtl ? 40 : -40,
        force3D: true,
      });
    }

    if (formRef.current) {
      gsap.set(formRef.current, {
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
    let rafId: number | null = null;

    const checkInViewport = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vw = window.innerWidth;

      // اگر سکشن در محدوده‌ی دید قرار گرفت
      const visible = rect.left < vw * 0.92 && rect.right > vw * 0.08;
      if (visible) {
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
          onLeave: resetEntrance,
          onLeaveBack: resetEntrance,
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

  const emailValue = t("info.emailValue");
  const phoneValue = t("info.phoneValue");

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
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-10
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
        className="
          contactMe
          relative
          z-10
          w-full
          max-w-2xl
          lg:max-w-3xl
          rounded-3xl
          bg-dark/90
          border
          border-primary/40
          shadow-[0_12px_40px_rgba(116,100,201,0.16)]
          p-6
          sm:p-8
          lg:p-10
        "
      >
        <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary via-purple to-primary" />

        <div className="mx-auto mb-6 flex flex-col items-center justify-center text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-medium text-text-white">
            <span className="h-2 w-2 rounded-full bg-purple" />
            <span>{t("badge")}</span>
          </div>

          <Title ref={titleRef} tag="h3">
            {t("title")}
          </Title>

          <p className="text-sm sm:text-base font-light text-center text-text-white/85 max-w-xl leading-7">
            {t("description")}
          </p>
        </div>

        <form
          ref={formRef}
          className="max-w-2xl mx-auto flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert(t("form.submittedAlert"));
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder={t("form.namePlaceholder")}
              className="
                p-3.5
                text-sm
                rounded-xl
                bg-white/[0.03]
                border
                border-grey-dark/70
                focus:border-primary
                focus:outline-none
                text-text-white
                placeholder:text-grey
                transition
              "
              required
            />

            <input
              type="email"
              placeholder={t("form.emailPlaceholder")}
              className="
                p-3.5
                text-sm
                rounded-xl
                bg-white/[0.03]
                border
                border-grey-dark/70
                focus:border-primary
                focus:outline-none
                text-text-white
                placeholder:text-grey
                transition
              "
              required
            />
          </div>

          <textarea
            placeholder={t("form.messagePlaceholder")}
            rows={4}
            className="
              p-3.5
              text-sm
              rounded-xl
              bg-white/[0.03]
              border
              border-grey-dark/70
              focus:border-primary
              focus:outline-none
              text-text-white
              placeholder:text-grey
              resize-none
              transition
            "
            required
          />

          <button
            type="submit"
            className="
              mt-1
              w-full
              rounded-xl
              py-3.5
              text-sm
              font-bold
              text-white
              bg-gradient-to-r
              from-primary
              to-purple
              hover:opacity-95
              active:scale-[0.99]
              transition
              cursor-pointer
              shadow-[0_6px_20px_rgba(116,100,201,0.3)]
            "
          >
            {t("form.submitButton")}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-grey-dark/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-grey text-center">
          <p>
            {t("info.emailLabel")}{" "}
            <a
              href={`mailto:${emailValue}`}
              className="text-text-white hover:text-primary transition underline-offset-4 hover:underline"
            >
              {emailValue}
            </a>
          </p>

          <p>
            {t("info.phoneLabel")}{" "}
            <a
              href={`tel:${phoneValue}`}
              className="text-text-white hover:text-primary transition underline-offset-4 hover:underline"
            >
              {phoneValue}
            </a>
          </p>

          <p>{t("info.location")}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;