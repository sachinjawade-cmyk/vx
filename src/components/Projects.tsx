"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef } from "react";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const headlineLines = [
  //"Four ways",
  "We bring ideas",
  "to life.",
];

/* -------------------------------------------------------------------------- */
/*                             MOTION CONFIGURATION                           */
/* -------------------------------------------------------------------------- */

const SECTION_SCROLL_HEIGHT = "180vh";

const PARALLAX_Y_START = 0;
const PARALLAX_Y_END = -80;

const HEADLINE_INITIAL_Y = 140;
const PARAGRAPH_INITIAL_Y = 30;

const HEADLINE_DURATION = 1.2;
const PARAGRAPH_DURATION = 1;

const HEADLINE_STAGGER_DELAY = 0.12;
const PARAGRAPH_DELAY = 0.45;

const CINEMATIC_EASE = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const SECTION_BACKGROUND = "#131313";

const SECTION_GRADIENT =
  "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 50%, rgba(19, 19, 19, 0.00) 50%, rgba(19, 19, 19, 0.04) 56.5%, rgba(19, 19, 19, 0.13) 62.5%, rgba(19, 19, 19, 0.26) 67.5%, rgba(19, 19, 19, 0.42) 72.5%, rgba(19, 19, 19, 0.58) 77.5%, rgba(19, 19, 19, 0.74) 82.5%, rgba(19, 19, 19, 0.87) 87.5%, rgba(19, 19, 19, 0.96) 93.5%, #131313 100%)";

export default function Projects() {
  const sectionRef = useRef(null);

  /* ------------------------------------------------------------------------ */
  /*                              SECTION VISIBILITY                          */
  /* ------------------------------------------------------------------------ */

  const isInView = useInView(sectionRef, {
    margin: "-20% 0px -20% 0px",
  });

  /* ------------------------------------------------------------------------ */
  /*                              SCROLL PROGRESS                             */
  /* ------------------------------------------------------------------------ */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ------------------------------------------------------------------------ */
  /*                            CINEMATIC PARALLAX                            */
  /* ------------------------------------------------------------------------ */

  const smoothY = useTransform(
    scrollYProgress,
    [0, 1],
    [PARALLAX_Y_START, PARALLAX_Y_END]
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20"
      style={{
        height: SECTION_SCROLL_HEIGHT,
        background: SECTION_BACKGROUND,
      }}
    >
      {/* ------------------------------------------------------------------- */}
      {/*                          STICKY FULLSCREEN                          */}
      {/* ------------------------------------------------------------------- */}

      <div className="sticky top-0 min-h-screen px-6 md:px-24 overflow-hidden flex items-center">

        {/* --------------------------------------------------------------- */}
        {/*                        SECTION TOP GRADIENT                     */}
        {/* --------------------------------------------------------------- */}

        <div
          className="absolute top-0 left-0 w-full h-48 md:h-72 pointer-events-none -translate-y-full"
          style={{
            background: SECTION_GRADIENT,
          }}
        />

        {/* --------------------------------------------------------------- */}
        {/*                           CONTENT WRAPPER                       */}
        {/* --------------------------------------------------------------- */}

        <motion.div
          style={{ y: smoothY }}
          className="max-w-7xl mx-auto relative z-10 w-full"
        >
          {/* ----------------------------------------------------------- */}
          {/*                           HEADLINE                          */}
          {/* ----------------------------------------------------------- */}

          <div className="leading-[0.88] tracking-[-0.06em]">
            {headlineLines.map((line, index) => (
              <div key={index}>
                <motion.h2
                  initial={{
                    y: HEADLINE_INITIAL_Y,
                    opacity: 0,
                  }}
                  animate={
                    isInView
                      ? {
                        y: 0,
                        opacity: 1,
                      }
                      : {
                        y: HEADLINE_INITIAL_Y,
                        opacity: 0,
                      }
                  }
                  transition={{
                    duration: HEADLINE_DURATION,
                    delay:
                      index *
                      HEADLINE_STAGGER_DELAY,
                    ease: CINEMATIC_EASE,
                  }}
                  className="text-[72px] sm:text-[92px] md:text-[120px] lg:text-[160px] font-semibold text-[#F5F2EB] leading-[0.88] tracking-[-0.06em] will-change-transform"
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>

          {/* ----------------------------------------------------------- */}
          {/*                           PARAGRAPH                         */}
          {/* ----------------------------------------------------------- */}

          <motion.p
            initial={{
              opacity: 0,
              y: PARAGRAPH_INITIAL_Y,
            }}
            animate={
              isInView
                ? {
                  opacity: 1,
                  y: 0,
                }
                : {
                  opacity: 0,
                  y: PARAGRAPH_INITIAL_Y,
                }
            }
            transition={{
              duration: PARAGRAPH_DURATION,
              delay: PARAGRAPH_DELAY,
              ease: CINEMATIC_EASE,
            }}
            className="mt-12 max-w-2xl text-lg md:text-2xl leading-[1.45] text-[#D1D1D1]"
          >
            Shaping immersive environments where
            communication becomes experience.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}