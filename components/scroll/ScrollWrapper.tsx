'use client';
import { useDetectSize } from '@/hooks/shared/useDetectSize';
export interface ScrollWrapperHandle {
  scrollToHorizontalProgress: (progress: number) => void;
  scrollToSection: (index: number) => void;
    getContainer: () => HTMLDivElement | null;
    
}
interface ScrollWrapperProps {
  children: ReactNode;
  scrollToId?: string;
  currentSection?: number | null;
setCurrentSection?: (section: number) => void;
  firstSectionRef: React.RefObject<HTMLElement | null>;
}
import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useImperativeHandle,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const ScrollWrapper = forwardRef<ScrollWrapperHandle, ScrollWrapperProps>(
  ({ children, scrollToId ,setCurrentSection ,firstSectionRef }, ref) => {
  const container = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  const scrollbar = useRef<HTMLDivElement | null>(null);
  const thumb = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef(0);
  const dragStartScrollY = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollStart = useRef(0);
  const scrollEnd = useRef(0);
  const scrollTriggerRef = useRef<gsap.core.Tween | null>(null);
  const {breakpoint } = useDetectSize()
  // Expose the scrollToHorizontalProgress method via ref

 
useImperativeHandle(ref, () => ({
  scrollToHorizontalProgress: (progress: number) => {
    if (container.current) {
      const maxScroll = container.current.scrollWidth - container.current.clientWidth;
      container.current.scrollTo({
        left: maxScroll * progress,
        behavior: 'smooth',
      });
    }
  },
  scrollToSection: (index: number) => {
    if (container.current) {
      const sectionWidth = container.current.clientWidth;
      container.current.scrollTo({
        left: sectionWidth * index,
        behavior: 'smooth',
      });
    }
  },
   getContainer: () => container.current 
}));

  // Connect container ref to forwarded ref if needed (optional, remove if not necessary)
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(container.current as any);
    } else if (ref && 'current' in ref) {
      // If ref is not of ScrollWrapperHandle type, this might cause conflict
      // So only do this if you want to expose the DOM element too
      // Otherwise you can remove this whole effect
      // (ref as React.MutableRefObject<HTMLDivElement | null>).current = container.current;
    }
  }, [ref]);

  useEffect(() => {
  if (!container.current || !content.current) return;
ScrollTrigger.normalizeScroll(true);
  const refreshScroll = () => {
    ScrollTrigger.refresh();
  };


  setTimeout(refreshScroll, 200);

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);
useEffect(() => {
   if (!breakpoint) return
    const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
    if(isMobile) return
  if (!container.current || !content.current) return;
  
  const initializeScroll = () => {
    const totalScrollWidth = content.current!.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalScrollWidth - viewportWidth;

    if (scrollDistance <= 0) return;

    const scrollbarWidth = scrollbar.current!.clientWidth;
    const thumbWidth = (viewportWidth / totalScrollWidth) * scrollbarWidth;
    thumb.current!.style.width = `${thumbWidth}px`;
    thumb.current!.style.left = '0px';

    const horizontalAnimation = gsap.to(content.current, {
      x: () => `-${scrollDistance}px`,
      ease: 'none',
      duration: 1,
    });

    ScrollTrigger.create({
      id: 'horizontal-scroll',
      animation: horizontalAnimation,
      trigger: container.current,
      start: 'top top',
      end: `+=${scrollDistance}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (!thumb.current || !scrollbar.current) return;
        const progress = self.progress;
        const maxThumbPos = scrollbar.current.clientWidth - thumb.current.clientWidth;
        thumb.current.style.left = `${progress * maxThumbPos}px`;

        const totalSections = 3;
        const currentSection = Math.round(self.progress * (totalSections - 1));
        console.log('currentSection',currentSection);
        
        if (setCurrentSection) {
          setCurrentSection(currentSection);
        }
      },
      onLeaveBack: () => {
        gsap.to(content.current, {
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });

    scrollStart.current = horizontalAnimation.scrollTrigger!.start;
    scrollEnd.current = horizontalAnimation.scrollTrigger!.end;
    scrollTriggerRef.current = horizontalAnimation;
  };

  // تأخیر برای اطمینان از بارگذاری کامل DOM
  setTimeout(initializeScroll, 100);

  return () => {
    if(setCurrentSection){

    }
     
    scrollTriggerRef.current?.kill();
    ScrollTrigger.getById('horizontal-scroll')?.kill();
  };
}, [breakpoint]);

  useEffect(() => {
       if (!breakpoint) return
    const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
    if(isMobile) return
    const updateThumb = () => {
      if (!content.current || !scrollbar.current || !thumb.current) return;

      const totalScrollWidth = content.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      if (totalScrollWidth <= viewportWidth) {
        thumb.current.style.width = '100%';
        thumb.current.style.left = '0px';
        return;
      }

      const scrollbarWidth = scrollbar.current.clientWidth;
      const thumbWidth = (viewportWidth / totalScrollWidth) * scrollbarWidth;
      thumb.current.style.width = `${thumbWidth}px`;
    };

    updateThumb();
    window.addEventListener('resize', updateThumb);
    return () => window.removeEventListener('resize', updateThumb);
  }, []);

  const scrollToHorizontalProgress = (progress: number) => {
    if (!content.current || !scrollTriggerRef.current) return;

    const totalScrollWidth = content.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalScrollWidth - viewportWidth;

    progress = Math.min(Math.max(progress, 0), 1);

    gsap.to(content.current, {
      x: -scrollDistance * progress,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        ScrollTrigger.refresh();
      },
    });
  };

  const scrollVerticallyToSection = (id: string) => {
    if (!container.current) return;

    const rect = container.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const targetY = rect.top + scrollY;

    gsap.to(window, {
      scrollTo: { y: targetY },
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
  };

  useEffect(() => {
    if (scrollToId) {
      scrollVerticallyToSection(scrollToId);
    }
  }, [scrollToId]);

  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScrollY.current = window.scrollY || window.pageYOffset;

    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
  };

  const onDragMove = useCallback(
    (e: MouseEvent) => {
      if (!thumb.current || !scrollbar.current) return;

      const dx = e.clientX - dragStartX.current;
      const scrollbarWidth = scrollbar.current.clientWidth;
      const thumbWidth = thumb.current.clientWidth;

      let newLeft =
        ((dragStartScrollY.current - scrollStart.current) /
          (scrollEnd.current - scrollStart.current)) *
        (scrollbarWidth - thumbWidth);
      newLeft += dx;

      newLeft = Math.min(Math.max(newLeft, 0), scrollbarWidth - thumbWidth);

      const progress = newLeft / (scrollbarWidth - thumbWidth);
      const scrollRange = scrollEnd.current - scrollStart.current;
      const targetScrollY = scrollStart.current + scrollRange * progress;

      window.scrollTo({ top: targetScrollY, behavior: 'auto' });
    },
    []
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
  }, [onDragMove]);

  return (
    <div
      ref={container}  id="scroll-wrapper" 
      className="md:h-dvh sm:h-[unset] overflow-hidden flex flex-col relative"
    >
      <div ref={content} className="flex gap-10 md:h-full overflow-hidden md:w-max w-full md:flex-row flex-col ">
        {children}
      </div>

      <div
        ref={scrollbar}
        className="absolute h-[3px] bg-gray-300 rounded"
        style={{
          userSelect: isDragging ? 'none' : 'auto',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          position: 'fixed',
          zIndex: 9999,
        }}
      >
        <div
          ref={thumb}
          className="absolute top-0 h-full bg-primary rounded cursor-pointer"
          onMouseDown={onDragStart}
        />
      </div>
    </div>
  );
});

ScrollWrapper.displayName = 'ScrollWrapper';

export default ScrollWrapper;
