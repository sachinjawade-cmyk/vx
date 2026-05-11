"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const BLOCKS = [
  {
    //label: "Philosophy:",
    heading: "Why.",
    lines: ["People forget information.", "They remember experiences."],
  },
  {
    //label: "Philosophy:",
    heading: "How.",
    lines: ["Don't just present ideas.", "Let people step into them."],
  },
  {
    //label: "Philosophy:",
    heading: "Solutions.",
    lines: [
      "Immersive environments",
      "powered by design, motion, and technology.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                             MOTION CONFIGURATION                           */
/* -------------------------------------------------------------------------- */

const SECTION_HEIGHT = "500vh";
const SCROLL_OFFSET_START = "start -0.55";
const SCROLL_OFFSET_END = "end start";
const SECTION_ENTRY_OFFSET = "-15% 0px -15% 0px";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

const SECTION_ENTRY_INITIAL_Y = 80;
const SECTION_ENTRY_DURATION = 1.4;

const SECTION_BACKGROUND = "#131313";

// Height of each block slot in the vertical rail (px)
const BLOCK_SLOT_HEIGHT = 260;

/* -------------------------------------------------------------------------- */
/*                          VISUAL HIERARCHY CONSTANTS                        */
/* -------------------------------------------------------------------------- */

// Distance thresholds (in scroll-progress units) for color/opacity falloff
const DISTANCE_ACTIVE = 0;
const DISTANCE_NEAR = 0.18;
const DISTANCE_FAR = 0.36;

const OPACITY_ACTIVE = 1;
const OPACITY_NEAR = 0.28;
const OPACITY_FAR = 0.07;

const COLOR_ACTIVE = "#FFFFFF";
const COLOR_NEAR = "#888888";
const COLOR_FAR = "#333333";

/* -------------------------------------------------------------------------- */
/*                              PHILOSOPHY COMPONENT                          */
/* -------------------------------------------------------------------------- */

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  /* ----------------------------- IN-VIEW ENTRY ----------------------------- */

  const isVisible = useInView(stickyRef, { margin: SECTION_ENTRY_OFFSET });

  /* ----------------------------- SCROLL PROGRESS --------------------------- */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [SCROLL_OFFSET_START, SCROLL_OFFSET_END],
  });

  const totalBlocks = BLOCKS.length;
  const segment = 1 / totalBlocks;

  /* ----------------------------- ACTIVE INDEX ------------------------------ */

  const activeIndex = useTransform(scrollYProgress, (p) =>
    Math.min(totalBlocks - 1, Math.floor(p / segment))
  );

  /* ----------------------------- RAIL Y MOTION ----------------------------- */

  // Rail starts with block 0 centered; moves up as scroll advances.
  // We want block `i` to be centered when activeIndex === i.
  // Center offset per block = i * BLOCK_SLOT_HEIGHT (upward movement).
  const railY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      BLOCK_SLOT_HEIGHT * 0,          // block 0 centered at progress=0
      -(BLOCK_SLOT_HEIGHT * (totalBlocks - 1)), // last block centered at progress=1
    ]
  );

  /* -------------------------------------------------------------------------- */

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: SECTION_HEIGHT, background: SECTION_BACKGROUND }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex items-center"
      >
        {/* ----------------------- SECTION ENTRY ANIMATION ------------------- */}

        <motion.div
          initial={{ opacity: 0, y: SECTION_ENTRY_INITIAL_Y }}
          animate={
            isVisible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: SECTION_ENTRY_INITIAL_Y }
          }
          transition={{ duration: SECTION_ENTRY_DURATION, ease: CINEMATIC_EASE }}
          className="w-full"
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_2fr] gap-16 items-center">

            {/* ==================== LEFT : HEADING RAIL ==================== */}

            <div
              className="relative overflow-visible flex items-center"
              style={{ height: `${BLOCK_SLOT_HEIGHT}px` }}
            >
              <motion.div style={{ y: railY }} className="flex flex-col">
                {BLOCKS.map((block, i) => {
                  const itemCenter = i * segment;

                  const distance = useTransform(scrollYProgress, (p) =>
                    Math.abs(p - itemCenter)
                  );

                  const headingOpacity = useTransform(
                    distance,
                    [DISTANCE_ACTIVE, DISTANCE_NEAR, DISTANCE_FAR],
                    [OPACITY_ACTIVE, OPACITY_NEAR, OPACITY_FAR]
                  );

                  const headingColor = useTransform(
                    distance,
                    [DISTANCE_ACTIVE, DISTANCE_NEAR, DISTANCE_FAR],
                    [COLOR_ACTIVE, COLOR_NEAR, COLOR_FAR]
                  );

                  return (
                    <div
                      key={i}
                      style={{ height: `${BLOCK_SLOT_HEIGHT}px` }}
                      className="flex flex-col justify-center"
                    >
                      {/* Label */}
                      <motion.span
                        style={{ opacity: headingOpacity, color: headingColor }}
                        className="text-xs uppercase tracking-[0.2em] mb-3 font-light transition-opacity"
                      >
                        {block.label}
                      </motion.span>

                      {/* Big heading */}
                      <motion.h2
                        style={{ opacity: headingOpacity, color: headingColor }}
                        className="text-[clamp(4rem,10vw,8rem)] leading-none font-semibold tracking-[-0.04em]"
                      >
                        {block.heading}
                      </motion.h2>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* ==================== RIGHT : BODY-COPY RAIL ==================== */}

            <div
              className="relative overflow-visible flex items-center"
              style={{ height: `${BLOCK_SLOT_HEIGHT}px` }}
            >
              <motion.div style={{ y: railY }} className="flex flex-col">
                {BLOCKS.map((block, i) => {
                  const itemCenter = i * segment;

                  const distance = useTransform(scrollYProgress, (p) =>
                    Math.abs(p - itemCenter)
                  );

                  const bodyOpacity = useTransform(
                    distance,
                    [DISTANCE_ACTIVE, DISTANCE_NEAR, DISTANCE_FAR],
                    [OPACITY_ACTIVE, OPACITY_NEAR, OPACITY_FAR]
                  );

                  const bodyColor = useTransform(
                    distance,
                    [DISTANCE_ACTIVE, DISTANCE_NEAR, DISTANCE_FAR],
                    [COLOR_ACTIVE, COLOR_NEAR, COLOR_FAR]
                  );

                  return (
                    <div
                      key={i}
                      style={{ height: `${BLOCK_SLOT_HEIGHT}px` }}
                      className="flex flex-col justify-center"
                    >
                      {block.lines.map((line, li) => (
                        <motion.p
                          key={li}
                          style={{ opacity: bodyOpacity, color: bodyColor }}
                          className="text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.025em]"
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
