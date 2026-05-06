"use client";

import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section className="relative z-20 bg-[#131313] py-32 px-6 md:px-24 min-h-screen flex items-center justify-center">
      {/* Section Change Banner */}
      <div
        className="absolute top-0 left-0 w-full h-48 md:h-72 pointer-events-none -translate-y-full"
        style={{
          background: "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 50%, rgba(19, 19, 19, 0.00) 50%, rgba(19, 19, 19, 0.04) 56.5%, rgba(19, 19, 19, 0.13) 62.5%, rgba(19, 19, 19, 0.26) 67.5%, rgba(19, 19, 19, 0.42) 72.5%, rgba(19, 19, 19, 0.58) 77.5%, rgba(19, 19, 19, 0.74) 82.5%, rgba(19, 19, 19, 0.87) 87.5%, rgba(19, 19, 19, 0.96) 93.5%, #131313 100%)"
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-10 relative z-10 w-full">
        <motion.h3
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-[#F5F2EB] leading-[1.1]"
        >
          Four ways<br />we bring ideas<br />to life.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-neutral-200 max-w-2xl leading-relaxed font-normal"
        >
          From immersive spaces to digital platforms, we design
          experiences that help brands communicate, train, and
          engage at scale.
        </motion.p>
      </div>
    </section>
  );
}
