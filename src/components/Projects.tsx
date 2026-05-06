"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const headlineLines = [
  "Four ways",
  "we bring ideas",
  "to life.",
];

export default function Projects() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    margin: "-20% 0px -20% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-[#131313] py-32 md:py-44 px-6 md:px-24 overflow-hidden"
    >
      {/* Section Change Banner */}
      <div
        className="absolute top-0 left-0 w-full h-48 md:h-72 pointer-events-none -translate-y-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 50%, rgba(19, 19, 19, 0.00) 50%, rgba(19, 19, 19, 0.04) 56.5%, rgba(19, 19, 19, 0.13) 62.5%, rgba(19, 19, 19, 0.26) 67.5%, rgba(19, 19, 19, 0.42) 72.5%, rgba(19, 19, 19, 0.58) 77.5%, rgba(19, 19, 19, 0.74) 82.5%, rgba(19, 19, 19, 0.87) 87.5%, rgba(19, 19, 19, 0.96) 93.5%, #131313 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Headline */}
        <div className="leading-[0.88] tracking-[-0.06em]">
          {headlineLines.map((line, index) => (
            <div
              key={index}
            //className="overflow-hidden"
            >
              <motion.h2
                initial={{ y: 140, opacity: 0 }}
                animate={
                  isInView
                    ? { y: 0, opacity: 1 }
                    : { y: 140, opacity: 0 }
                }
                transition={{
                  duration: 1.2,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[72px] sm:text-[92px] md:text-[120px] lg:text-[160px] font-semibold text-[#F5F2EB] will-change-transform"
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{
            duration: 1,
            delay: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 max-w-2xl text-lg md:text-2xl leading-[1.45] text-[#D1D1D1]"
        >
          From immersive spaces to digital platforms, we design
          experiences that help brands communicate, train, and
          engage at scale.
        </motion.p>
      </div>
    </section>
  );
}