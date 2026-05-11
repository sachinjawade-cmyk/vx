"use client";

import { useRef } from "react";
import Image from "next/image";

import {
  motion,
  useInView,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const PARTNERS = [
  {
    name: "Futurotec",
    logo: "/images/partners/futurotec.svg",
  },

  {
    name: "Opezee",
    logo: "/images/partners/opezee.svg",
  },
];

/* -------------------------------------------------------------------------- */
/*                              SECTION CONFIG                                */
/* -------------------------------------------------------------------------- */

const SECTION_BACKGROUND = "#131313";

const CINEMATIC_EASE = [
  0.22,
  1,
  0.36,
  1,
] as const;

/* -------------------------------------------------------------------------- */
/*                              MOTION VARIANTS                               */
/* -------------------------------------------------------------------------- */

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1.2,
      ease: CINEMATIC_EASE,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function Partners() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const isVisible =
    useInView(sectionRef, {
      margin:
        "-15% 0px -15% 0px",

      once: false,
    });

  return (
    <section
      ref={sectionRef}
      style={{
        background:
          SECTION_BACKGROUND,
      }}
      className="
        relative
        w-full
        min-h-screen
        overflow-hidden

        flex
        items-center
        justify-center

        py-28
      "
    >


      {/* ================================================================== */}
      {/*                              CONTENT                               */}
      {/* ================================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={
          isVisible
            ? "visible"
            : "hidden"
        }
        className="
          relative
          z-10

          w-full
          max-w-7xl

          mx-auto
          px-6
          md:px-12

          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* ================================================================== */}
        {/*                              HEADLINE                              */}
        {/* ================================================================== */}

        <div
          className="
            relative

            flex
            flex-col
            items-center
            justify-center

            mb-24
          "
        >
          {/* ---------------------- BACK HEADLINE ---------------------- */}

          <motion.h2
            variants={fadeUp}
            className="
              text-[clamp(4rem,10vw,9rem)]

              leading-[1.5]

              font-semibold

              tracking-[-0.02em]

              text-[#343434]

              whitespace-nowrap

              select-none
            "
          >
            Shaping Experiences
          </motion.h2>

          {/* ---------------------- FRONT HEADLINE --------------------- */}

          <motion.h3
            variants={fadeUp}
            className="
              -mt-3

              text-[clamp(4rem,10vw,8rem)]

              leading-[0.8]

              font-semibold
              italic

              tracking-[-0.02em]

              text-[#F5F2EB]

              select-none
            "
          >
            Together
          </motion.h3>
        </div>

        {/* ================================================================== */}
        {/*                             PARTNERS                               */}
        {/* ================================================================== */}

        <motion.div
          variants={containerVariants}
          className="
            flex
            flex-wrap
            justify-center

            gap-6

            mb-16
          "
        >
          {PARTNERS.map(
            (partner) => (
              <motion.div
                key={partner.name}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  scale: 1.02,

                  transition: {
                    duration: 0.4,
                    ease: CINEMATIC_EASE,
                  },
                }}
                className="
                  relative

                  flex
                  items-center
                  justify-center

                  w-[240px]
                  h-[110px]

                  rounded-[18px]

                  bg-[black/40]

                  border
                  border-white/[0.08]

                  backdrop-blur-xl

                  overflow-hidden

                  group
                  cursor-pointer
                "
              >
                {/* ---------------------- HOVER LIGHT ---------------------- */}

                <div
                  className="
                    absolute
                    inset-0

                    opacity-0
                    group-hover:opacity-100

                    transition-opacity
                    duration-500

                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.04]
                    to-transparent
                  "
                />

                {/* ------------------------- LOGO -------------------------- */}

                <div
                  className="
                    relative

                    w-[160px]
                    h-[70px]
                  "
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="
                      object-contain
                    "
                  />
                </div>
              </motion.div>
            )
          )}
        </motion.div>

        {/* ================================================================== */}
        {/*                                CTA                                 */}
        {/* ================================================================== */}

        <motion.a
          variants={fadeUp}
          href="#"
          className="
            group
            relative

            text-[#F5F2EB]

            text-sm
            md:text-[15px]

            uppercase

            tracking-[0.14em]

            font-medium

            pb-1

            hover:opacity-70

            transition-opacity
            duration-500
          "
        >
          Join our partner network

          <span
            className="
              absolute
              left-0
              bottom-0

              w-full
              h-px

              bg-[#F5F2EB]

              origin-left

              transition-transform
              duration-500

              group-hover:scale-x-0
            "
          />
        </motion.a>
      </motion.div>
    </section>
  );
}