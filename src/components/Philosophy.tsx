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
    text: "People forget information.\nThey remember experiences.",
  },

  {
    heading: "How.",
    text: "Don't just present ideas.\nLet people step into them.",
  },

  {
    heading: "Solution.",
    text: "Immersive environments\npowered by design, motion,\nand technology.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               CONFIGURATION                                */
/* -------------------------------------------------------------------------- */

const BACKGROUND_COLOR = "#131313";

const SECTION_HEIGHT = "400vh";

const STICKY_HEIGHT = "100vh";

const CONTENT_AREA_HEIGHT = 900;

/*
  Motion distances
*/

const CONTENT_Y_ENTER = 120;
const CONTENT_Y_EXIT = -120;

/* -------------------------------------------------------------------------- */
/*                              SPRING CONFIG                                 */
/* -------------------------------------------------------------------------- */

const SMOOTH_SCROLL_CONFIG = {
  stiffness: 180,
  damping: 32,
  mass: 0.6,
};

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

export default function Philosophy() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------------------- */
  /*                           SCROLL PROGRESS                              */
  /* ---------------------------------------------------------------------- */

  const { scrollYProgress } =
    useScroll({
      target: containerRef,

      offset: [
        "start start",
        "end end",
      ],
    });

  /* ---------------------------------------------------------------------- */
  /*                           SMOOTH SCROLL                                */
  /* ---------------------------------------------------------------------- */

  const smoothProgress =
    useSpring(
      scrollYProgress,
      SMOOTH_SCROLL_CONFIG
    );

  /* ---------------------------------------------------------------------- */
  /*                                  JSX                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height:
          SECTION_HEIGHT,

        background:
          BACKGROUND_COLOR,
      }}
    >
      {/* ================================================================== */}
      {/*                           STICKY WRAPPER                            */}
      {/* ================================================================== */}

      <div
        className="
          sticky
          top-0
          overflow-hidden
        "
        style={{
          height: STICKY_HEIGHT,
        }}
      >
        <div
          className="
            w-full
            max-w-[1400px]
            mx-auto
            px-10
            md:px-16
            flex
            items-start
            justify-center
            pt-[12vh]
          "
        >
          {/* ============================================================ */}
          {/*                         CONTENT                              */}
          {/* ============================================================ */}

          <div
            className="
              relative
              overflow-hidden
              flex
              items-start
              w-full
            "
            style={{
              height:
                CONTENT_AREA_HEIGHT,
            }}
          >
            {BLOCKS.map(
              (
                block,
                index
              ) => {
                const total =
                  BLOCKS.length;

                const segment =
                  1 / total;

                const start =
                  index * segment;

                const center =
                  start +
                  segment * 0.5;

                const end =
                  start +
                  segment;

                /* ------------------------------------------------------ */
                /*                       OPACITY                         */
                /* ------------------------------------------------------ */

                const opacity =
                  useTransform(
                    smoothProgress,
                    [
                      start,
                      center,
                      end,
                    ],
                    [0, 1, 0]
                  );

                /* ------------------------------------------------------ */
                /*                           Y                           */
                /* ------------------------------------------------------ */

                const y =
                  useTransform(
                    smoothProgress,
                    [
                      start,
                      center,
                      end,
                    ],
                    [
                      CONTENT_Y_ENTER,
                      0,
                      CONTENT_Y_EXIT,
                    ]
                  );

                /* ------------------------------------------------------ */
                /*                         SCALE                         */
                /* ------------------------------------------------------ */

                const scale =
                  useTransform(
                    smoothProgress,
                    [
                      start,
                      center,
                      end,
                    ],
                    [
                      0.98,
                      1,
                      0.98,
                    ]
                  );

                return (
                  <motion.div
                    key={index}
                    style={{
                      opacity,
                      y,
                      scale,
                    }}
                    className="
                      absolute
                      inset-0
                      flex
                      flex-col
                      justify-start
                      pt-[140px]
                    "
                  >
                    {/* SMALL LABEL */}

                    <div
                      className="
                        text-[22px]
                        md:text-[28px]
                        font-semibold
                        tracking-[-0.03em]
                        text-[#F0F0E5]
                        mb-2
                      "
                    >
                      {block.heading}
                    </div>

                    {/* MAIN TEXT */}

                    <p
                      className="
                        text-[44px]
                        sm:text-[58px]
                        md:text-[72px]
                        lg:text-[84px]
                        xl:text-[92px]
                        leading-[0.9]
                        tracking-[-0.02em]
                        font-medium
                        whitespace-pre-line
                        text-[#F0F0E5]
                        max-w-[1500px]
                      "
                    >
                      {block.text}
                    </p>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}