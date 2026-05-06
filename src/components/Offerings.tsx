"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
  useMotionValueEvent,
} from "framer-motion";

import { useRef } from "react";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const OFFERINGS = [
  {
    title: "Digital Experience",
    image: "digital-experience.png",
  },
  {
    title: "Immersive Experience",
    image: "immersive-experience.png",
  },
  {
    title: "Event & Brand Experiences",
    image: "event-brand-experience.png",
  },
  {
    title: "Simulation-Based Learning",
    image: "simulation-learning.png",
  },
];

/* -------------------------------------------------------------------------- */
/*                             MOTION CONFIGURATION                           */
/* -------------------------------------------------------------------------- */

const SECTION_HEIGHT = "450vh";

const SECTION_ENTRY_OFFSET = "-15% 0px -15% 0px";

const SCROLL_OFFSET_START = "start -0.55";
const SCROLL_OFFSET_END = "end start";

const SECTION_ENTRY_INITIAL_Y = 80;
const SECTION_LABEL_INITIAL_Y = 20;

const SECTION_ENTRY_DURATION = 1.4;
const LABEL_ENTRY_DURATION = 1.2;
const LABEL_ENTRY_DELAY = 0.2;

const CINEMATIC_EASE = [0.22, 1, 0.36, 1];

const IMAGE_ACTIVE_SCALE_REDUCTION = 0.01;
const IMAGE_NEXT_SCALE_START = 1.01;

const ACTIVE_TEXT_OPACITY = 1;
const INACTIVE_TEXT_OPACITY = 0.22;

const ACTIVE_TEXT_COLOR = "#F5F2EB";
const INACTIVE_TEXT_COLOR = "#444444";

const SECTION_BACKGROUND = "#131313";

const OFFERING_VERTICAL_SPACING = 100;

/* -------------------------------------------------------------------------- */
/*                          OFFERING VISUAL HIERARCHY                         */
/* -------------------------------------------------------------------------- */

const ACTIVE_OFFERING_DISTANCE = 0;
const NEAR_OFFERING_DISTANCE = 0.15;
const FAR_OFFERING_DISTANCE = 0.3;

const ACTIVE_OFFERING_OPACITY = 1;
const NEAR_OFFERING_OPACITY = 0.45;
const FAR_OFFERING_OPACITY = 0.15;

const ACTIVE_OFFERING_COLOR = "#F5F2EB";
const NEAR_OFFERING_COLOR = "#666666";
const FAR_OFFERING_COLOR = "#2A2A2A";


/* -------------------------------------------------------------------------- */
/*                                LAYOUT CONFIG                               */
/* -------------------------------------------------------------------------- */

const IMAGE_CONTAINER_CLASSNAME =
  "relative w-full aspect-video lg:aspect-[4/3] overflow-hidden";

const TITLE_CLASSNAME =
  "text-3xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[0.95] font-semibold tracking-[-0.05em] whitespace-nowrap";

const LABEL_CLASSNAME =
  "text-[#7A7A7A] text-sm md:text-base uppercase tracking-[0.18em] mb-8";

/* -------------------------------------------------------------------------- */
/*                               EASING FUNCTION                              */
/* -------------------------------------------------------------------------- */

const cinematicInterpolation = (
  value: number
) => {
  return value * value * (3 - 2 * value);
};

export default function Offerings() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const stickyContainerRef =
    useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------------ */
  /*                             SECTION VISIBILITY                           */
  /* ------------------------------------------------------------------------ */

  const isSectionVisible = useInView(
    stickyContainerRef,
    {
      margin: SECTION_ENTRY_OFFSET,
    }
  );

  /* ------------------------------------------------------------------------ */
  /*                              SCROLL PROGRESS                             */
  /* ------------------------------------------------------------------------ */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [
      SCROLL_OFFSET_START,
      SCROLL_OFFSET_END,
    ],
  });

  const totalOfferings =
    OFFERINGS.length;

  const singleOfferingScrollSegment =
    1 / totalOfferings;

  /* ------------------------------------------------------------------------ */
  /*                              ACTIVE OFFERING                             */
  /* ------------------------------------------------------------------------ */

  const activeOfferingIndex =
    useTransform(
      scrollYProgress,
      (progress) => {
        return Math.min(
          totalOfferings - 1,
          Math.floor(
            progress /
            singleOfferingScrollSegment
          )
        );
      }
    );


  /* ------------------------------------------------------------------------ */
  /*                              IMAGE ANIMATION                             */
  /* ------------------------------------------------------------------------ */

  const currentSegmentProgress =
    useTransform(
      scrollYProgress,
      (progress) => {

        const currentSegmentIndex =
          Math.floor(
            progress /
            singleOfferingScrollSegment
          );

        const currentSegmentStart =
          currentSegmentIndex *
          singleOfferingScrollSegment;

        return (
          (progress -
            currentSegmentStart) /
          singleOfferingScrollSegment
        );
      }
    );

  const getImageAnimationStyles = (
    offeringIndex: number
  ) => {
    const opacity = useTransform(
      [
        currentSegmentProgress,
        activeOfferingIndex,
      ] as MotionValue<any>[],

      ([segmentProgress, currentIndex]: [number, number]) => {

        // HOLD IMAGE initially
        const delayedProgress =
          segmentProgress < 0.55
            ? 0
            : (segmentProgress - 0.55) / 0.45;

        const easedProgress =
          cinematicInterpolation(
            delayedProgress
          );

        // CURRENT IMAGE
        if (currentIndex === offeringIndex) {
          return 1 - easedProgress;
        }

        // NEXT IMAGE
        if (
          currentIndex + 1 ===
          offeringIndex
        ) {
          return easedProgress;
        }

        return 0;
      }
    );

    const scale = useTransform(
      [
        currentSegmentProgress,
        activeOfferingIndex,
      ] as MotionValue<any>[],

      ([segmentProgress, currentIndex]: [number, number]) => {

        // HOLD IMAGE initially
        const delayedProgress =
          segmentProgress < 0.55
            ? 0
            : (segmentProgress - 0.55) / 0.45;

        const easedProgress =
          cinematicInterpolation(
            delayedProgress
          );

        // CURRENT IMAGE
        if (currentIndex === offeringIndex) {
          return (
            1 -
            easedProgress *
            IMAGE_ACTIVE_SCALE_REDUCTION
          );
        }

        // NEXT IMAGE
        if (
          currentIndex + 1 ===
          offeringIndex
        ) {
          return (
            IMAGE_NEXT_SCALE_START -
            easedProgress *
            IMAGE_ACTIVE_SCALE_REDUCTION
          );
        }

        return 1;
      }
    );

    return {
      opacity,
      scale,
    };
  };

  /* ------------------------------------------------------------------------ */
  /*                               TEXT ANIMATION                             */
  /* ------------------------------------------------------------------------ */

  const getTextAnimationStyles = (
    offeringIndex: number
  ) => {
    const opacity = useTransform(
      activeOfferingIndex,
      (currentIndex) => {
        /* ---------------- ACTIVE ---------------- */

        if (
          currentIndex === offeringIndex
        ) {
          return ACTIVE_TEXT_OPACITY;
        }

        /* ---------------- INACTIVE ---------------- */

        return INACTIVE_TEXT_OPACITY;
      }
    );

    const color = useTransform(
      activeOfferingIndex,
      (currentIndex) => {
        /* ---------------- ACTIVE ---------------- */

        if (
          currentIndex === offeringIndex
        ) {
          return ACTIVE_TEXT_COLOR;
        }

        /* ---------------- INACTIVE ---------------- */

        return INACTIVE_TEXT_COLOR;
      }
    );

    return {
      opacity,
      color,
    };
  };

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: SECTION_HEIGHT,
        background:
          SECTION_BACKGROUND,
      }}
    >
      <div
        ref={stickyContainerRef}
        className="sticky top-0 h-screen overflow-hidden flex items-center"
      >
        {/* ---------------- SECTION ENTRY ---------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: SECTION_ENTRY_INITIAL_Y,
          }}
          animate={
            isSectionVisible
              ? {
                opacity: 1,
                y: 0,
              }
              : {
                opacity: 0,
                y:
                  SECTION_ENTRY_INITIAL_Y,
              }
          }
          transition={{
            duration:
              SECTION_ENTRY_DURATION,
            ease: CINEMATIC_EASE,
          }}
          className="w-full"
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">

            {/* ---------------- LEFT SIDE : IMAGE ---------------- */}

            <div
              className={
                IMAGE_CONTAINER_CLASSNAME
              }
            >
              {OFFERINGS.map(
                (
                  offering,
                  offeringIndex
                ) => (
                  <motion.div
                    key={
                      offeringIndex
                    }
                    style={{
                      ...getImageAnimationStyles(
                        offeringIndex
                      ),
                      backfaceVisibility:
                        "hidden",
                    }}
                    className="absolute inset-0 will-change-transform will-change-opacity"
                  >
                    <Image
                      src={`/images/offerings/${offering.image}`}
                      alt={
                        offering.title
                      }
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                )
              )}
            </div>

            {/* ---------------- RIGHT SIDE : TEXT RAIL ---------------- */}

            <div className="relative h-[420px] overflow-visible flex items-center">

              {/* CENTER GUIDE */}
              <div className="absolute top-1/2 left-20 w-full h-px -translate-y-1/2 pointer-events-none opacity-0" />

              <motion.div
                style={{
                  y: useTransform(
                    scrollYProgress,
                    [0, 1],
                    [
                      OFFERING_VERTICAL_SPACING,
                      -(
                        (OFFERINGS.length - 1) *
                        OFFERING_VERTICAL_SPACING
                      ) + OFFERING_VERTICAL_SPACING
                    ]
                  ),
                }}
                className="flex flex-col"
              >
                {OFFERINGS.map((offering, index) => {

                  const itemCenter =
                    index *
                    singleOfferingScrollSegment;

                  const distanceFromActive = useTransform(
                    scrollYProgress,
                    (progress) => {
                      return Math.abs(
                        progress - itemCenter
                      );
                    }
                  );

                  const opacity = useTransform(
                    distanceFromActive,
                    [
                      ACTIVE_OFFERING_DISTANCE,
                      NEAR_OFFERING_DISTANCE,
                      FAR_OFFERING_DISTANCE,
                    ],
                    [
                      ACTIVE_OFFERING_OPACITY,
                      NEAR_OFFERING_OPACITY,
                      FAR_OFFERING_OPACITY,
                    ]
                  );

                  /* -------------------------------------------------------------------------- */
                  /*                                COLOR MOTION                                */
                  /* -------------------------------------------------------------------------- */

                  const color = useTransform(
                    distanceFromActive,
                    [
                      ACTIVE_OFFERING_DISTANCE,
                      NEAR_OFFERING_DISTANCE,
                      FAR_OFFERING_DISTANCE,
                    ],
                    [
                      ACTIVE_OFFERING_COLOR,
                      NEAR_OFFERING_COLOR,
                      FAR_OFFERING_COLOR,
                    ]
                  );

                  return (
                    <motion.div
                      key={index}
                      style={{
                        opacity,
                        color,
                        height: `${OFFERING_VERTICAL_SPACING}px`,
                      }}
                      className="flex items-center"
                    >
                      <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[0.95] font-semibold tracking-[-0.05em] whitespace-nowrap">
                        {offering.title}
                      </h3>
                    </motion.div>
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