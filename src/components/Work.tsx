"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                            CONFIGURATION                                   */
/* -------------------------------------------------------------------------- */

const TEXT_COLUMN_WIDTH = "40%";
const IMAGE_COLUMN_WIDTH = "60%";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const WORKS = [
  {
    title: "Visualizing the Future: The Varanasi Ropeway VR Experience",
    description:
      "A fully immersive VR Experience of Varanasi, a futuristic ropeway.",
    image: "/images/work/Varanasi.png",
    align: "right" as const,
  },
  {
    title: "Adani Centre of Excellence: Immersive Mining Education Experience",
    description:
      "Photorealistic digital simulation with audio, interaction, and mining topic demonstrations.",
    image: "/images/work/Adani.png",
    align: "left" as const,
  },
  {
    title: "Holographic Digital Twin for Noida International Airport",
    description:
      "An interactive 3D holographic simulation for large-scale infrastructure planning.",
    image: "/images/work/NIA.png",
    align: "right" as const,
  },
  {
    title: 'Interactive Digital Experiences for CSMVS "Network of the Past"',
    description:
      'Four interactive digital experiences for the "Network of the Past" exhibition.',
    image: "/images/work/CSMVS.png",
    align: "left" as const,
  },
];

/* -------------------------------------------------------------------------- */
/*                             MOTION CONFIGURATION                           */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTION_BACKGROUND = "#131313";
const ENTRY_MARGIN = "-10% 0px -10% 0px";

/* -------------------------------------------------------------------------- */
/*                               READ MORE CTA                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                               READ MORE CTA                                */
/* -------------------------------------------------------------------------- */

function ReadMoreCTA() {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
      className="group relative inline-flex items-center mt-6 cursor-pointer"
    >
      {/* Text with underline animation */}
      <span className="relative text-xs uppercase tracking-[0.2em] text-[#888888] font-medium transition-colors duration-300 group-hover:text-[#F5F2EB]">
        Read More
        {/* Underline - hidden by default, reveals from left to right on hover */}
        <span
          className="pointer-events-none absolute left-0 top-[1.5em] h-[0.05em] w-full bg-current content-['']
          origin-right scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          group-hover:origin-left group-hover:scale-x-100"
        />
      </span>

      {/* Arrow icon - fixed viewBox to prevent cutoff */}
      <svg
        className="ml-[0.3em] mt-[0.1em] size-[0.65em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.5 10.5L10.5 1.5M10.5 1.5V9M10.5 1.5H3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*                               WORK ITEM                                    */
/* -------------------------------------------------------------------------- */

interface WorkItemProps {
  title: string;
  description: string;
  image: string;
  align: "left" | "right";
  index: number;
}

function WorkItem({ title, description, image, align, index }: WorkItemProps) {
  const itemRef = useRef(null);

  const isVisible = useInView(itemRef, {
    margin: ENTRY_MARGIN,
    once: true,
  });

  const imageVariant = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 1.03,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: EASE,
        delay: 0.05,
      },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: EASE,
        delay: 0.2,
      },
    },
  };

  const imageOnLeft = align === "left";

  return (
    <div
      ref={itemRef}
      className="relative flex flex-col lg:flex-row items-stretch gap-0 py-16 lg:py-8"
    >
      {/* ==================== TEXT COLUMN ==================== */}

      <div
        className={`w-full lg:w-[${TEXT_COLUMN_WIDTH}] flex flex-col justify-end px-6 md:px-8 lg:px-12 pb-8 lg:pb-0 ${imageOnLeft ? "lg:order-2" : "lg:order-1"
          }`}
      >
        <motion.h3
          variants={textVariant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-semibold tracking-[-0.025em] text-[#F5F2EB] mb-5"
        >
          {title}
        </motion.h3>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.1, ease: EASE, delay: 0.32 },
            },
          }}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-[#888888] text-sm md:text-base leading-[1.7] max-w-[380px]"
        >
          {description}
        </motion.p>

        {/* Read More CTA */}
        <ReadMoreCTA />
      </div>

      {/* ==================== IMAGE COLUMN ==================== */}

      <motion.div
        variants={imageVariant}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        whileHover="hover"
        className={`w-full lg:w-[${IMAGE_COLUMN_WIDTH}] relative overflow-hidden group cursor-pointer ${imageOnLeft ? "lg:order-1" : "lg:order-2"
          }`}
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <motion.div
            variants={{
              hover: {
                scale: 1.06,
                transition: {
                  duration: 1.2,
                  ease: EASE,
                },
              },
            }}
            className="w-full h-full"
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-all duration-700 group-hover:brightness-110"
              priority={index === 0}
            />
          </motion.div>

          <motion.div
            variants={{
              hover: {
                opacity: 0.7,
              },
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-40 pointer-events-none"
          />

          <motion.div
            variants={{
              hover: {
                opacity: 1,
              },
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 opacity-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function Work() {
  const headerRef = useRef(null);
  const isHeaderVisible = useInView(headerRef, {
    margin: ENTRY_MARGIN,
    once: true,
  });

  return (
    <section
      style={{ background: SECTION_BACKGROUND }}
      className="relative w-full overflow-hidden"
    >
      {/* ======================== SECTION HEADER ======================== */}

      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 text-center"
      >
        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={
              isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
            }
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
            className="text-[clamp(2.4rem,6vw,5.5rem)] font-semibold tracking-[-0.04em] text-[#F5F2EB] leading-[1.0] mb-6"
          >
            The Worlds We&apos;ve Built
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
          className="text-[#555555] text-sm md:text-base max-w-lg mx-auto leading-[1.7]"
        >
          Blending technology, design, and storytelling to craft unforgettable
          immersive environments.
        </motion.p>
      </div>

      {/* ======================= DIVIDER ======================== */}

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#222222] w-full" />
      </div>

      {/* ======================== WORK ITEMS ======================== */}

      <div className="max-w-7xl mx-auto">
        {WORKS.map((work, index) => (
          <div key={index}>
            <WorkItem
              title={work.title}
              description={work.description}
              image={work.image}
              align={work.align}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* ===================== BOTTOM PADDING ===================== */}
      <div className="h-28" />
    </section>
  );
}