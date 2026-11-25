"use client";

import type { ProjectData } from "@/app/[locale]/page";
import { useLocale } from "next-intl";
import { useState } from "react";

interface ProjectProps {
  project: ProjectData;
}

const Project = ({ project }: ProjectProps) => {
  const locale = useLocale();
  const isFa = locale === "fa";
  const [imgError, setImgError] = useState(false);

  const imageSrc = project.imageUrl || "/images/proj.jpg";
  const hasValidImage = Boolean(imageSrc) && !imgError;

  const displayTitle =
    isFa && project.titleFa ? project.titleFa : project.title;

  return (
    <div
      className="
        group/proj
        relative
        h-[232px]
        w-[calc(100vw-4rem)]
        max-w-[366px]
        sm:w-[366px]
        cursor-pointer
        overflow-hidden
        rounded-4xl
        bg-gradient-to-br
        from-[#1b1634]
        via-[#2a1f4e]
        to-[#3b235a]
      "
    >
      {/* Image */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-4xl">
        {hasValidImage ? (
          <img
            src={imageSrc}
            alt={displayTitle}
            loading="lazy"
            onError={() => setImgError(true)}
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
        ) : (
          <div className="px-6 text-center select-none">
            <p
              className={`
                text-base
                sm:text-lg
                font-bold
                text-white/90
                ${isFa ? "persian" : ""}
              `}
            >
              {displayTitle}
            </p>
          </div>
        )}

        {/* Dark / purple overlay */}
        <div
          className={`
            absolute
            inset-0
            z-10
            overflow-y-auto
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
              min-h-full
              w-full
              flex-col
              items-center
              justify-center
              gap-3
              px-6
              py-4
              text-center
            "
          >
            <div
              className="
                w-full
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
                className={`
                  lg:text-lg
                  text-base
                  font-bold
                  text-white
                  ${isFa ? "persian" : ""}
                `}
              >
                {displayTitle}
              </p>

              {project.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

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

              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-3 flex items-center justify-center gap-4 text-xs font-medium text-white underline">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live
                    </a>
                  )}
                  {/* {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </a>
                  )} */}
                </div>
              )}
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
