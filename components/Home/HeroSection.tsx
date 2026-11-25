import { useEffect, useRef } from "react";

import TypingEffect from "../shared/TypingEffect";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef<any>(null);
  const t = useTranslations("heroSection");
  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(`Failed to load ${src}`);
        document.body.appendChild(script);
      });

    const initVanta = async () => {
      try {
        await loadScript("/script/three.min.js");
        await loadScript("/script/vanta.net.min.js");

        if (!(window as any).VANTA || !(window as any).VANTA.NET) {
          console.error("VANTA.NET not available");
          return;
        }

        vantaEffect.current = (window as any).VANTA.NET({
          el: vantaRef.current,
          THREE: (window as any).THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x8d3dae,
          backgroundColor: 0x0a0a0a,
        });
      } catch (err) {
        console.error(err);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="flex justify-center items-center"
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <div
        className="
    soft-glow-card
    soft-glow-pulse
    relative
    z-10
    mx-auto
    flex
    items-center
    justify-center
    w-[200px]
    h-[200px]
    lg:w-[350px]
    lg:h-[350px]
    !rounded-full
    overflow-hidden
  "
      >
        <img
          src="/images/faezeh.png"
          alt="My Cool Image"
          className="w-[90%] h-[90%] rounded-full object-cover"
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          color: "white",
          zIndex: 10,
          fontSize: 24,
          fontWeight: "bold",
        }}
        className="font-[var(--font-Caveat)]"
      >
        <TypingEffect
          texts={[t("text-1"), t("text-2"), t("text-3"), t("text-4")]}
        />
      </div>
    </div>
  );
};

export default HeroSection;
