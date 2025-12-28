"use client"
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeaderLink from "./HeaderLink";
import { useDetectSize } from "@/hooks/shared/useDetectSize";
gsap.registerPlugin(ScrollTrigger)
interface headerProp {
  handleMenuClick: (id: number) => void
  currentSection: number | null
}
const Header: React.FC<headerProp> = ({ handleMenuClick, currentSection }) => {
  const t = useTranslations('header');
  const locale = useLocale();
  const handleClick = (id: number) => {
    handleMenuClick(id)
  }
  const { breakpoint } = useDetectSize()
  return <>
    {
      breakpoint == "sm" || breakpoint == "xs" ? (
        <header className="header  py-1.5 text-en w-full justify-center fixed top-0 left-0 right-0 z-40 ">
          <div className="inner w-[90%] m-auto flex justify-center items-center">
            <div className="logo">
              <Image
                src="/images/logo.png"
                alt="faezeh"
                width={100}
                height={10}
              />
            </div>
            <nav dir={locale == ' fa' ? 'rtl' : 'ltr'} className="menu top-[8dvh]  fixed left-0 right-0 mx-auto
             w-auto flex justify-center items-center">
              <ul dir="rtl" className="desktop-menu w-auto flex gap-6 justify-center items-center">
                <li className={`menu-item group/menu ${  currentSection === 0 ? 'active' : ''} `}>
                  <HeaderLink onClick={() => handleClick(0)} className={`duration-100 group-[&.active]/menu:text-primary`}>
                    {t('nav.home')}
                  </HeaderLink>

                </li>
                {/* <li className={`menu-item ${pathnameWithoutLocale === '/' ? 'active' : ''}`}>
              <Link href={'/'} className="font-normal persian text-lg text-text">
                {t('nav.home')}
              </Link>
              
              
            </li> */}
                <li className={`menu-item  group/menu ${ currentSection === 1 ? 'active' : ''}`}>
                  <HeaderLink toSection={0} onClick={() => handleClick(1)} className={`duration-100 group-[&.active]/menu:text-primary`}>
                    {t('nav.projects')}
                  </HeaderLink>
                </li>
                <li className={`menu-item  group/menu ${ currentSection === 2 ? 'active' : ''}`}>
                  <HeaderLink toSection={1} onClick={() => handleClick(2)} className={`duration-100 group-[&.active]/menu:text-primary`}>
                    {t('nav.about-me')}
                  </HeaderLink>
                </li>
                <li className={`menu-item  group/menu ${ currentSection === 3 ? 'active' : ''}`}>

                  <HeaderLink toSection={2} onClick={() => handleClick(3)} className={`duration-100 group-[&.active]/menu:text-primary`}>
                    {t('nav.contact-me')}
                  </HeaderLink>

                </li>
              </ul>
            </nav>
          </div>

        </header>
      ) : (
        <header className="header  py-1.5 text-en w-full justify-center fixed top-0 left-0 right-0 z-40 ">
          <div className="inner w-[90%] m-auto flex justify-between items-center">
            <div className="logo">
              <Image
                src="/images/logo.png"
                alt="faezeh"
                width={100}
                height={10}
              />
            </div>
            <nav dir={locale == ' fa' ? 'rtl' : 'ltr'} className="menu w-auto flex justify-start items-center">
              <ul dir="rtl" className="desktop-menu w-auto flex gap-6 justify-center items-center">
                <li className={`menu-item group/menu ${ currentSection === -1 ? 'active' : ''} `}>
                {/* <li className={`menu-item group/menu ${activeSection === -1 || currentSection === -1 ? 'active' : ''} `}> */}
                  <HeaderLink onClick={() => handleClick(-1)} className={`duration-100 group-[&.active]/menu:text-primary`}>
                    {t('nav.home')}
                  </HeaderLink>

                </li>
                {/* <li className={`menu-item ${pathnameWithoutLocale === '/' ? 'active' : ''}`}>
              <Link href={'/'} className="font-normal persian text-lg text-text">
                {t('nav.home')}
              </Link>
              
              
            </li> */}
                <li className={`menu-item  group/menu ${currentSection === 0 ? 'active' : ''}`}>
                  <HeaderLink toSection={0} onClick={() => handleClick(0)} className={`duration-100 group-[&.active]/menu:text-primary`}>
                    {t('nav.projects')}
                  </HeaderLink>
                </li>
                <li className={`menu-item  group/menu ${ currentSection === 1 ? 'active' : ''}`}>
                  <HeaderLink toSection={1} onClick={() => handleClick(1)} className={`duration-100 group-[&.active]/menu:text-primary`}>
                    {t('nav.about-me')}
                  </HeaderLink>
                </li>
                <li className={`menu-item  group/menu ${ currentSection === 2 ? 'active' : ''}`}>

                  <HeaderLink toSection={2} onClick={() => handleClick(2)} className={`duration-100 group-[&.active]/menu:text-primary`}>
                    {t('nav.contact-me')}
                  </HeaderLink>

                </li>
              </ul>
            </nav>
          </div>

        </header>
      )
    }

  </>
}
export default Header