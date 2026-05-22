"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const DEBUG = true;

const SMOOTH_SCROLL_CONFIG = {
  stiffness: 90,
  damping: 22,
  mass: 0.35,
};

export default function CinematicSliderSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    SMOOTH_SCROLL_CONFIG
  );

  /* -------------------------------------------------------------------------- */
  /* SEGMENT */
  /* -------------------------------------------------------------------------- */

  const SEG = 0.25;

  const hStart = 0;
  const hCenter = SEG * 0.45;
  const hEnd = SEG;

  const CENTER_HOLD = 0.08;

  /* -------------------------------------------------------------------------- */
  /* HEADLINE ANIMATION */
  /* -------------------------------------------------------------------------- */

  const headlineOpacity = useTransform(
    smoothProgress,
    [
      hStart,
      hCenter - CENTER_HOLD,
      hCenter,
      hCenter + CENTER_HOLD,
      hEnd,
    ],
    [0, 1, 1, 1, 0]
  );

  const headlineY = useTransform(
    smoothProgress,
    [hStart, hCenter, hEnd],
    [40, 0, -20]
  );

  const headlineScale = useTransform(
    smoothProgress,
    [hStart, hCenter, hEnd],
    [0.985, 1, 1]
  );

  /* -------------------------------------------------------------------------- */
  /* PARAGRAPH */
  /* -------------------------------------------------------------------------- */

  const paraOpacity = useTransform(
    smoothProgress,
    [
      hCenter * 0.65,
      hCenter,
      hEnd * 0.8,
      hEnd,
    ],
    [0, 1, 1, 0]
  );

  /* -------------------------------------------------------------------------- */
  /* DEBUG */
  /* -------------------------------------------------------------------------- */

  const progressX = useTransform(
    smoothProgress,
    [0, 1],
    [0, 240]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-[#ECE8E1]"
    >
      {/* -------------------------------------------------------------------- */}
      {/* STICKY WRAPPER */}
      {/* -------------------------------------------------------------------- */}

      <div className="sticky top-0 h-screen overflow-hidden flex items-center p-6 md:p-8">

        {/* ------------------------------------------------------------------ */}
        {/* MAIN FRAME */}
        {/* ------------------------------------------------------------------ */}

        <div className="relative w-full h-full rounded-[45px] overflow-hidden border border-black/5 bg-[#F3F1EE] shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

          {/* -------------------------------------------------------------- */}
          {/* DEBUG BAR */}
          {/* -------------------------------------------------------------- */}

          {DEBUG && (
            <motion.div
              className="fixed top-0 left-0 h-[4px] bg-black z-[999999]"
              style={{
                scaleX: smoothProgress,
                transformOrigin: "left",
                width: "100%",
              }}
            />
          )}

          {/* -------------------------------------------------------------- */}
          {/* DEBUG PANEL */}
          {/* -------------------------------------------------------------- */}

          {DEBUG && (
            <div className="fixed top-6 right-6 z-[999999] w-[260px] rounded-2xl border border-white/10 bg-black/85 backdrop-blur-xl p-5 text-white font-mono text-xs space-y-3 shadow-2xl">

              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-green-400 font-semibold">
                  DEBUG PANEL
                </span>

                <span className="text-white/40">
                  ON
                </span>
              </div>

              {/* SEGMENTS */}

              <div className="space-y-2">

                <div className="flex justify-between">
                  <span className="text-white/50">SEG</span>
                  <span>{SEG.toFixed(3)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">hStart</span>
                  <span>{hStart.toFixed(3)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">hCenter</span>
                  <span>{hCenter.toFixed(3)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">hEnd</span>
                  <span>{hEnd.toFixed(3)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">CENTER_HOLD</span>
                  <span>{CENTER_HOLD.toFixed(3)}</span>
                </div>
              </div>

              {/* LIVE */}

              <div className="border-t border-white/10 pt-3 space-y-2">

                <div className="text-green-400 font-semibold">
                  LIVE VALUES
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">Scroll</span>
                  <span>{smoothProgress.get().toFixed(3)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">Opacity</span>
                  <span>{headlineOpacity.get().toFixed(3)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">Y</span>
                  <span>{headlineY.get().toFixed(1)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">Scale</span>
                  <span>{headlineScale.get().toFixed(3)}</span>
                </div>
              </div>

              {/* TIMELINE */}

              <div className="border-t border-white/10 pt-3 space-y-2">

                <div className="text-green-400 font-semibold">
                  TIMELINE
                </div>

                <div className="relative h-[10px] w-full rounded-full bg-white/10 overflow-hidden">

                  {/* CURRENT POSITION */}

                  <motion.div
                    className="absolute top-0 left-0 h-full w-[4px] bg-green-400"
                    style={{
                      x: progressX,
                    }}
                  />

                  {/* CENTER */}

                  <div
                    className="absolute top-0 h-full w-[2px] bg-yellow-400"
                    style={{
                      left: `${hCenter * 100}%`,
                    }}
                  />

                  {/* END */}

                  <div
                    className="absolute top-0 h-full w-[2px] bg-red-400"
                    style={{
                      left: `${hEnd * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* CONTENT WRAPPER */}
          {/* -------------------------------------------------------------- */}

          <div className="relative w-full h-full max-w-[1500px] mx-auto px-8 md:px-14 py-10 md:py-14">

            {/* ------------------------------------------------------------ */}
            {/* SLIDER AREA */}
            {/* ------------------------------------------------------------ */}

            <div className="relative w-full h-full flex items-center rounded-[45px]">

              {/* -------------------------------------------------------- */}
              {/* TEXT CONTENT */}
              {/* -------------------------------------------------------- */}

              <motion.div
                style={{
                  opacity: headlineOpacity,
                  y: headlineY,
                  scale: headlineScale,
                }}
                className="relative z-10 w-full"
              >
                {/* LABEL */}

                <div className="mb-8 text-[22px] md:text-[30px] italic font-semibold tracking-[-0.04em] text-[#FFFFFF]">
                  How.
                </div>

                {/* HEADLINE */}

                <h1 className="max-w-[1200px] text-[72px] md:text-[96px] leading-[0.95] tracking-[-0.06em] font-medium text-[#FFFFFF]">
                  Don&apos;t just present ideas.
                  <br />
                  Let people step into them.
                </h1>

                {/* PARAGRAPH */}

                <motion.p
                  style={{
                    opacity: paraOpacity,
                  }}
                  className="mt-12 max-w-[760px] text-[20px] md:text-[22px] leading-[1.5] tracking-[-0.03em] text-[#7A7A7A]"
                >
                  We design immersive environments that transform passive
                  audiences into active participants through spatial
                  storytelling, interaction, and cinematic digital experiences.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}