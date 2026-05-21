"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Offerings from "@/components/Offerings";
import Philosophy from "@/components/Philosophy";
import Partners from "@/components/Partners";
import Work from "@/components/Work";
import Clients from "@/components/Clients";
import Industries from "@/components/Industries";
import CTA from "@/components/CTA";
import { useScroll } from "framer-motion";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll specifically over the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="relative min-h-screen bg-[#121212] selection:bg-white selection:text-black">
      {/* 500vh container to drive the animation length */}
      <div ref={containerRef} className="relative h-[500vh]">
        {/* Sticky viewport container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <ScrollyCanvas scrollYProgress={scrollYProgress} />
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* Renders after the scroll sequence finishes */}
      <Projects />

      <Philosophy />

      <Offerings />

      <Clients />

      <Work />

      <Industries />

      <Partners />

      <CTA />

      <footer className="py-12 border-t border-neutral-900 text-center text-neutral-500 text-sm bg-[#121212]">
        <p>© {new Date().getFullYear()} John Doe. Built with Next.js & Framer Motion.</p>
      </footer>
    </main>
  );
}
