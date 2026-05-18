"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const WORKS = [
  {
    title: "Visualizing the Future: The Varanasi Ropeway VR Experience",
    description:
      "A fully immersive VR Experience of Varanasi, a futuristic ropeway.",
    image: "/images/work/Varanasi.png",
    align: "right" as const, // image on right, text on left
  },
  {
    title: "Adani Centre of Excellence: Immersive Mining Education Experience",
    description:
      "Photorealistic digital simulation with audio, interaction, and mining topic demonstrations.",
    image: "/images/work/Adani.png",
    align: "left" as const, // image on left, text on right
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
  const itemRef = useRef<HTMLDivElement>(null);

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

  const labelVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: EASE,
        delay: 0.1,
      },
    },
  };

  /* Image is offset right or left; text fills the opposite column */
  const imageOnLeft = align === "left";

  return (
    <div
      ref={itemRef}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-center"
    >
      {/* ==================== IMAGE COLUMN ==================== */}

      <motion.div
        variants={imageVariant}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className={`relative overflow-hidden ${imageOnLeft ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Aspect ratio wrapper */}
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
          />
          {/* Subtle inner vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* ==================== TEXT COLUMN ==================== */}

      <div
        className={`
          flex flex-col justify-center
          px-8 md:px-14 lg:px-16
          py-12 lg:py-0
          ${imageOnLeft ? "lg:order-2" : "lg:order-1"}
        `}
      >
        {/* Index label */}
        <motion.span
          variants={labelVariant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-xs uppercase tracking-[0.22em] text-[#555555] mb-5 font-light"
        >
          {String(index + 1).padStart(2, "0")} / {String(WORKS.length).padStart(2, "0")}
        </motion.span>

        {/* Title */}
        <motion.h3
          variants={textVariant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="
            text-[clamp(1.6rem,3vw,2.6rem)]
            leading-[1.1]
            font-semibold
            tracking-[-0.025em]
            text-[#F5F2EB]
            mb-5
          "
        >
          {title}
        </motion.h3>

        {/* Description */}
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
          className="text-[#666666] text-sm md:text-base leading-[1.7] max-w-[380px]"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function Work() {
  const headerRef = useRef<HTMLDivElement>(null);
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
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: EASE }}
          className="text-xs uppercase tracking-[0.22em] text-[#555555] mb-6 font-light"
        >
          Selected Work
        </motion.p>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={
              isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
            }
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
            className="
              text-[clamp(2.4rem,6vw,5.5rem)]
              font-semibold
              tracking-[-0.04em]
              text-[#F5F2EB]
              leading-[1.0]
              mb-6
            "
          >
            The Worlds We&apos;ve Built
          </motion.h2>
        </div>

        {/* Subtitle */}
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
            {/* Divider between items */}
            {index < WORKS.length - 1 && (
              <div className="px-6 md:px-12">
                <div className="h-px bg-[#1E1E1E] w-full" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===================== BOTTOM PADDING ===================== */}
      <div className="h-28" />
    </section>
  );
}
