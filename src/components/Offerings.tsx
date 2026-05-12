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

function useOfferingMotionValues(activeIndex: ReturnType<typeof useTransform<number, number>>) {
  const img0 = useTransform(activeIndex, (current) => (current === 0 ? 1 : 0));
  const img1 = useTransform(activeIndex, (current) => (current === 1 ? 1 : 0));
  const img2 = useTransform(activeIndex, (current) => (current === 2 ? 1 : 0));
  const img3 = useTransform(activeIndex, (current) => (current === 3 ? 1 : 0));

  const txtOp0 = useTransform(activeIndex, (current) => (current === 0 ? 1 : 0));
  const txtOp1 = useTransform(activeIndex, (current) => (current === 1 ? 1 : 0));
  const txtOp2 = useTransform(activeIndex, (current) => (current === 2 ? 1 : 0));
  const txtOp3 = useTransform(activeIndex, (current) => (current === 3 ? 1 : 0));

  const txtY0 = useTransform(activeIndex, (current) => (current === 0 ? 0 : 14));
  const txtY1 = useTransform(activeIndex, (current) => (current === 1 ? 0 : 14));
  const txtY2 = useTransform(activeIndex, (current) => (current === 2 ? 0 : 14));
  const txtY3 = useTransform(activeIndex, (current) => (current === 3 ? 0 : 14));

  const navOp0 = useTransform(activeIndex, (current) => (current === 0 ? 1 : 0.2));
  const navOp1 = useTransform(activeIndex, (current) => (current === 1 ? 1 : 0.2));
  const navOp2 = useTransform(activeIndex, (current) => (current === 2 ? 1 : 0.2));
  const navOp3 = useTransform(activeIndex, (current) => (current === 3 ? 1 : 0.2));

  const navCol0 = useTransform(activeIndex, (current) =>
    current === 0 ? "#ffffff" : "rgba(255,255,255,0.35)"
  );
  const navCol1 = useTransform(activeIndex, (current) =>
    current === 1 ? "#ffffff" : "rgba(255,255,255,0.35)"
  );
  const navCol2 = useTransform(activeIndex, (current) =>
    current === 2 ? "#ffffff" : "rgba(255,255,255,0.35)"
  );
  const navCol3 = useTransform(activeIndex, (current) =>
    current === 3 ? "#ffffff" : "rgba(255,255,255,0.35)"
  );

  return {
    imageOpacities: [img0, img1, img2, img3],
    textOpacities: [txtOp0, txtOp1, txtOp2, txtOp3],
    textYs: [txtY0, txtY1, txtY2, txtY3],
    navOpacities: [navOp0, navOp1, navOp2, navOp3],
    navColors: [navCol0, navCol1, navCol2, navCol3],
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ------------------------------------------------------------------------ */
  /*                     ACTIVE INDEX — FIXED MAPPING                         */
  /* ------------------------------------------------------------------------ */
  /*
    The section is 450vh tall. We want each offering to occupy an EQUAL
    portion of that scroll distance:
      - Offering 0: 0.0000 → 0.2500
      - Offering 1: 0.2500 → 0.5000
      - Offering 2: 0.5000 → 0.7500
      - Offering 3: 0.7500 → 1.0000

    Using Math.floor(progress * ITEM_COUNT) works for the first 3 items,
    but when progress reaches exactly 1.0, progress * 4 = 4.0, floor = 4,
    which clamps to 3. This means the last item "completes" at progress
    ~0.9375 instead of 1.0.

    FIX: Use a custom transform that maps the full [0,1] range properly.
    We divide [0,1] into 4 equal segments and return the segment index.
  */

  const activeIndex = useTransform(scrollYProgress, (progress) => {
    // Ensure we stay within [0, 1] even with floating point errors
    const clamped = Math.max(0, Math.min(1, progress));
    // Map to segment: 0-0.25→0, 0.25-0.5→1, 0.5-0.75→2, 0.75-1.0→3
    const segment = Math.min(ITEM_COUNT - 1, Math.floor(clamped * ITEM_COUNT));
    return segment;
  });

  // Counter text
  const counterText = useTransform(activeIndex, (v) =>
    `${String(v + 1).padStart(2, "0")} / ${String(ITEM_COUNT).padStart(2, "0")}`
  );

  /* ------------------------------------------------------------------------ */
  /*                     PRE-COMPUTED MOTION VALUES                           */
  /* ------------------------------------------------------------------------ */

  const {
    imageOpacities,
    textOpacities,
    textYs,
    navOpacities,
    navColors,
  } = useOfferingMotionValues(activeIndex);

  /* ------------------------------------------------------------------------ */
  /*                            NAVIGATION                                     */
  /* ------------------------------------------------------------------------ */

  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current) return;

    const sectionTop = containerRef.current.offsetTop;
    const sectionHeight = containerRef.current.offsetHeight;
    const clampedIndex = Math.min(index, ITEM_COUNT - 1);
    // Target the START of each segment so user can scroll through it
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
    : { duration: 0.45, ease: EASE };

  const textTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.45, delay: 0.08, ease: EASE };

  const descTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, delay: 0.12, ease: EASE };

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
            {/* Image Layers */}
            <div className="absolute inset-0">
              {OFFERINGS.map((offering, index) => (
                <motion.div
                  key={offering.title}
                  style={{ opacity: imageOpacities[index] }}
                  transition={imageTransition}
                  className="absolute inset-0 will-change-[opacity]"
                >
                  <Image
                    src={`/images/offerings/${offering.image}`}
                    alt={offering.title}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 94vw"
                    quality={85}
                    className="object-cover object-center brightness-[1.15] contrast-[1.02] saturate-[1.1] transition-transform duration-700"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(to right, black 0%, rgba(0,0,0,0.05) ${GRADIENT_LEFT_WIDTH}, transparent 100%),
                        linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%),
                        rgba(0,0,0,0.35)
                      `,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Top CTA */}
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

            {/* Main Content */}
            <div className="relative z-20 h-full flex flex-col justify-between">
              {/* Text Area */}
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

                  {/* Title */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: TEXT_CONTAINER_HEIGHT }}
                  >
                    {OFFERINGS.map((offering, index) => (
                      <motion.h2
                        key={offering.title}
                        style={{
                          opacity: textOpacities[index],
                          y: textYs[index],
                        }}
                        transition={textTransition}
                        className="absolute inset-0 max-w-[560px] text-white text-[clamp(3rem,5vw,5.8rem)] leading-[0.9] font-semibold tracking-[-0.05em]"
                      >
                        {offering.title}
                      </motion.h2>
                    ))}
                  </div>

                  {/* Description */}
                  <div
                    className="relative overflow-hidden mt-1"
                    style={{ height: DESC_CONTAINER_HEIGHT }}
                  >
                    {OFFERINGS.map((offering, index) => (
                      <motion.p
                        key={offering.title}
                        style={{
                          opacity: textOpacities[index],
                          y: textYs[index],
                        }}
                        transition={descTransition}
                        className="absolute max-w-[540px] text-white text-[1.05rem] md:text-[1.15rem] leading-[1.5]"
                      >
                        {offering.description}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
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
                        style={{ opacity: navOpacities[index] }}
                        className="h-px mb-4 bg-white transition-transform duration-300 group-hover:scale-x-105 origin-left"
                      />
                      <motion.div
                        style={{ color: navColors[index] }}
                        className="text-[0.95rem] font-medium tracking-[-0.03em] transition-colors duration-300"
                      >
                        {offering.title}
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
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