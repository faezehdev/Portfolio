"use client";

import { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "@/components/shared/title/Title";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let ctx: gsap.Context | null = null;

    const initializeAnimation = () => {
      /*
       * ScrollWrapper باید اول ScrollTrigger اصلی
       * horizontal را ساخته باشد.
       */
      const horizontalTrigger =
        ScrollTrigger.getById("horizontal-scroll");

      const containerAnimation =
        horizontalTrigger?.animation;

      console.log(
        "AboutMe -> horizontalTrigger:",
        horizontalTrigger
      );

      console.log(
        "AboutMe -> containerAnimation:",
        containerAnimation
      );

      /*
       * اگر هنوز ScrollTrigger اصلی ساخته نشده،
       * دوباره تلاش کن.
       */
      if (!containerAnimation) {
        timeoutId = setTimeout(
          initializeAnimation,
          100
        );

        return;
      }

      /*
       * فقط animationهای AboutMe داخل این context
       * ساخته می‌شوند.
       */
      ctx = gsap.context(() => {
        /*
         * =========================
         * TITLE
         * =========================
         */

        if (titleRef.current && sectionRef.current) {
          gsap.fromTo(
            titleRef.current,
            {
              opacity: 0,
              x: -50,
            },
            {
              opacity: 1,
              x: 0,

              duration: 0.8,

              ease: "power2.out",

              scrollTrigger: {
                trigger: sectionRef.current,

                /*
                 * خیلی مهم:
                 * چون ScrollWrapper افقی است،
                 * باید containerAnimation داشته باشیم.
                 */
                containerAnimation,

                start: "left 85%",
                end: "left 40%",

                toggleActions:
                  "play none none reverse",

                /*
                 * برای تست می‌توانی فعالش کنی:
                 *
                 * markers: true,
                 */
              },
            }
          );
        }

        /*
         * =========================
         * TEXT
         * =========================
         */

        if (textRef.current && sectionRef.current) {
          gsap.fromTo(
            textRef.current,
            {
              opacity: 0,
              x: 50,
            },
            {
              opacity: 1,
              x: 0,

              duration: 0.8,

              ease: "power2.out",

              scrollTrigger: {
                trigger: sectionRef.current,

                containerAnimation,

                start: "left 80%",
                end: "left 40%",

                toggleActions:
                  "play none none reverse",

                /*
                 * markers: true,
                 */
              },
            }
          );
        }
      }, sectionRef);

      /*
       * بعد از ساخت Triggerها،
       * ScrollTrigger دوباره اندازه‌ها را محاسبه کند.
       */
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    initializeAnimation();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      /*
       * ❌ این کار را نکن:
       *
       * ScrollTrigger.getAll().forEach(...)
       *
       * چون horizontal-scroll را هم نابود می‌کند.
       *
       * فقط Triggerهای همین component پاک می‌شوند.
       */
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        lg:py-20
        lg:px-6
        mo:w-[95%]
        mo:py-4
        mx-auto
        bg-[#0f0f0f]
        animated-border-box
        border-[3px]
        border-primary
        rounded-3xl
        persian
        text-white
        relative
        w-screen
        h-dvh
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          max-w-4xl
          w-[90%]
          mx-auto
          text-center
        "
      >
        <Title
          ref={titleRef}
          tag="h2"
        >
          درباره من
        </Title>

        <p
          ref={textRef}
          className="
            lg:text-lg
            text-sm
            mo:text-justify
            lg:text-center
            leading-8
            persian
            font-light
          "
        >
          من فائزه‌ام، یه توسعه‌دهنده‌ی فرانت‌اند که عاشق
          خلق تجربه‌های تعاملی و جذاب برای کاربرهاست.
          عاشق یادگیریم و هر روز با اشتیاق یه چیز جدید
          توی دنیای React و تکنولوژی‌های وب کشف می‌کنم.
          از پروژه‌های واقعی تا چالش‌های فنی، همیشه دنبال
          فرصتی‌ام که بهتر بشم و بتونم تأثیر بذارم.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;