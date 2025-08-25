'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Title from '@/components/shared/title/Title';
gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

 useEffect(() => {
  const waitForScrollAnimation = () => {
    const containerAnimation = ScrollTrigger.getById('horizontal-scroll')?.animation;

    if (!containerAnimation) {
      setTimeout(waitForScrollAnimation, 100);
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation,
          start: 'left center',
          end: 'right center',
        //   scrub: 1,
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation,
          start: 'left center',
          end: 'right center',
        //   scrub: 1,
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power2.out',
      });
    }, sectionRef);
  };
  waitForScrollAnimation();
  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);

  return (
    <section
      ref={sectionRef}
      className="lg:py-20 lg:px-6 mo:w-[95%] mo:py-4  mx-auto bg-[#0f0f0f] animated-border-box border-[3px]
       border-primary rounded-3xl persian text-white relative w-screen h-dvh flex items-center justify-center"
    >
      <div className="max-w-4xl w-[90%] mx-auto text-center">
        <Title ref={titleRef} tag='h2'>
            درباره من  
        </Title>
   
        <p ref={textRef} className="lg:text-lg text-sm mo:text-justify lg:text-center leading-8 persian font-light">
          من فائزه‌ام، یه توسعه‌دهنده‌ی فرانت‌اند که عاشق خلق تجربه‌های تعاملی و جذاب برای کاربرهاست.
          عاشق یادگیریم و هر روز با اشتیاق یه چیز جدید توی دنیای React و تکنولوژی‌های وب کشف می‌کنم.
          از پروژه‌های واقعی تا چالش‌های فنی، همیشه دنبال فرصتی‌ام که بهتر بشم و بتونم تأثیر بذارم.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
