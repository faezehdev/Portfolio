"use client";

import React, { useState } from "react";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  const targetLocale = locale === "fa" ? "en" : "fa";

  const handleToggleLocale = () => {
    if (!pathname || isNavigating) return;

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && (segments[0] === "fa" || segments[0] === "en")) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }

    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const nextUrl = `/${segments.join("/")}${search}${hash}`;

    setIsNavigating(true);
    window.location.assign(nextUrl);
  };

  return (
    <button
      type="button"
      onClick={handleToggleLocale}
      disabled={isNavigating}
      aria-label={
        locale === "fa"
          ? "تغییر زبان به انگلیسی"
          : "Switch language to Persian"
      }
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-primary/40
        bg-dark/90
        px-3
        py-1.5
        text-xs
        font-medium
        text-text-white
        transition
        hover:border-purple/70
        hover:bg-primary/15
        disabled:opacity-60
        cursor-pointer
      "
    >
      <span className="h-2 w-2 rounded-full bg-purple" />
      <span>{locale === "fa" ? "EN" : "FA"}</span>
    </button>
  );
};

export default LanguageSwitcher;