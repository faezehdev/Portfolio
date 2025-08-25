'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!smoother.current) {
      smoother.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 2,
        effects: true,
      });
    }

    ScrollTrigger.refresh();

    return () => {
      smoother.current?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" className=' w-full'>
      <div id="smooth-content" className=''>{children}</div>
      {/* <div id="smooth-content" className='mo:w-full mo:flex mo:flex-col lg:flex-row mo:gap-[4em]'>{children}</div> */}
    </div>
  );
}
