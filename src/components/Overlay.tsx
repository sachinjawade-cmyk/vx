"use client";

import {
  motion,
  MotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Overlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [showSection1, setShowSection1] = useState(true);
  const [scrollValue, setScrollValue] = useState(0);

  /* ---------------- DEBUG TOGGLE ---------------- */
  const DEBUG = false;

  /* ---------------- TIMELINE ---------------- */

  const SECTION1_EXIT_END = 0.05;

  const SECTION2_ENTER_START = 0.2;
  const SECTION2_ENTER_END = 0.3;
  const SECTION2_EXIT_START = 0.4;
  const SECTION2_EXIT_END = 0.5;

  const SECTION3_ENTER_START = 0.45;
  const SECTION3_ENTER_END = 0.55;
  const SECTION3_EXIT_START = 0.7;
  const SECTION3_EXIT_END = 0.8;

  /* ---------------- SCROLL LISTENER ---------------- */

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollValue(latest);

    if (latest > SECTION1_EXIT_END && showSection1) {
      setShowSection1(false);
    } else if (latest <= SECTION1_EXIT_END && !showSection1) {
      setShowSection1(true);
    }
  });

  /* ---------------- SECTION STATES (DEBUG) ---------------- */

  const getSectionState = (
    progress: number,
    enterStart: number,
    enterEnd: number,
    exitStart: number,
    exitEnd: number
  ) => {
    if (progress < enterStart) return "BEFORE";
    if (progress >= enterStart && progress <= enterEnd) return "ENTERING";
    if (progress > enterEnd && progress < exitStart) return "VISIBLE";
    if (progress >= exitStart && progress <= exitEnd) return "EXITING";
    return "AFTER";
  };

  const section2State = getSectionState(
    scrollValue,
    SECTION2_ENTER_START,
    SECTION2_ENTER_END,
    SECTION2_EXIT_START,
    SECTION2_EXIT_END
  );

  const section3State = getSectionState(
    scrollValue,
    SECTION3_ENTER_START,
    SECTION3_ENTER_END,
    SECTION3_EXIT_START,
    SECTION3_EXIT_END
  );

  /* ---------------- ANIMATIONS ---------------- */

  const opacity1 = useTransform(scrollYProgress, [0, SECTION1_EXIT_END], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, SECTION1_EXIT_END], [0, -60]);

  const opacity2 = useTransform(
    scrollYProgress,
    [0, SECTION2_ENTER_START, SECTION2_ENTER_END, SECTION2_EXIT_START, SECTION2_EXIT_END, 1],
    [0, 0, 1, 1, 0, 0]
  );

  const y2 = useTransform(
    scrollYProgress,
    [0, SECTION2_ENTER_START, SECTION2_ENTER_END, SECTION2_EXIT_START, SECTION2_EXIT_END, 1],
    [60, 60, 0, 0, 60, 60]
  );

  const posX = 100;
  const x2 = useTransform(
    scrollYProgress,
    [0, SECTION2_ENTER_START, SECTION2_ENTER_END, 1],
    [posX, posX, posX, posX]
  );

  const opacity3 = useTransform(
    scrollYProgress,
    [0, SECTION3_ENTER_START, SECTION3_ENTER_END, SECTION3_EXIT_START, SECTION3_EXIT_END, 1],
    [0, 0, 1, 1, 0, 0]
  );

  const y3 = useTransform(
    scrollYProgress,
    [0, SECTION3_ENTER_START, SECTION3_ENTER_END, SECTION3_EXIT_START, SECTION3_EXIT_END, 1],
    [60, 60, 0, 0, 60, 60]
  );

  const x3 = useTransform(
    scrollYProgress,
    [0, SECTION3_ENTER_START, SECTION3_ENTER_END, 1],
    [-posX, -posX, -posX, -posX]
  );

  /* ---------------- RENDER ---------------- */

  return (
    <>
      {/* MAIN UI */}
      <div className="absolute inset-0 z-10 pointer-events-none px-6 md:px-24">
        {showSection1 && (
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-center justify-between py-16">
            <Image src="/images/VI ITO R X.svg" alt="VIITOR X" width={208} height={80} />
            <p className="text-sm tracking-[0.5em] text-[#B09B8B] uppercase">SCROLL</p>
          </motion.div>
        )}

        {(section2State !== "AFTER" && section2State !== "BEFORE") && (
          <motion.div style={{ opacity: opacity2, y: y2, x: x2 }} className="absolute inset-0 flex items-center justify-start">
            <h2 className="text-5xl text-white max-w-2xl">
              The future is<span className="text-[#815948]"><br></br>immersive.</span>
            </h2>
          </motion.div>
        )}

        {(section3State !== "AFTER" && section3State !== "BEFORE") && (
          <motion.div style={{ opacity: opacity3, y: y3, x: x3 }} className="absolute inset-0 flex items-center justify-end text-right">
            <h2 className="text-5xl text-white max-w-2xl">
              We design how it’s<br></br><span className="text-[#815948]">experienced.</span>
            </h2>
          </motion.div>
        )}
      </div>

      {/* ---------------- DEBUG PANEL ---------------- */}
      {DEBUG && (
        <>
          {/* TOP LEFT INFO */}
          <div className="fixed top-4 left-4 z-50 bg-black/80 text-white text-xs p-4 rounded-lg font-mono space-y-1">
            <div>scroll: {scrollValue.toFixed(3)}</div>
            <div>section2: {section2State}</div>
            <div>section3: {section3State}</div>

            <div className="mt-2 text-yellow-400">Timeline</div>
            <div>S2 enter: {SECTION2_ENTER_START} → {SECTION2_ENTER_END}</div>
            <div>S2 exit: {SECTION2_EXIT_START} → {SECTION2_EXIT_END}</div>
            <div>S3 enter: {SECTION3_ENTER_START} → {SECTION3_ENTER_END}</div>
            <div>S3 exit: {SECTION3_EXIT_START} → {SECTION3_EXIT_END}</div>
          </div>

          {/* BOTTOM PROGRESS BAR */}
          <div className="fixed bottom-0 left-0 w-full h-2 bg-black/30 z-50">
            <div
              className="h-full bg-green-400"
              style={{ width: `${scrollValue * 100}%` }}
            />
          </div>

          {/* MARKERS */}
          {[
            SECTION2_ENTER_START,
            SECTION2_ENTER_END,
            SECTION2_EXIT_START,
            SECTION2_EXIT_END,
            SECTION3_ENTER_START,
            SECTION3_ENTER_END,
            SECTION3_EXIT_START,
            SECTION3_EXIT_END,
          ].map((point, i) => (
            <div
              key={i}
              className="fixed bottom-0 w-[2px] h-6 bg-red-500 z-50"
              style={{ left: `${point * 100}%` }}
            />
          ))}
        </>
      )}
    </>
  );
}