"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const BLOCKS = [
  {
    heading: "Why.",
    text: "People forget information. They remember experiences.",
  },
  {
    heading: "How.",
    text: "Don't just present ideas. Let people step into them.",
  },
  {
    heading: "Solution.",
    text: "Immersive environments powered by design, motion, and technology.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               CONFIGURATION                                */
/* -------------------------------------------------------------------------- */

const BACKGROUND_COLOR = "#000000";
const SECTION_HEIGHT = "400vh";
const CONTENT_Y_ENTER = 80;
const CONTENT_Y_EXIT = -80;

const SMOOTH_SCROLL_CONFIG = {
  stiffness: 170,
  damping: 30,
  mass: 0.55,
};

/* -------------------------------------------------------------------------- */
/*                           WORD REVEAL COMPONENT                            */
/* -------------------------------------------------------------------------- */

function WordReveal({
  text,
  progress,
  start,
  center,
  end,
}: {
  text: string;
  progress: ReturnType<typeof useSpring>;
  start: number;
  center: number;
  end: number;
}) {
  const words = text.split(" ");

  return (
    <p className="text-[52px] sm:text-[68px] md:text-[82px] lg:text-[96px] xl:text-[108px] leading-[0.9] tracking-[-0.02em] font-medium text-[#F5F2EB] max-w-[1500px]">
      {words.map((word, i) => {
        const wordStart = start + (i / words.length) * (center - start);
        const wordEnd = wordStart + (center - wordStart) * 0.6;

        const opacity = useTransform(
          progress,
          [wordStart, wordEnd],
          [0, 1]
        );

        const blur = useTransform(
          progress,
          [wordStart, wordEnd],
          [10, 0]
        );

        const y = useTransform(
          progress,
          [wordStart, wordEnd],
          [20, 0]
        );

        // FIX: Use useTransform to create a reactive filter string
        // instead of calling .get() which breaks reactivity
        const filter = useTransform(blur, (v) =>
          v > 0.1 ? `blur(${v}px)` : "none"
        );

        return (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            style={{
              opacity,
              filter,
              y,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function Philosophy() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_CONFIG);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: SECTION_HEIGHT,
        background: BACKGROUND_COLOR,
      }}
    >
      {/* Sticky Wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full max-w-[1500px] mx-auto px-8 md:px-14">
          <div className="relative w-full flex items-center h-[600px]">
            {BLOCKS.map((block, index) => {
              const total = BLOCKS.length;
              const segment = 1 / total;
              const start = index * segment;
              const center = start + segment * 0.5;
              const end = start + segment;

              const opacity = useTransform(
                smoothProgress,
                [start, center, end],
                [0, 1, 0]
              );

              const y = useTransform(
                smoothProgress,
                [start, center, end],
                [CONTENT_Y_ENTER, 0, CONTENT_Y_EXIT]
              );

              const scale = useTransform(
                smoothProgress,
                [start, center, end],
                [0.985, 1, 0.985]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y, scale }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  {/* Label */}
                  <div className="text-[22px] md:text-[30px] font-semibold tracking-[-0.04em] text-[#8D8D8D] mb-6">
                    {block.heading}
                  </div>

                  {/* Word-by-word reveal */}
                  <WordReveal
                    text={block.text}
                    progress={smoothProgress}
                    start={start}
                    center={center}
                    end={end}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}