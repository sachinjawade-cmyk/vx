"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
} from "framer-motion";

import { useRef, useCallback, useState } from "react";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface Offering {
  title: string;
  description: string;
  image: string;
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const OFFERINGS: Offering[] = [
  {
    title: "Immersive Experience Centres",
    description:
      "Permanent spaces that tell stories, engage visitors, and leave a lasting impact.",
    image: "immersive-experience.png",
  },
  {
    title: "Simulation-Based Learning",
    description:
      "Immersive training that replaces dangerous or expensive physical practice.",
    image: "simulation-learning.png",
  },
  {
    title: "Event & Brand Activation",
    description:
      "Immersive brand moments for events, expos, and product launches.",
    image: "event-brand-experience.png",
  },
  {
    title: "Digital Experiences",
    description:
      "Websites and digital environments built with 3D, motion and immersive storytelling.",
    image: "digital-experiences.png",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  SETTINGS                                  */
/* -------------------------------------------------------------------------- */

const ITEM_COUNT = OFFERINGS.length;
const SECTION_HEIGHT_VH = 400;
const EASE = [0.22, 1, 0.36, 1] as const;

const TEXT_CONTAINER_HEIGHT = 420;
const DESC_CONTAINER_HEIGHT = 120;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function Offerings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const isInView = useInView(stickyRef, {
    margin: "-10% 0px -10% 0px",
  });

  /* ------------------------------------------------------------------------ */
  /*                            SCROLL PROGRESS                               */
  /* ------------------------------------------------------------------------ */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ------------------------------------------------------------------------ */
  /*                     SNAP TO SLIDE ON SCROLL                              */
  /* ------------------------------------------------------------------------ */

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      ITEM_COUNT - 1,
      Math.floor(latest * ITEM_COUNT)
    );
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  /* ------------------------------------------------------------------------ */
  /*                            NAVIGATION                                     */
  /* ------------------------------------------------------------------------ */

  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current) return;

    const sectionTop = containerRef.current.offsetTop;
    const sectionHeight = containerRef.current.offsetHeight;
    const clampedIndex = Math.min(index, ITEM_COUNT - 1);
    const targetScroll = sectionTop + (sectionHeight * clampedIndex) / ITEM_COUNT;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                         REDUCED MOTION                                    */
  /* ------------------------------------------------------------------------ */

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const transitionConfig = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.2, ease: EASE };

  const imageTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.2, ease: EASE };

  const textTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, delay: 0.15, ease: EASE };

  /* ------------------------------------------------------------------------ */
  /*                              RENDER                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <section
      ref={containerRef}
      className="relative bg-[#131313]"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Our offerings"
      role="region"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 40 }
          }
          transition={transitionConfig}
          className="w-full h-full"
        >
          {/* FULL SCREEN CONTAINER */}
          <div className="relative w-full h-full overflow-hidden bg-black">
            {/* =========================================================== */}
            {/*                    FULL-SCREEN FADE + SCALE IMAGES          */}
            {/* =========================================================== */}

            <div className="absolute inset-0">
              {OFFERINGS.map((offering, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={offering.title}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.15,
                    }}
                    transition={imageTransition}
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={`/images/offerings/${offering.image}`}
                      alt={offering.title}
                      fill
                      priority={index === 0 || index === 1}
                      loading={index <= 1 ? "eager" : "lazy"}
                      sizes="100vw"
                      quality={90}
                      className="object-cover object-center"
                    />

                    {/* Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 45%, transparent 100%),
                          linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 35%),
                          rgba(0,0,0,0.1)
                        `,
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* =========================================================== */}
            {/*                         TOP CTA                           */}
            {/* =========================================================== */}

            <div className="absolute top-10 right-12 z-30">
              <button
                className="flex items-center gap-3 text-white text-[0.95rem] font-medium tracking-[-0.03em] transition-opacity duration-300 hover:opacity-70 cursor-pointer"
                aria-label="View all services"
                onClick={() => {
                  /* Add navigation logic */
                }}
              >
                See all services
                <span className="text-lg" aria-hidden="true">→</span>
              </button>
            </div>

            {/* =========================================================== */}
            {/*                         MAIN CONTENT                        */}
            {/* =========================================================== */}

            <div className="relative z-20 h-full flex flex-col justify-between">
              {/* ======================================================= */}
              {/*                         TEXT AREA                      */}
              {/* ======================================================= */}

              <div className="flex-1 flex items-end">
                <div className="w-full px-10 md:px-14 lg:px-20 pb-28">
                  {/* Counter */}
                  <div
                    className="mb-8 text-white/70 text-[1rem] font-medium"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span className="tabular-nums">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(ITEM_COUNT).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title - Fade + slide up */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: TEXT_CONTAINER_HEIGHT }}
                  >
                    {OFFERINGS.map((offering, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <motion.h2
                          key={offering.title}
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 30,
                          }}
                          transition={textTransition}
                          className="absolute inset-0 max-w-[600px] text-white text-[clamp(3rem,5.5vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em]"
                        >
                          {offering.title}
                        </motion.h2>
                      );
                    })}
                  </div>

                  {/* Description - Fade + slide up */}
                  <div
                    className="relative overflow-hidden mt-2"
                    style={{ height: DESC_CONTAINER_HEIGHT }}
                  >
                    {OFFERINGS.map((offering, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <motion.p
                          key={offering.title}
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 20,
                          }}
                          transition={{
                            ...textTransition,
                            delay: isActive ? 0.25 : 0,
                          }}
                          className="absolute max-w-[500px] text-white/90 text-[1.1rem] md:text-[1.2rem] leading-[1.5]"
                        >
                          {offering.description}
                        </motion.p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ======================================================= */}
              {/*                       BOTTOM NAV                       */}
              {/* ======================================================= */}

              <div className="relative z-30 px-10 md:px-14 lg:px-20 pb-10">
                <div className="grid grid-cols-4 gap-8">
                  {OFFERINGS.map((offering, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <motion.button
                        key={offering.title}
                        onClick={() => scrollToIndex(index)}
                        className="relative text-left cursor-pointer group"
                        aria-label={`Go to ${offering.title}`}
                      >
                        <motion.div
                          animate={{ opacity: isActive ? 1 : 0.2 }}
                          transition={{ duration: 0.3 }}
                          className="h-px mb-4 bg-white transition-transform duration-300 group-hover:scale-x-105 origin-left"
                        />
                        <motion.div
                          animate={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)" }}
                          transition={{ duration: 0.3 }}
                          className="text-[0.95rem] font-medium tracking-[-0.03em] transition-colors duration-300"
                        >
                          {offering.title}
                        </motion.div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================= */}
              {/*                         CTA BUTTON                     */}
              {/* ======================================================= */}

              <div className="absolute right-10 md:right-14 lg:right-20 bottom-24 z-30">
                <button
                  className="w-[62px] h-[62px] rounded-full bg-[#A5A5A5] flex items-center justify-center text-white text-[2rem] transition-transform duration-300 hover:scale-105 cursor-pointer"
                  aria-label="Learn more about this offering"
                  onClick={() => {
                    /* Add navigation logic */
                  }}
                >
                  ↗
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}