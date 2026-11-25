import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseScrollDragProps {
  scrollbar: React.RefObject<HTMLDivElement | null>;
  thumb: React.RefObject<HTMLDivElement | null>;
  scrollStart: React.RefObject<number>;
  scrollEnd: React.RefObject<number>;
  scrollTrigger: React.RefObject<any>;
  isRtl?: boolean;
}

export const useScrollDrag = ({
  scrollbar,
  thumb,
  scrollStart,
  scrollEnd,
  isRtl = false,
}: UseScrollDragProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragStartScrollY = useRef(0);

  const onDragMove = useCallback(
    (e: MouseEvent) => {
      if (!thumb.current || !scrollbar.current) {
        return;
      }

      const dx = e.clientX - dragStartX.current;

      const scrollbarWidth = scrollbar.current.clientWidth;
      const thumbWidth = thumb.current.clientWidth;
      const range = scrollbarWidth - thumbWidth;

      if (range <= 0) {
        return;
      }

      const scrollRange = scrollEnd.current - scrollStart.current;

      if (scrollRange <= 0) {
        return;
      }

      const rawStartProgress = Math.max(
        0,
        Math.min(
          1,
          (dragStartScrollY.current - scrollStart.current) / scrollRange,
        ),
      );

      const visualStartProgress = isRtl ? 1 - rawStartProgress : rawStartProgress;

      let newLeft = visualStartProgress * range + dx;
      newLeft = Math.max(0, Math.min(range, newLeft));

      const visualProgress = newLeft / range;
      const progress = isRtl ? 1 - visualProgress : visualProgress;

      const targetScrollY = scrollStart.current + scrollRange * progress;

      window.scrollTo({
        top: targetScrollY,
        behavior: "auto",
      });
    },
    [scrollStart, scrollEnd, scrollbar, thumb, isRtl],
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);

    window.removeEventListener("mousemove", onDragMove);
    window.removeEventListener("mouseup", onDragEnd);
  }, [onDragMove]);

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setIsDragging(true);

      dragStartX.current = e.clientX;
      dragStartScrollY.current =
        window.scrollY || window.pageYOffset;

      window.addEventListener("mousemove", onDragMove);
      window.addEventListener("mouseup", onDragEnd);
    },
    [onDragMove, onDragEnd],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onDragMove);
      window.removeEventListener("mouseup", onDragEnd);
    };
  }, [onDragMove, onDragEnd]);

  return {
    isDragging,
    onDragStart,
  };
};