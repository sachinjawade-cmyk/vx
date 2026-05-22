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

const HEADLINE_LINES = ["We bring ideas", "to life."];

const HEADLINE_PARAGRAPH =
  "Shaping immersive environments where communication becomes experience.";

const PHILOSOPHY_BLOCKS = [
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

const BACKGROUND_COLOR = "#FFFFFF";
const SECTION_HEIGHT = "600vh"; // 4 segments × 150vh each

const SMOOTH_SCROLL_CONFIG = {
  stiffness: 170,
  damping: 30,
  mass: 0.55,
};

// 4 equal segments: [0] headline, [1] Why, [2] How, [3] Solution
const TOTAL_SEGMENTS = 1 + PHILOSOPHY_BLOCKS.length; // 4
const SEG = 1 / TOTAL_SEGMENTS; // 0.25

/* -------------------------------------------------------------------------- */
/*                           WORD REVEAL COMPONENT                            */
/* -------------------------------------------------------------------------- */

function WordReveal({
  text,
  progress,
  start,
  center,
  className,
}: {
  text: string;
  progress: ReturnType<typeof useSpring>;
  start: number;
  center: number;
  className: string;
}) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, i) => {
        const wordStart = start + (i / words.length) * (center - start);
        const wordEnd = wordStart + (center - wordStart) * 0.6;

        const opacity = useTransform(progress, [wordStart, wordEnd], [0, 1]);
        const blur = useTransform(progress, [wordStart, wordEnd], [10, 0]);
        const y = useTransform(progress, [wordStart, wordEnd], [20, 0]);
        const filter = useTransform(blur, (v) =>
          v > 0.1 ? `blur(${v}px)` : "none"
        );

        return (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            style={{ opacity, filter, y }}
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

export default function Projects() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_CONFIG);

  /* ---- Headline block: segment 0 (0 → SEG) ---- */
  const hStart = 0;
  const hCenter = SEG * 0.45;
  const hEnd = SEG;

  const headlineOpacity = useTransform(
    smoothProgress,
    [hStart, hStart + 0.02, hCenter, hEnd * 0.85, hEnd],
    [0, 1, 1, 1, 0]
  );
  const headlineY = useTransform(
    smoothProgress,
    [hStart, hCenter, hEnd],
    [80, 0, -80]
  );
  const headlineScale = useTransform(
    smoothProgress,
    [hStart, hCenter, hEnd],
    [1, 1, 1]
  );

  // Sub-paragraph fades in after the headline words have revealed
  const paraOpacity = useTransform(
    smoothProgress,
    [hCenter * 0.65, hCenter, hEnd * 0.8, hEnd + 0.5],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: SECTION_HEIGHT,
        background: BACKGROUND_COLOR,
      }}
    >
      {/* ======================= STICKY VIEWPORT ======================= */}

      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full max-w-[1500px] mx-auto px-8 md:px-14">
          <div className="relative w-full flex items-center h-[600px]">

            {/* ================= BLOCK 0: HEADLINE ================= */}

            <motion.div
              style={{
                opacity: headlineOpacity,
                y: headlineY,
                scale: headlineScale,
              }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              {/* Word-by-word reveal for each headline line */}
              <div className="leading-[0.88] tracking-[-0.06em]">
                {HEADLINE_LINES.map((line, lineIdx) => (
                  <WordReveal
                    key={lineIdx}
                    text={line}
                    progress={smoothProgress}
                    start={hStart + lineIdx * 0.025}
                    center={hCenter + lineIdx * 0.012}
                    className="text-[72px] sm:text-[92px] md:text-[120px] lg:text-[160px] font-semibold text-[#131313] leading-[0.88] tracking-[-0.06em]"
                  />
                ))}
              </div>

              {/* Sub-paragraph */}
              <motion.p
                style={{ opacity: paraOpacity }}
                className="mt-10 max-w-4xl text-lg md:text-2xl leading-[1.45] text-[#A47764]"
              >
                {HEADLINE_PARAGRAPH}
              </motion.p>
            </motion.div>

            {/* ================= BLOCKS 1–3: PHILOSOPHY ================= */}

            {PHILOSOPHY_BLOCKS.map((block, index) => {
              const start = SEG * (index + 1);
              const center = start + SEG * 0.5;
              const end = start + SEG;

            const opacity = useTransform(
                smoothProgress,
                [
                  start,
                  center - 0.1,
                  center,
                  center + 0.1,
                  end
                ],
                [0, 1, 1, 1, 0]
              );
              const y = useTransform(
                smoothProgress,
                [start, center, end],
                [20, 0, -200]
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
                  <div className="text-[22px] md:text-[30px] italic font-semibold tracking-[-0.04em] text-[#A47764] mb-6">
                    {block.heading}
                  </div>  

                  {/* Word-by-word reveal */}
                  <WordReveal
                    text={block.text}
                    progress={smoothProgress}
                    start={start}
                    center={center}
                    className="text-[45px] sm:text-[68px] md:text-[82px] lg:text-[96px] xl:text-[108px] leading-[0.9] tracking-[-0.02em] font-medium text-[#131313] max-w-[1300px]"
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