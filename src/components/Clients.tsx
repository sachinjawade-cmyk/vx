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

function LogoCard({
  src,
  index,
}: {
  src: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-8% 0px -8% 0px",
      }}
      transition={{
        duration: 0.8,
        ease: EASE,
        delay: (index % 5) * 0.07,
      }}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.3,
          ease: EASE,
        },
      }}
      className="group relative flex items-center justify-center cursor-pointer"
      style={{
        aspectRatio: "3/2",
      }}
    >
      <div className="relative w-full h-full px-3 py-2">
        <Image
          src={`/images/clients/${src}`}
          alt={src.replace(/\.png$/, "")}
          fill
          sizes="(max-width: 768px) 40vw, (max-width: 1024px) 20vw, 16vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function Clients() {
  const headerRef = useRef(null);

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
        <motion.h2
          initial={{ opacity: 0, y: 48 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.08 }}
          className="text-[clamp(2.4rem,6vw,5rem)] font-semibold tracking-[-0.04em] text-[#131313] leading-[1.0] mb-5"
        >
          Built with the Best
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.18 }}
          className="text-[#A47764] text-sm md:text-base mx-auto leading-[1.7] whitespace-nowrap"
        >
          Built alongside brands that believe in innovation, experience, and impact.
        </motion.p>
      </div>

      {/* ======================= DIVIDER ======================== */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3">
          {LOGOS.map((logo, i) => (
            <LogoCard key={logo} src={logo} index={i} />
          ))}
        </div>
      </div>

      {/* ===================== BOTTOM EDGE ===================== */}

      <div className="h-px bg-[#E8E8E8]" />
    </section>
  );
}