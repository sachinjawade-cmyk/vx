"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

import { useRef, useCallback } from "react";
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
const SECTION_HEIGHT_VH = 450;
const EASE = [0.22, 1, 0.36, 1] as const;

const TEXT_CONTAINER_HEIGHT = 420;
const DESC_CONTAINER_HEIGHT = 120;
const CARD_MAX_WIDTH = 1680;
const CARD_WIDTH_PCT = 94;
const CARD_HEIGHT_VH = 82;
const GRADIENT_LEFT_WIDTH = "55%";

/* -------------------------------------------------------------------------- */
/*                            CUSTOM HOOKS                                    */
/* -------------------------------------------------------------------------- */

/**
 * Pre-computes ALL motion values at the top level.
 * For 4 slides, we create explicit transforms for each property.
 */
function useSlideMotionValues(currentSlide: ReturnType<typeof useTransform<number, number>>) {
  /* ----------------------- IMAGE SLIDE POSITIONS -------------------------- */
  // Slide 0
  const imgX0 = useTransform(currentSlide, (v) => `${(0 - v) * 100}%`);
  const imgScale0 = useTransform(currentSlide, (v) => Math.abs(0 - v) < 0.5 ? 1 : 0.92);
  const imgOpacity0 = useTransform(currentSlide, (v) => Math.abs(0 - v) > 1.5 ? 0 : 1);

  // Slide 1
  const imgX1 = useTransform(currentSlide, (v) => `${(1 - v) * 100}%`);
  const imgScale1 = useTransform(currentSlide, (v) => Math.abs(1 - v) < 0.5 ? 1 : 0.92);
  const imgOpacity1 = useTransform(currentSlide, (v) => Math.abs(1 - v) > 1.5 ? 0 : 1);

  // Slide 2
  const imgX2 = useTransform(currentSlide, (v) => `${(2 - v) * 100}%`);
  const imgScale2 = useTransform(currentSlide, (v) => Math.abs(2 - v) < 0.5 ? 1 : 0.92);
  const imgOpacity2 = useTransform(currentSlide, (v) => Math.abs(2 - v) > 1.5 ? 0 : 1);

  // Slide 3
  const imgX3 = useTransform(currentSlide, (v) => `${(3 - v) * 100}%`);
  const imgScale3 = useTransform(currentSlide, (v) => Math.abs(3 - v) < 0.5 ? 1 : 0.92);
  const imgOpacity3 = useTransform(currentSlide, (v) => Math.abs(3 - v) > 1.5 ? 0 : 1);

  /* ----------------------- TEXT SLIDE POSITIONS --------------------------- */
  // Title X positions
  const titleX0 = useTransform(currentSlide, (v) => `${(0 - v) * 60}px`);
  const titleX1 = useTransform(currentSlide, (v) => `${(1 - v) * 60}px`);
  const titleX2 = useTransform(currentSlide, (v) => `${(2 - v) * 60}px`);
  const titleX3 = useTransform(currentSlide, (v) => `${(3 - v) * 60}px`);

  // Title opacities
  const titleOp0 = useTransform(currentSlide, (v) => Math.abs(0 - v) < 0.5 ? 1 : 0);
  const titleOp1 = useTransform(currentSlide, (v) => Math.abs(1 - v) < 0.5 ? 1 : 0);
  const titleOp2 = useTransform(currentSlide, (v) => Math.abs(2 - v) < 0.5 ? 1 : 0);
  const titleOp3 = useTransform(currentSlide, (v) => Math.abs(3 - v) < 0.5 ? 1 : 0);

  // Description X positions
  const descX0 = useTransform(currentSlide, (v) => `${(0 - v) * 40}px`);
  const descX1 = useTransform(currentSlide, (v) => `${(1 - v) * 40}px`);
  const descX2 = useTransform(currentSlide, (v) => `${(2 - v) * 40}px`);
  const descX3 = useTransform(currentSlide, (v) => `${(3 - v) * 40}px`);

  // Description opacities
  const descOp0 = useTransform(currentSlide, (v) => Math.abs(0 - v) < 0.5 ? 1 : 0);
  const descOp1 = useTransform(currentSlide, (v) => Math.abs(1 - v) < 0.5 ? 1 : 0);
  const descOp2 = useTransform(currentSlide, (v) => Math.abs(2 - v) < 0.5 ? 1 : 0);
  const descOp3 = useTransform(currentSlide, (v) => Math.abs(3 - v) < 0.5 ? 1 : 0);

  /* ----------------------- NAV INDICATORS --------------------------------- */
  const navOp0 = useTransform(currentSlide, (v) => Math.abs(0 - v) < 0.5 ? 1 : 0.2);
  const navOp1 = useTransform(currentSlide, (v) => Math.abs(1 - v) < 0.5 ? 1 : 0.2);
  const navOp2 = useTransform(currentSlide, (v) => Math.abs(2 - v) < 0.5 ? 1 : 0.2);
  const navOp3 = useTransform(currentSlide, (v) => Math.abs(3 - v) < 0.5 ? 1 : 0.2);

  const navCol0 = useTransform(currentSlide, (v) =>
    Math.abs(0 - v) < 0.5 ? "#ffffff" : "rgba(255,255,255,0.35)"
  );
  const navCol1 = useTransform(currentSlide, (v) =>
    Math.abs(1 - v) < 0.5 ? "#ffffff" : "rgba(255,255,255,0.35)"
  );
  const navCol2 = useTransform(currentSlide, (v) =>
    Math.abs(2 - v) < 0.5 ? "#ffffff" : "rgba(255,255,255,0.35)"
  );
  const navCol3 = useTransform(currentSlide, (v) =>
    Math.abs(3 - v) < 0.5 ? "#ffffff" : "rgba(255,255,255,0.35)"
  );

  return {
    images: {
      x: [imgX0, imgX1, imgX2, imgX3],
      scale: [imgScale0, imgScale1, imgScale2, imgScale3],
      opacity: [imgOpacity0, imgOpacity1, imgOpacity2, imgOpacity3],
    },
    titles: {
      x: [titleX0, titleX1, titleX2, titleX3],
      opacity: [titleOp0, titleOp1, titleOp2, titleOp3],
    },
    descriptions: {
      x: [descX0, descX1, descX2, descX3],
      opacity: [descOp0, descOp1, descOp2, descOp3],
    },
    nav: {
      opacity: [navOp0, navOp1, navOp2, navOp3],
      color: [navCol0, navCol1, navCol2, navCol3],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function Offerings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(stickyRef, {
    margin: "-10% 0px -10% 0px",
  });

  /* ------------------------------------------------------------------------ */
  /*                            SCROLL PROGRESS                               */
  /* ------------------------------------------------------------------------ */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* ------------------------------------------------------------------------ */
  /*                     SLIDE POSITION BASED ON SCROLL                       */
  /* ------------------------------------------------------------------------ */

  const currentSlide = useTransform(scrollYProgress, (v) => v * ITEM_COUNT);

  // Counter text
  const counterText = useTransform(scrollYProgress, (v) => {
    const index = Math.min(ITEM_COUNT - 1, Math.floor(v * ITEM_COUNT));
    return `${String(index + 1).padStart(2, "0")} / ${String(ITEM_COUNT).padStart(2, "0")}`;
  });

  /* ------------------------------------------------------------------------ */
  /*                     PRE-COMPUTED MOTION VALUES                           */
  /* ------------------------------------------------------------------------ */

  const motionValues = useSlideMotionValues(currentSlide);

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

  const slideTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE };

  const textTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, delay: 0.1, ease: EASE };

  /* ------------------------------------------------------------------------ */
  /*                              RENDER                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Our offerings"
      role="region"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 80 }
          }
          transition={transitionConfig}
          className="w-full"
        >
          <div
            className="relative mx-auto overflow-hidden rounded-[18px] bg-black"
            style={{
              width: `${CARD_WIDTH_PCT}%`,
              maxWidth: CARD_MAX_WIDTH,
              height: `${CARD_HEIGHT_VH}vh`,
            }}
          >
            {/* =========================================================== */}
            {/*                    HORIZONTAL SLIDING IMAGES                */}
            {/* =========================================================== */}

            <div className="absolute inset-0">
              {OFFERINGS.map((offering, index) => (
                <motion.div
                  key={offering.title}
                  style={{
                    x: motionValues.images.x[index],
                    scale: motionValues.images.scale[index],
                    opacity: motionValues.images.opacity[index],
                  }}
                  transition={slideTransition}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={`/images/offerings/${offering.image}`}
                    alt={offering.title}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 94vw"
                    quality={85}
                    className="object-cover object-center brightness-[1.15] contrast-[1.02] saturate-[1.1]"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(to right, black 0%, rgba(0,0,0,0.45) ${GRADIENT_LEFT_WIDTH}, transparent 100%),
                        linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%),
                        rgba(0,0,0,0.35)
                      `,
                    }}
                  />
                </motion.div>
              ))}
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
                <div className="w-full px-10 md:px-14 lg:px-16 pb-28">
                  {/* Counter */}
                  <div
                    className="mb-8 text-white/70 text-[1rem] font-medium"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <motion.span className="tabular-nums">
                      {counterText}
                    </motion.span>
                  </div>

                  {/* Title - Horizontal slide + fade */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: TEXT_CONTAINER_HEIGHT }}
                  >
                    {OFFERINGS.map((offering, index) => (
                      <motion.h2
                        key={offering.title}
                        style={{
                          x: motionValues.titles.x[index],
                          opacity: motionValues.titles.opacity[index],
                        }}
                        transition={textTransition}
                        className="absolute inset-0 max-w-[560px] text-white text-[clamp(3rem,5vw,5.8rem)] leading-[0.9] font-semibold tracking-[-0.05em]"
                      >
                        {offering.title}
                      </motion.h2>
                    ))}
                  </div>

                  {/* Description - Horizontal slide + fade */}
                  <div
                    className="relative overflow-hidden mt-1"
                    style={{ height: DESC_CONTAINER_HEIGHT }}
                  >
                    {OFFERINGS.map((offering, index) => (
                      <motion.p
                        key={offering.title}
                        style={{
                          x: motionValues.descriptions.x[index],
                          opacity: motionValues.descriptions.opacity[index],
                        }}
                        transition={textTransition}
                        className="absolute max-w-[540px] text-white text-[1.05rem] md:text-[1.15rem] leading-[1.5]"
                      >
                        {offering.description}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>

              {/* ======================================================= */}
              {/*                       BOTTOM NAV                       */}
              {/* ======================================================= */}

              <div className="relative z-30 px-10 md:px-14 lg:px-16 pb-10">
                <div className="grid grid-cols-4 gap-8">
                  {OFFERINGS.map((offering, index) => (
                    <motion.button
                      key={offering.title}
                      onClick={() => scrollToIndex(index)}
                      className="relative text-left cursor-pointer group"
                      aria-label={`Go to ${offering.title}`}
                    >
                      <motion.div
                        style={{ opacity: motionValues.nav.opacity[index] }}
                        className="h-px mb-4 bg-white transition-transform duration-300 group-hover:scale-x-105 origin-left"
                      />
                      <motion.div
                        style={{ color: motionValues.nav.color[index] }}
                        className="text-[0.95rem] font-medium tracking-[-0.03em] transition-colors duration-300"
                      >
                        {offering.title}
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ======================================================= */}
              {/*                         CTA BUTTON                     */}
              {/* ======================================================= */}

              <div className="absolute right-10 bottom-24 z-30">
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