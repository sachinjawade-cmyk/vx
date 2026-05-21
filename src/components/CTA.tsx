"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                               MOTION CONFIG                                */
/* -------------------------------------------------------------------------- */

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

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
    y: 60,
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
/*                                CTA SECTION                                 */
/* -------------------------------------------------------------------------- */

export default function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hovered, setHovered] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                 SCROLL FX                                  */
  /* -------------------------------------------------------------------------- */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ====================== BACKGROUND MOTION ====================== */

  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.08]
  );

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -80]
  );

  /* ====================== CONTENT MOTION ====================== */

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [0, 1, 1, 0]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [80, 0, -100]
  );

  const isVisible = useInView(sectionRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  /* -------------------------------------------------------------------------- */
  /*                                VIDEO PLAY                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-black"
    >
      {/* ====================== STICKY SCREEN ====================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >
        {/* ====================== VIDEO BACKGROUND ====================== */}

        <motion.div
          style={{
            scale: bgScale,
            y: bgY,
          }}
          className="absolute inset-0 z-0"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          >
            <source
              src="/images/cta-video-bg.mp4"
              type="video/mp4"
            />
          </video>

          {/* ====================== DARK OVERLAY ====================== */}

          <div className="absolute inset-0 bg-black/45 z-10" />
        </motion.div>

        {/* ====================== CONTENT ====================== */}

        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
          className="
            relative
            z-20
            w-full
            max-w-7xl
            mx-auto
            px-6
            md:px-12
            text-center
          "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            {/* ====================== HEADLINE 1 ====================== */}

            <div className="overflow-hidden mb-4">
              <motion.h2
                variants={fadeUp}
                className="
                  text-[clamp(3rem,8vw,1rem)]
                  font-semibold
                  tracking-[-0.04em]
                  leading-[0.95]
                  text-[#F5F2EB]
                "
              >
                Ideas are invisible.
              </motion.h2>
            </div>

            {/* ====================== HEADLINE 2 ====================== */}

            <div className="overflow-hidden mb-14">
              <motion.h2
                variants={fadeUp}
                className="
                  text-[clamp(3.5rem,9vw,9rem)]
                  font-semibold
                  tracking-[-0.05em]
                  leading-[0.9]
                  text-[#FFF]
                "
              >
                Until we make them real.
              </motion.h2>
            </div>

            {/* ====================== BUTTON ====================== */}

            <motion.div variants={fadeUp}>
              <motion.button
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                whileTap={{ scale: 0.97 }}
                className="
                  relative
                  overflow-hidden
                  rounded-full
                  border
                  border-white/20
                  px-10
                  py-5
                  uppercase
                  tracking-[0.12em]
                  text-white
                  text-sm
                  font-medium
                  backdrop-blur-sm
                "
              >
                {/* ====================== HOVER FILL ====================== */}

                <motion.div
                  animate={{
                    scaleX: hovered ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: CINEMATIC_EASE,
                  }}
                  style={{
                    transformOrigin: "left",
                  }}
                  className="
                    absolute
                    inset-0
                    bg-[#C39E88]/20
                  "
                />

                {/* ====================== BUTTON TEXT ====================== */}

                <span className="relative z-10">
                  Start Project
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ====================== BOTTOM GRADIENT ====================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-40
            bg-gradient-to-t
            from-black
            to-transparent
            z-20
            pointer-events-none
          "
        />
      </div>

      {/* ====================== BOTTOM EDGE BLEND ====================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-40
          bg-gradient-to-t
          from-black
          to-transparent
          z-20
          pointer-events-none
        "
      />
    </section>
  );
}
