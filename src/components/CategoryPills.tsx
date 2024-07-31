import React, {useEffect, useRef, useState} from "react";
import {Button} from "./Button";
import {ChevronLeft, ChevronRight} from "lucide-react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMMOUNT = 200;

function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) return;
    const observer = new ResizeObserver((entries) => {
      const container = containerRef.current;
      if (container === null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{transform: `translateX(-${translate}px)`}}>
        {categories.map((cat, index) => (
          <Button
            onClick={() => onSelect(cat)}
            key={index + 1}
            variant={selectedCategory === cat ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap">
            {cat}
          </Button>
        ))}
      </div>
      {/*left side arrows */}
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5">
            <ChevronLeft />
          </Button>
        </div>
      )}
      {/*right side arrows */}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent  w-24 flex justify-end h-full">
          <Button
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current === null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_AMMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge + width;
                }
                return newTranslate;
              });
            }}
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5">
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryPills;
