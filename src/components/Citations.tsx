"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const ITEMS = [
  {
    id: 1,
    image: "/images/offerings/immersive-experience.png",
    title: "Immersive Experience Centres",
    description:
      "Permanent spaces that tell stories, engage visitors, and leave a lasting impact.",
    tag: "Experience Design",
  },
  {
    id: 2,
    image: "/images/offerings/simulation-learning.png",
    title: "Simulation-Based Learning",
    description:
      "Immersive training that replaces dangerous or expensive physical practice.",
    tag: "Training & Education",
  },
  {
    id: 3,
    image: "/images/offerings/event-brand-experience.png",
    title: "Event & Brand Activation",
    description:
      "Immersive brand moments for events, expos, and product launches.",
    tag: "Brand Strategy",
  },
  {
    id: 4,
    image: "/images/offerings/digital-experiences.png",
    title: "Digital Experiences",
    description:
      "Websites and digital environments built with 3D, motion and immersive storytelling.",
    tag: "Digital",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  CONFIG                                    */
/* -------------------------------------------------------------------------- */

const TOTAL           = ITEMS.length;
const SLIDES_PER_ITEM = 100;          // vh per slide
const SECTION_VH      = TOTAL * SLIDES_PER_ITEM; // Total scroll height
const EASE            = [0.22, 1, 0.36, 1] as const;
const IMAGE_TRANSITION = { duration: 1.1, ease: EASE };
const TEXT_TRANSITION  = { duration: 0.65, ease: EASE };

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */

export default function Citations() {
  const containerRef  = useRef(null);
  const [active, setActive] = useState(0);

  /* Track scroll progress over the tall section */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(TOTAL - 1, Math.floor(v * TOTAL));
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0D0D0D]"
      style={{ height: `${SECTION_VH}vh` }}
      aria-label="What we do"
    >
      {/* ================================================================ */}
      {/*                      STICKY VIEWPORT                            */}
      {/* ================================================================ */}

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ============================================================ */}
        {/*               FULL-BLEED IMAGE STACK (RIGHT HALF)            */}
        {/* ============================================================ */}

        <div className="absolute inset-0">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className="absolute inset-0 will-change-transform"
              initial={false}
              animate={{
                opacity: i === active ? 1 : 0,
                scale:   i === active ? 1 : 1.08,
              }}
              transition={IMAGE_TRANSITION}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={i === 0}
                loading={i <= 1 ? "eager" : "lazy"}
                sizes="100vw"
                quality={90}
                className="object-cover object-center"
              />

              {/* Gradient — heavier on left to carve out text space */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.70) 38%, rgba(10,10,10,0.20) 65%, transparent 100%),\
                     linear-gradient(to top,  rgba(10,10,10,0.60) 0%, transparent 40%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* ============================================================ */}
        {/*                       LEFT TEXT RAIL                         */}
        {/* ============================================================ */}

        <div className="relative z-20 h-full flex flex-col justify-between px-10 md:px-16 lg:px-24 py-12">

          {/* ---- Top: section eyebrow ---- */}
          <div className="flex items-center gap-4">
            <span className="w-6 h-px bg-[#A47764]" />
            <span className="text-[#A47764] text-xs uppercase tracking-[0.22em] font-light">
              What We Build
            </span>
          </div>

          {/* ---- Middle: big title + description ---- */}
          <div className="flex-1 flex flex-col justify-center max-w-[700px]">

            {/* Index counter */}
            <motion.div
              key={active + "-counter"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...TEXT_TRANSITION, delay: 0 }}
              className="mb-6 tabular-nums text-[#A47764] text-sm font-light tracking-widest"
            >
              {String(active + 1).padStart(2, "0")} &nbsp;/&nbsp; {String(TOTAL).padStart(2, "0")}
            </motion.div>

            {/* Tag pill */}
            <div className="relative overflow-hidden mb-4" style={{ height: 26 }}>
              {ITEMS.map((item, i) => (
                <motion.span
                  key={item.id}
                  className="absolute top-0 left-0 inline-block border border-[#A47764]/40 text-[#A47764] text-[0.68rem] uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 10 }}
                  transition={{ ...TEXT_TRANSITION, delay: i === active ? 0.05 : 0 }}
                >
                  {item.tag}
                </motion.span>
              ))}
            </div>

            {/* Title */}
            <div className="relative overflow-hidden mb-6" style={{ height: "clamp(120px,18vw,260px)" }}>
              {ITEMS.map((item, i) => (
                <motion.h2
                  key={item.id}
                  className="absolute inset-0 text-white font-semibold leading-[0.92] tracking-[-0.05em] text-[clamp(2.6rem,5vw,6rem)]"
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    y:       i === active ? 0  : 24,
                  }}
                  transition={{ ...TEXT_TRANSITION, delay: i === active ? 0.1 : 0 }}
                >
                  {item.title}
                </motion.h2>
              ))}
            </div>

            {/* Description */}
            <div className="relative overflow-hidden" style={{ height: 80 }}>
              {ITEMS.map((item, i) => (
                <motion.p
                  key={item.id}
                  className="absolute inset-0 text-white/60 text-[1rem] md:text-[1.1rem] leading-[1.55] max-w-[440px]"
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    y:       i === active ? 0  : 16,
                  }}
                  transition={{ ...TEXT_TRANSITION, delay: i === active ? 0.2 : 0 }}
                >
                  {item.description}
                </motion.p>
              ))}
            </div>
          </div>

          {/* ---- Bottom: step tabs ---- */}
          <div className="grid grid-cols-4 gap-8 max-w-[1000px]">
            {ITEMS.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!containerRef.current) return;
                    const top    = containerRef.current.offsetTop;
                    const height = containerRef.current.offsetHeight;
                    window.scrollTo({ top: top + (height * i) / TOTAL, behavior: "smooth" });
                  }}
                  className="relative text-left group cursor-pointer"
                  aria-label={`Jump to ${item.title}`}
                >
                  {/* Progress line */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0.2, scaleX: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.4 }}
                    className="h-px mb-3 bg-[#A47764] origin-left"
                  />
                  {/* Label */}
                  <motion.span
                    animate={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.3)" }}
                    transition={{ duration: 0.3 }}
                    className="text-[1rem] font-medium leading-[1.3] tracking-[0rem]"
                  >
                    {item.title}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/*            BOTTOM RIGHT: scroll nudge                        */}
        {/* ============================================================ */}

        <div className="absolute bottom-10 right-12 z-30 flex flex-col items-center gap-8 opacity-80">
          <span className="text-white text-[0.65rem] uppercase tracking-[0.2em] rotate-90 origin-center">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-white"
          />
        </div>
      </div>
    </section>
  );
}