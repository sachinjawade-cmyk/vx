"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const LOGOS = [
  "Frame 1948756681.png",
  "Frame 1948756682.png",
  "Frame 1948756684.png",
  "Frame 1948756685.png",
  "Frame 1948756687.png",
  "Frame 1948756688.png",
  "Frame 1948756690.png",
  "Frame 1948756691.png",
  "Frame 1948756692.png",
  "Frame 1948756693.png",
  "Frame 1948756694.png",
  "Frame 1948756695.png",
  "Frame 1948756696.png",
  "Frame 1948756697.png",
  "Frame 1948756698.png",
  "Frame 1948756699.png",
  "Frame 1948756700.png",
  "Frame 1948756701.png",
  "Frame 1948756702.png",
  "Frame 1948756703.png",
  "Frame 1948756704.png",
  "Frame 1948756705.png",
  "Frame 27.png",
  "Frame 33.png",
  "Frame 34.png",
  "Frame 35.png",
  "Frame 36.png",
  "Frame 37.png",
  "Frame 39.png",
  "Frame 40.png",
  "Frame 41.png",
  "Frame 42.png",
  "Frame 44.png",
];

/* -------------------------------------------------------------------------- */
/*                             MOTION CONFIGURATION                           */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*                               LOGO CARD                                    */
/* -------------------------------------------------------------------------- */

function LogoCard({ src, index }: { src: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 0.8,
        ease: EASE,
        delay: (index % 5) * 0.07, // stagger per column position
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 32px 0 rgba(0,0,0,0.10)",
        transition: { duration: 0.3, ease: EASE },
      }}
      className="
        group
        relative
        flex items-center justify-center
        bg-white
        border border-[#E8E8E8]
        rounded-[10px]
        p-5
        cursor-pointer
        overflow-hidden
        transition-colors duration-300
        hover:border-[#D0D0D0]
      "
      style={{ aspectRatio: "3/2" }}
    >
      {/* Subtle hover background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative w-full h-full">
        <Image
          src={`/images/clients/${src}`}
          alt={src.replace(/\.png$/, "")}
          fill
          sizes="(max-width: 768px) 40vw, (max-width: 1024px) 20vw, 16vw"
          className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function Clients() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useInView(headerRef, {
    margin: "-10% 0px -10% 0px",
    once: true,
  });

  return (
    <section className="relative w-full bg-white overflow-hidden">

      {/* ======================== HEADER ======================== */}

      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-14 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-xs uppercase tracking-[0.22em] text-[#AAAAAA] mb-5 font-light"
        >
          Our Clients
        </motion.p>

        {/* Main title */}
        <motion.h2
          initial={{ opacity: 0, y: 48 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.08 }}
          className="
            text-[clamp(2.4rem,6vw,5rem)]
            font-semibold
            tracking-[-0.04em]
            text-[#111111]
            leading-[1.0]
            mb-5
          "
        >
          Built with the Best
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.18 }}
          className="text-[#888888] text-sm md:text-base max-w-md mx-auto leading-[1.7]"
        >
          Built alongside brands that believe in innovation, experience, and impact.
        </motion.p>
      </div>

      {/* ======================= DIVIDER ======================== */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-[#E8E8E8] w-full"
        />
      </div>

      {/* ======================== LOGO GRID ======================== */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-28">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {LOGOS.map((logo, i) => (
            <LogoCard key={logo} src={logo} index={i} />
          ))}
        </div>
      </div>

      {/* ===================== BOTTOM EDGE (dark transition) ===================== */}

      <div className="h-px bg-[#E8E8E8]" />
    </section>
  );
}
