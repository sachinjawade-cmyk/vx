"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  useSpring,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const INDUSTRIES = [
  {
    index: "01",
    name: "MUSEUMS &\nCULTURAL\nINSTITUTIONS",
    description: "Immersive experiences that preserve heritage, educate, and inspire.",
    image: "/images/industries/MUSEUMS & CULTURAL.png",
  },
  {
    index: "02",
    name: "EVENTS, EXPOS &\nBRAND ACTIVATIONS",
    description: "Experiential moments that captivate audiences and amplify brands.",
    image: "/images/industries/EVENTS.png",
  },
  {
    index: "03",
    name: "CORPORATE BRAND\n& VISITOR CENTRES",
    description: "Spaces that communicate purpose, build trust, and strengthen relationships.",
    image: "/images/industries/CORPORATE.png",
  },
  {
    index: "04",
    name: "GOVERNMENT\nHERITAGE &\nTOURISM",
    description: "Transforming public spaces into engaging destinations that drive growth.",
    image: "/images/industries/GOVERNMENT.png",
  },
];

const STATS = [
  { value: 100, suffix: "+", label: "Projects completed" },
  { value: 92, suffix: "%", label: "Client satisfaction" },
  { value: 96, suffix: "%", label: "Success rate" },
  { value: 10, suffix: "+", label: "Years of experience" },
];

/* -------------------------------------------------------------------------- */
/*                             MOTION CONFIGURATION                           */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTION_BG = "#0A0A0A";
const SCROLL_MULTIPLIER = 4;

/* -------------------------------------------------------------------------- */
/*                             COUNT-UP HOOK                                  */
/* -------------------------------------------------------------------------- */

function useCountUp(target: number, isActive: boolean, duration = 2) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    hasRun.current = true;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isActive, target, duration]);

  return count;
}

/* -------------------------------------------------------------------------- */
/*                              STAT ITEM                                     */
/* -------------------------------------------------------------------------- */

function StatItem({
  value,
  suffix,
  label,
  isActive,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  isActive: boolean;
  delay: number;
}) {
  const count = useCountUp(value, isActive);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className="flex flex-col"
    >
      <span className="text-[clamp(2.5rem,4vw,4rem)] font-semibold tracking-[-0.03em] text-[#F5F2EB] leading-none">
        {count}
        {suffix}
      </span>
      <span className="text-[#666666] text-sm mt-2 tracking-wide">{label}</span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             INDUSTRIES COMPONENT                           */
/* -------------------------------------------------------------------------- */

export default function Industries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  /* ---- Scroll progress ---- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = INDUSTRIES.length;

  /* ---- FIX: Snap the scroll progress to discrete slide positions ---- */
  /* 
    Raw progress (0-1) is divided into 4 segments. We snap to the 
    START of each segment, creating a "lock" effect:
    - 0.00 - 0.25 → locked at 0.00 (slide 1)
    - 0.25 - 0.50 → locked at 0.25 (slide 2)  
    - 0.50 - 0.75 → locked at 0.50 (slide 3)
    - 0.75 - 1.00 → locked at 0.75 (slide 4)

    The snap happens instantly via useTransform math, not spring.
    This creates the "scroll, stop, locked" offering behavior.
  */
  const snappedProgress = useTransform(scrollYProgress, (p) => {
    const clamped = Math.min(1, Math.max(0, p));
    const segment = Math.floor(clamped * total) / total;
    return segment;
  });

  /* ---- Rail Y: moves based on snapped progress ---- */
  const railY = useTransform(
    snappedProgress,
    [0, 0.25, 0.5, 0.75],
    ["0%", "-25%", "-50%", "-75%"]
  );

  /* ---- Active index from snapped progress ---- */
  const activeIndexRaw = useTransform(snappedProgress, (p) => {
    return Math.min(total - 1, Math.floor(p * total));
  });

  /* ---- Stats count-up trigger ---- */
  const isStatsVisible = useInView(statsRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  /* ---- Header fade-in ---- */
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useInView(headerRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  /* ---- Track active index ---- */
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndexRaw.on("change", (v) => {
      setActiveIndex(Math.round(v));
    });
    return unsubscribe;
  }, [activeIndexRaw]);

  return (
    <section
      ref={containerRef}
      style={{
        background: SECTION_BG,
        height: `${SCROLL_MULTIPLIER * 100}vh`,
      }}
      className="relative"
    >
      {/* ================================================================ */}
      {/*                        STICKY VIEWPORT                           */}
      {/* ================================================================ */}

      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* ======================== SECTION HEADER ======================== */}

        <div
          ref={headerRef}
          className="pt-20 pb-12 px-6 md:px-16 max-w-7xl mx-auto w-full text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: 0.08 }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.04em] text-[#F5F2EB] leading-[1.0]"
          >
            Where We Belong
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.18 }}
            className="text-[#666666] text-base md:text-lg mt-4"
          >
            Transforming industries through immersive technology.
          </motion.p>
        </div>

        {/* ======================== MAIN BODY ======================== */}

        <div className="flex-1 flex max-w-7xl mx-auto w-full px-6 md:px-16 pb-10 gap-8 md:gap-12">

          {/* ============== LEFT: Industry text ============== */}

          <div className="w-[240px] md:w-[300px] flex-shrink-0 flex flex-col justify-center relative overflow-hidden">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: activeIndex === i ? 1 : 0,
                  y: activeIndex === i ? 0 : activeIndex > i ? -40 : 40,
                }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#555555] block mb-6">
                  {ind.index} / {String(total).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(1.4rem,2.4vw,2.2rem)] font-semibold text-[#F5F2EB] leading-[1.15] tracking-[-0.02em] whitespace-pre-line mb-5">
                  {ind.name}
                </h3>
                <p className="text-[#777777] text-sm md:text-base leading-[1.6] max-w-[260px]">
                  {ind.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ============== CENTRE: Image rail ============== */}

          <div className="flex-1 min-w-0 relative overflow-hidden rounded-lg">
            <motion.div
              style={{
                y: railY,
                willChange: "transform",
                height: `${total * 100}%`,
              }}
              className="w-full"
            >
              {INDUSTRIES.map((ind, i) => (
                <div
                  key={i}
                  className="relative w-full"
                  style={{ height: `${100 / total}%` }}
                >
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    sizes="(max-width: 1024px) 60vw, 45vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ============== RIGHT: Sticky Stats ============== */}

          <div
            ref={statsRef}
            className="w-[180px] md:w-[220px] flex-shrink-0 flex flex-col justify-center gap-14"
          >
            {STATS.map((stat, i) => (
              <StatItem
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isActive={isStatsVisible}
                delay={i * 0.15}
              />
            ))}
          </div>

        </div>

        {/* ======================== PROGRESS DOTS ======================== */}

        <div className="flex gap-2 justify-center pb-8">
          {INDUSTRIES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: activeIndex === i ? 24 : 6,
                opacity: activeIndex === i ? 1 : 0.3,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              className="h-[3px] rounded-full bg-[#F5F2EB]"
            />
          ))}
        </div>

      </div>
    </section>
  );
}