"use client";

import { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "@/components/shared/title/Title";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface ContactMeProp {}

const ContactMe: React.FC<ContactMeProp> = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    let ctx: gsap.Context | null = null;

    const initializeAnimation = () => {
      /*
       * ScrollTrigger اصلی که داخل ScrollWrapper
       * ساخته شده است.
       */
      const horizontalTrigger = ScrollTrigger.getById("horizontal-scroll");

      const containerAnimation = horizontalTrigger?.animation;

      console.log("ContactMe -> horizontalTrigger:", horizontalTrigger);

      console.log("ContactMe -> containerAnimation:", containerAnimation);

      /*
       * اگر ScrollWrapper هنوز آماده نیست،
       * دوباره تلاش می‌کنیم.
       */
      if (!containerAnimation) {
        timeoutId = setTimeout(initializeAnimation, 100);

        return;
      }

      /*
       * فقط animationهای ContactMe
       * داخل همین context ساخته می‌شوند.
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

                containerAnimation,

                start: "left 85%",
                end: "left 40%",

                toggleActions: "play none none reverse",

                /*
                 * برای تست:
                 *
                 * markers: true,
                 */
              },
            },
          );
        }

        /*
         * =========================
         * FORM
         * =========================
         */

        if (formRef.current && sectionRef.current) {
          gsap.fromTo(
            formRef.current,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,

              duration: 0.8,

              delay: 0.15,

              ease: "power2.out",

              scrollTrigger: {
                trigger: sectionRef.current,

                /*
                 * قبلاً اینجا containerAnimation
                 * نداشتی و فرم با scroll عمودی
                 * کنترل می‌شد.
                 */
                containerAnimation,

                start: "left 80%",
                end: "left 40%",

                toggleActions: "play none none reverse",

                /*
                 * markers: true,
                 */
              },
            },
          );
        }
      }, sectionRef);

      /*
       * بعد از ایجاد Triggerها
       * محاسبات دوباره انجام شود.
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
       * ❌ این کار را نباید انجام دهیم:
       *
       * ScrollTrigger.getAll().forEach(...)
       *
       * چون horizontal-scroll اصلی را هم
       * از بین می‌برد.
       */

      ctx?.revert();
    };
  }, []);

  return (
    <div
      className="
        contactMe
        lg:w-full
        mo:w-[90%]
        mo:py-4
        border-[3px]
        border-primary
        rounded-3xl
        animated-border-box
        !h-auto
        pb-4
        !max-h-[85%]
      "
    >
      <section
        ref={sectionRef}
        className="
          px-6
          text-white
          persian
        "
      >
        {/* =========================
            HEADER
        ========================== */}

        <div
          className="
            mx-auto
            my-10
            flex
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <Title ref={titleRef} tag="h3">
            تماس با من
          </Title>

          <p
            className="
              lg:text-lg
              text-sm
              font-light
              mo:text-justify
              lg:text-center
              persian
            "
          >
            خوشحال می‌شم نظرت رو بدونم یا اگر پروژه‌ای داشتی، باهام در ارتباط
            باشی.
          </p>
        </div>

        {/* =========================
            FORM
        ========================== */}

        <form
          ref={formRef}
          className="
            max-w-2xl
            mx-auto
            flex
            flex-col
            gap-1.5
          "
          onSubmit={(e) => {
            e.preventDefault();

            alert("فرم ارسال شد!");
          }}
        >
          <input
            type="text"
            placeholder="نام"
            className="
              p-4
              text-sm
              rounded-xl
              bg-[#1a1a1a]
              border
              border-primary
              text-white
            "
            required
          />

          <input
            type="email"
            placeholder="ایمیل"
            className="
              p-4
              text-sm
              rounded-xl
              bg-[#1a1a1a]
              border
              border-primary
              text-white
            "
            required
          />

          <textarea
            placeholder="پیام شما"
            rows={5}
            className="
              p-4
              text-sm
              rounded-xl
              bg-[#1a1a1a]
              border
              border-primary
              text-white
              resize-none
            "
            required
          />

          <button
            type="submit"
            className="
              bg-primary
              my-3
              text-sm
              hover:cursor-pointer
              hover:bg-purple-600
              transition
              rounded-xl
              py-3
              font-bold
            "
          >
            ارسال پیام
          </button>
        </form>

        {/* =========================
            CONTACT INFO
        ========================== */}

        <div
          className="
            text-center
            mt-2
            text-sm
            text-gray-400
            space-y-1
          "
        >
          <p>
            ایمیل:{" "}
            <a
              href="mailto:faeze0078@gmail.com"
              className="
                text-primary
                hover:underline
              "
            >
              faeze0078@gmail.com
            </a>
          </p>

          <p>
            شماره تماس:{" "}
            <a
              href="tel:09930513574"
              className="
                text-primary
                hover:underline
              "
            >
              09930513574
            </a>
          </p>

          <p>لوکیشن: تهران، ایران</p>
        </div>
      </section>
    </div>
  );
};

export default ContactMe;
