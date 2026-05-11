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

const CONTENT_AREA_HEIGHT = 1000;

/* -------------------------------------------------------------------------- */
/*                              MOTION DISTANCE                               */
/* -------------------------------------------------------------------------- */

const CONTENT_Y_ENTER = 80;
const CONTENT_Y_EXIT = -80;

/* -------------------------------------------------------------------------- */
/*                              SPRING CONFIG                                 */
/* -------------------------------------------------------------------------- */

const SMOOTH_SCROLL_CONFIG = {
  stiffness: 170,
  damping: 30,
  mass: 0.55,
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
      {/*                           STICKY WRAPPER                           */}
      {/* ================================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          flex
          items-center
        "
      >
        {/* ================================================================ */}
        {/*                            CONTENT                               */}
        {/* ================================================================ */}

        <div
          className="
            w-full
            max-w-[1500px]
            mx-auto
            px-8
            md:px-14
          "
        >
          <div
            className="
              relative
              w-full
              flex
              items-center
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
                /*                         OPACITY                       */
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
                /*                            Y                          */
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
                      0.985,
                      1,
                      0.985,
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
                      justify-center
                    "
                  >
                    {/* SMALL LABEL */}

                    <div
                      className="
                        text-[22px]
                        md:text-[30px]
                        font-semibold
                        tracking-[-0.04em]
                        text-[#8D8D8D]
                        mb-3
                      "
                    >
                      {block.heading}
                    </div>

                    {/* MAIN TEXT */}

                    <p
                      className="
                        text-[52px]
                        sm:text-[68px]
                        md:text-[82px]
                        lg:text-[96px]
                        xl:text-[108px]

                        leading-[0.9]

                        tracking-[-0.02em]

                        font-medium

                        whitespace-pre-line

                        text-[#F5F2EB]

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