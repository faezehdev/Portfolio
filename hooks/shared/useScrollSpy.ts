import { useEffect, useState } from "react";

export function useScrollSpy(
  ids: string[],
  offset = 100,
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting,
        );

        if (!visibleEntries.length) return;

        const mostVisible = visibleEntries.reduce(
          (previous, current) => {
            return current.intersectionRatio >
              previous.intersectionRatio
              ? current
              : previous;
          },
        );

        setActiveId(mostVisible.target.id);
      },
      {
        root: null,

        rootMargin: `-${offset}px 0px -45% 0px`,

        threshold: [
          0,
          0.1,
          0.25,
          0.5,
          0.75,
          1,
        ],
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [ids, offset]);

  return activeId;
}