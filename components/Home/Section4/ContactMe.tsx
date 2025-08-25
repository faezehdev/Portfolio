import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Title from '@/components/shared/title/Title';
gsap.registerPlugin(ScrollTrigger);
interface ContactMeProp{

}
const ContactMe:React.FC<ContactMeProp> = ()=>{
   const sectionRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);

 useEffect(() => {
    const waitForScrollAnimation = () => {
      const containerAnimation = ScrollTrigger.getById('horizontal-scroll')?.animation;
      if (!containerAnimation) {
        setTimeout(waitForScrollAnimation, 100);
        return;
      }

      const ctx = gsap.context(() => {
       gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
        gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation,
          start: 'left center',
          end: 'right center',
          scrub: 1,
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out',
      });
      }, sectionRef);
    };

    waitForScrollAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

 
    return (
        <>
        <div className="contactMe mo:w-[95%] mo:py-4 border-[3px] border-primary rounded-3xl animated-border-box !h-auto pb-4 !max-h-[85%]">
              <section
      ref={sectionRef}
      className=" px-6 text-white persian"
    >
      <div className=" mx-auto text-center flex flex-col justify-center items-center my-10">
           <Title ref={titleRef} tag='h3'>
        تماس با من
        </Title>
    
        <p className="lg:text-lg text-sm font-light mo:text-justify lg:text-center persian">
          خوشحال می‌شم نظرت رو بدونم یا اگر پروژه‌ای داشتی، باهام در ارتباط باشی.
        </p>
      </div>

      <form
        ref={formRef}
        className="max-w-2xl mx-auto flex flex-col gap-1.5 "
        onSubmit={(e) => {
          e.preventDefault();
          // ارسال فرم اینجا
          alert('فرم ارسال شد!');
        }}
      >
        <input
          type="text"
          placeholder="نام"
          className="p-4 text-sm rounded-xl bg-[#1a1a1a] border border-primary text-white"
          required
        />
        <input
          type="email"
          placeholder="ایمیل"
          className="p-4  text-sm  rounded-xl bg-[#1a1a1a] border border-primary text-white"
          required
        />
        <textarea
          placeholder="پیام شما"
          rows={5}
          style={{resize:'none'}}
          className="p-4 resize-[none] text-sm  rounded-xl bg-[#1a1a1a] border border-primary text-white"
          required
        />
        <button
          type="submit"
          className="bg-primary my-3 text-sm hover:cursor-pointer hover:bg-purple-600 transition rounded-xl py-3 font-bold"
        >
          ارسال پیام
        </button>
      </form>
<div className="text-center mt-2 text-sm text-gray-400 space-y-1">
  <p>
    ایمیل:{" "}
    <a
      href="mailto:faeze0078@gmail.com"
      className="text-primary hover:underline"
    >
      faeze0078@gmail.com
    </a>
  </p>
  <p>
    شماره تماس:{" "}
    <a
      href="tel:09930513574"
      className="text-primary hover:underline"
    >
      09930513574
    </a>
  </p>
  <p>لوکیشن: تهران، ایران</p>
</div>

    </section>
        </div>
        </>
    )
}
export default ContactMe