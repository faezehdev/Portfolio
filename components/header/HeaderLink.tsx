
// export default HeaderLink;
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useDetectSize } from '@/hooks/shared/useDetectSize';
gsap.registerPlugin(ScrollToPlugin);
type Props = {
  children: React.ReactNode;
  toSection?: number;
  toSectionId?: string;
  scrollWrapperId?: string;
  onClick?: () => void;
  className: string
};

const HeaderLink = ({
  children,
  toSection,
  toSectionId,
  scrollWrapperId = 'scroll-wrapper',
  onClick,
  className
}: Props) => {
  const positions = useRef<{ [key: string]: number }>({});
    const { breakpoint } = useDetectSize()
const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  useEffect(() => {
    const scrollWrapper = document.getElementById(isMobile ? 'smooth-content' : scrollWrapperId);
    console.log(scrollWrapper,'scrollWrapper');
    
    if (!scrollWrapper) return;
    const isVertical = window.innerWidth <= 768;
    const rect = scrollWrapper.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const absoluteY = rect.top + scrollY;
    const sectionWidth =
    
      scrollWrapper.querySelector('.section')?.clientWidth || window.innerWidth;
    scrollWrapper.querySelectorAll('.section').forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (isVertical) {
         console.log('isVertical',isVertical)
         const extraOffset = i === 1 || i === 2 ? 400 : 0;
           ;
        positions.current[i] = window.scrollY + rect.top +extraOffset;
      } else {
        positions.current[i] = absoluteY + i * sectionWidth;
      
      }
    });

    if (toSectionId) {
       console.log('toSectionId',toSectionId)
      const elem = document.getElementById(toSectionId);
      if (elem) {
        const rect = elem.getBoundingClientRect();
        positions.current[toSectionId] = window.scrollY + rect.top - 50;
      }
    }

    console.log('🔍 Stored positions:', positions.current);
  }, [toSection, toSectionId, scrollWrapperId]);

  const handleClick = () => {
    let targetScroll = 0;

 
    if (typeof toSection === 'number') {
      targetScroll = positions.current[toSection] ?? 0;
    } else if (toSectionId) {
      targetScroll = positions.current[toSectionId] ?? 0;
    }

    gsap.to(window, {
      scrollTo: { y: targetScroll },
      duration: 1,
      ease: 'power2.out',
    });
    if (onClick) {
      onClick(); 
    }
  };

  return (
    <button onClick={handleClick} className={`font-normal persian text-lg text-text ${className}`}>
      {children}
    </button>
  );
};

export default HeaderLink;
