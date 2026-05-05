"use client";

import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [showSection1, setShowSection1] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.06 && showSection1) {
      setShowSection1(false);
    } else if (latest <= 0.06 && !showSection1) {
      setShowSection1(true);
    }
  });

  // Section 1 (0% scroll): "VIITOR X" and "SCROLL"
  const opacity1 = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.05], [0, -60]);

  // Section 2 (30% scroll): "We build digital experiences." (Left aligned)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.55], [100, -100]);

  // Section 3 (60% scroll): "Bridging design and engineering." (Right aligned)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.9], [100, -100]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none px-6 md:px-24">
      {/* Section 1 */}
      {showSection1 && (
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-between py-16 text-center"
        >
          <div className="relative w-40 md:w-52 drop-shadow-2xl">
            <Image 
              src="/images/VI ITO R X.svg" 
              alt="VIITOR X" 
              width={208} 
              height={80}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="text-sm tracking-[0.5em] text-[#B09B8B] drop-shadow-xl uppercase pl-[0.5em]">
            SCROLL
          </p>
        </motion.div>
      )}

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center pt-32 md:pt-48 text-left px-12 md:px-32"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#FFFFFF] max-w-2xl drop-shadow-2xl">
          The future is <br />
          <span className="text-[#815948] font-medium tracking-normal">immersive.</span>
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center pt-32 md:pt-48 text-right px-12 md:px-32"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#FFFFFF] max-w-2xl drop-shadow-2xl">
          We design how it’s{" "}
          <span className="text-[#815948] font-medium tracking-normal">experienced.</span>
        </h2>
      </motion.div>
    </div>
  );
}
