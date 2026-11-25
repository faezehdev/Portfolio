// "use client";

// import AboutMe from "./Section3/AboutMe";
// import ContactMe from "./Section4/ContactMe";
// import Slider from "./Seaction2/Slider";
// import { useRef } from "react";
// import { useScrollReveal } from "@/hooks/shared/useScrollReveal";

// const MobileSection = ({
//   children,
//   id,
// }: {
//   children: React.ReactNode;
//   id: string;
// }) => {
//   const ref = useRef<HTMLElement | null>(null);

//   useScrollReveal(ref);

//   return (
//     <section
//       ref={ref}
//       id={id}
//       className="
//         section
//         mobile-section-reveal
//         overflow-hidden
//         flex
//         items-center
//         justify-center
//         text-6xl
//         font-bold
//       "
//     >
//       {children}
//     </section>
//   );
// };

// const MobileContent = () => {
//   return (
//     <>
//       <MobileSection id="section-1">
//         <Slider />
//       </MobileSection>

//       <MobileSection id="section-2">
//         <AboutMe />
//       </MobileSection>

//       <MobileSection id="section-3">
//         <ContactMe />
//       </MobileSection>
//     </>
//   );
// };

// export default MobileContent;

"use client";

import AboutMe from "./Section3/AboutMe";
import ContactMe from "./Section4/ContactMe";
import Slider from "./Seaction2/Slider";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/shared/useScrollReveal";

const MobileSection = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id={id}
      className="
        section
        mobile-section-reveal
        w-full
        overflow-hidden
        flex
        flex-col
        items-center
        justify-center
        font-bold
      "
    >
      {children}
    </section>
  );
};

const MobileContent = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MobileSection id="section-1">
        <Slider />
      </MobileSection>

      <MobileSection id="section-2">
        <AboutMe />
      </MobileSection>

      <MobileSection id="section-3">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <ContactMe />

          <footer
            className="w-[91%] max-w-3xl pt-4 pb-6 border-t
           border-white/10 flex items-center justify-between text-xs font-normal text-white persian"
          >
            <span>ساخته‌شده با ❤️ — تهران</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-primary/20 text-primary transition cursor-pointer"
            >
              بازگشت به بالا ↑
            </button>
          </footer>
        </div>
      </MobileSection>
    </>
  );
};

export default MobileContent;
