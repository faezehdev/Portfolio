
"use client";

import { useLocale } from "next-intl";

const Project = () => {
  const locale = useLocale();

  const isFa = locale === "fa";

  return (
    <div className="group/proj relative my-auto h-full w-full cursor-pointer overflow-hidden rounded-4xl">
      {/* Image */}
      <div className="relative h-full w-full overflow-hidden rounded-4xl">
        <img
          src="/images/proj.jpg"
          alt=""
          className="
            h-full
            w-full
            rounded-4xl
            object-cover
            transition-transform
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]
            group-hover/proj:scale-110
          "
        />

        {/* Dark / purple overlay */}
        <div
          className={`
            absolute
            inset-0
            z-10
            rounded-4xl
            bg-[#be77dc]/80
            backdrop-blur-[2px]

            transform
            transition-transform
            duration-500
            ease-[cubic-bezier(.22,1,.36,1)]

            ${
              isFa
                ? "translate-x-full group-hover/proj:translate-x-0"
                : "-translate-x-full group-hover/proj:translate-x-0"
            }
          `}
        >
          {/* Content */}
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              px-6
            "
          >
            <div
              className="
                translate-y-5
                opacity-0
                transition-all
                delay-150
                duration-500
                ease-out

                group-hover/proj:translate-y-0
                group-hover/proj:opacity-100
              "
            >
              <p
                className="
                  persian
                  text-center
                  text-2xl
                  font-bold
                  text-white
                "
              >
                مبلمان عالیجناب
              </p>

              <div
                className="
                  mx-auto
                  mt-3
                  h-[2px]
                  w-0
                  bg-white
                  transition-all
                  delay-300
                  duration-500
                  group-hover/proj:w-full
                "
              />
            </div>
          </div>
        </div>

        {/* Shine */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            -translate-x-[120%]
            skew-x-[-20deg]
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            transition-transform
            duration-1000
            ease-out
            group-hover/proj:translate-x-[120%]
          "
        />
      </div>
    </div>
  );
};

export default Project;