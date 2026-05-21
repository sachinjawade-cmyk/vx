"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

/* Load LightPillar only on the client — it needs WebGL */
const LightPillar = dynamic(() => import("./LightPillar"), { ssr: false });

/* -------------------------------------------------------------------------- */
/*                             MOTION CONFIG                                  */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*                             CTA COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { once: true, margin: "-15% 0px -15% 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0C0C0C]"
      style={{ minHeight: "100vh" }}
    >
      {/* ====================== LIGHT PILLAR BACKGROUND ====================== */}

      <div className="absolute inset-0 z-0">
        <LightPillar
          topColor="#C39E88"
          bottomColor="#F0F0E5"
          intensity={1.2}
          rotationSpeed={0.25}
          glowAmount={0.006}
          pillarWidth={3.2}
          pillarHeight={0.38}
          noiseIntensity={0.35}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="normal"
          quality="high"
        />
      </div>

      {/* ====================== DARK OVERLAY (keeps text readable) ====================== */}

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0C0C0C]/75 via-[#0C0C0C]/20 to-[#0C0C0C]/75 pointer-events-none" />

      {/* ====================== CONTENT ====================== */}

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-xs uppercase tracking-[0.26em] text-[#888888] mb-8 font-light"
        >
          Start something new
        </motion.p>

        {/* ---- Headline — two-line split for cinematic weight ---- */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.08 }}
            className="
              block
              text-[clamp(2.8rem,8vw,8rem)]
              font-semibold
              tracking-[-0.04em]
              leading-[0.95]
              text-[#F5F2EB]
            "
          >
            Ideas are invisible.
          </motion.h2>
        </div>

        <div className="overflow-hidden mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.18 }}
            className="
              block
              text-[clamp(2.8rem,8vw,8rem)]
              font-semibold
              tracking-[-0.04em]
              leading-[0.95]
              text-[#C39E88]
            "
          >
            Until we make them real.
          </motion.h2>
        </div>

        {/* ---- CTA Button ---- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.36 }}
        >
          <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileTap={{ scale: 0.97 }}
            className="
              relative
              group
              inline-flex items-center gap-3
              px-10 py-5
              rounded-full
              text-sm font-medium tracking-[0.08em] uppercase
              overflow-hidden
              border border-[#F5F2EB]/20
              text-[#F5F2EB]
              transition-colors duration-500
            "
            style={{
              background: hovered
                ? "rgba(195,158,136,0.15)"
                : "rgba(245,242,235,0.06)",
            }}
          >
            {/* Animated fill on hover */}
            <motion.span
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 bg-[#C39E88]/20 rounded-full pointer-events-none"
            />

            <span className="relative z-10">Start Project</span>

            {/* Animated arrow */}
            <motion.svg
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative z-10 w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* ---- Subtle contact nudge ---- */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
          className="mt-8 text-xs text-[#444444] tracking-wide"
        >
          or reach us at{" "}
          <a
            href="mailto:hello@viitorx.com"
            className="text-[#666666] underline underline-offset-4 hover:text-[#C39E88] transition-colors duration-300"
          >
            hello@viitorx.com
          </a>
        </motion.p>
      </div>

      {/* ====================== BOTTOM EDGE BLEND ====================== */}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none z-20" />
    </section>
  );
}
