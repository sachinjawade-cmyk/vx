"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Offerings() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // ---------- SEGMENT SIZE ----------
  const segment = 0.25;

  // ---------- ACTIVE INDEX (STABLE) ----------
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(3, Math.floor(v / segment))
  );

  // ---------- PROGRESS INSIDE CURRENT SEGMENT (0 → 1) ----------
  const progressInSegment = useTransform(scrollYProgress, (v) => {
    const i = Math.floor(v / segment);
    const start = i * segment;
    return (v - start) / segment;
  });

  // ---------- IMAGE CROSSFADE ----------
  const getImageStyle = (index: number) => {
    return {
      opacity: useTransform(progressInSegment, (p) => {
        const i = Math.floor(scrollYProgress.get() / segment);
        if (i === index) return 1 - p;       // fade out current
        if (i + 1 === index) return p;       // fade in next
        return 0;
      }),
      scale: useTransform(progressInSegment, (p) => {
        const i = Math.floor(scrollYProgress.get() / segment);
        if (i === index) return 1 - p * 0.05;
        if (i + 1 === index) return 0.95 + p * 0.05;
        return 0.95;
      }),
      filter: useTransform(progressInSegment, (p) => {
        const i = Math.floor(scrollYProgress.get() / segment);
        if (i === index) return `blur(${p * 6}px)`;
        if (i + 1 === index) return `blur(${(1 - p) * 6}px)`;
        return "blur(6px)";
      })
    };
  };

  // ---------- TEXT ANIMATION ----------
  const getTextStyle = (index: number) => {
    return {
      y: useTransform(progressInSegment, (p) => {
        const i = Math.floor(scrollYProgress.get() / segment);

        if (i === index) return -p * 20;
        if (i + 1 === index) return 5 - p * 5;

        return 0;
      }),

      opacity: useTransform(progressInSegment, (p) => {
        const i = Math.floor(scrollYProgress.get() / segment);

        if (i === index) return 1;                 // always fully visible
        if (i + 1 === index) return 0.4 + p * 0.6; // never 0 → prevents invisibility

        return 0.2;
      }),

      scale: useTransform(progressInSegment, (p) => {
        const i = Math.floor(scrollYProgress.get() / segment);

        if (i === index) return 1;
        if (i + 1 === index) return 0.96 + p * 0.04;

        return 0.94;
      }),

      color: useTransform(progressInSegment, (p) => {
        const i = Math.floor(scrollYProgress.get() / segment);

        if (i === index) return "#ffffff";
        return "#555555"; // ALL others dim (your requirement)
      })
    };
  };

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#131313] whitespace-nowrap">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT – IMAGES */}
          <div className="relative w-full aspect-video lg:aspect-[4/3]">

            {[
              "digital-experience.png",
              "immersive-experience.png",
              "event-brand-experience.png",
              "simulation-learning.png"
            ].map((src, i) => (
              <motion.div
                key={i}
                style={getImageStyle(i)}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={`/images/offerings/${src}`}
                  alt=""
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}

          </div>

          {/* RIGHT – TEXT */}
          <div className="flex flex-col space-y-4">

            <p className="text-[#888888] text-sm md:text-lg mb-2">
              Area of focus
            </p>

            {[
              "Digital Experience",
              "Immersive Experience",
              "Event & Brand Experiences",
              "Simulation-Based Learning"
            ].map((text, i) => (
              <motion.h3
                style={getTextStyle(i)}
                className="text-2xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-semibold tracking-tight origin-left whitespace-nowrap"
              >
                {text}
              </motion.h3>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}