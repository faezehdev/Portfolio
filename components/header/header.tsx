"use client";

import { useLocale, useTranslations } from "next-intl";

import HeaderLink from "./HeaderLink";
import Image from "next/image";
import LanguageSwitcher from "../shared/LanguageSwitcher";
import React from "react";
import { useDetectSize } from "@/hooks/shared/useDetectSize";

interface HeaderProps {
  handleMenuClick: (id: number) => void;
  currentSection: number | null;
}

const Header: React.FC<HeaderProps> = ({ handleMenuClick, currentSection }) => {
  const t = useTranslations("header");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const { breakpoint, mounted } = useDetectSize();

  const isMobile = breakpoint === "sm" || breakpoint === "xs";

  const handleClick = (id: number) => {
    handleMenuClick(id);
  };

  if (!mounted) return null;

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className="
        header
        fixed
        top-0
        left-0
        right-0
        z-40
        w-full
        py-2
        backdrop-blur-md
      "
    >
      <div
        className="
          inner
          m-auto
          flex
          w-[90%]
          items-center
          justify-between
          gap-4
        "
      >
        <div className="logo shrink-0">
          <Image src="/images/logo.png" alt="faezeh" width={100} height={10} />
        </div>

        <div className="flex items-center gap-6">
          {!isMobile && (
            <nav className="menu flex items-center justify-center w-auto">
              <ul
                className="
                  desktop-menu
                  flex
                  w-auto
                  items-center
                  justify-center
                  gap-6
                "
              >
                <li
                  className={`
                    menu-item
                    group/menu
                    ${currentSection === 0 ? "active" : ""}
                  `}
                >
                  <HeaderLink
                    onClick={() => handleClick(0)}
                    className="
                      duration-100
                      group-[&.active]/menu:text-primary
                    "
                  >
                    {t("nav.home")}
                  </HeaderLink>
                </li>

                <li
                  className={`
                    menu-item
                    group/menu
                    ${currentSection === 1 ? "active" : ""}
                  `}
                >
                  <HeaderLink
                    onClick={() => handleClick(1)}
                    className="
                      duration-100
                      group-[&.active]/menu:text-primary
                    "
                  >
                    {t("nav.projects")}
                  </HeaderLink>
                </li>

                <li
                  className={`
                    menu-item
                    group/menu
                    ${currentSection === 2 ? "active" : ""}
                  `}
                >
                  <HeaderLink
                    onClick={() => handleClick(2)}
                    className="
                      duration-100
                      group-[&.active]/menu:text-primary
                    "
                  >
                    {t("nav.about-me")}
                  </HeaderLink>
                </li>

                <li
                  className={`
                    menu-item
                    group/menu
                    ${currentSection === 3 ? "active" : ""}
                  `}
                >
                  <HeaderLink
                    onClick={() => handleClick(3)}
                    className="
                      duration-100
                      group-[&.active]/menu:text-primary
                    "
                  >
                    {t("nav.contact-me")}
                  </HeaderLink>
                </li>
              </ul>
            </nav>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;