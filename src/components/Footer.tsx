"use client";

import Link from "next/link";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*                                  DATA                                      */
/* -------------------------------------------------------------------------- */

const NAV_LINKS = [
  "Offerings",
  "Work",
  "Trusted by",
  "Industries",
  "Insights",
  "Contact Us",
];

const SOCIALS = [
  {
    icon: "/images/instagrm.svg",
    href: "#",
    alt: "Instagram",
  },
  {
    icon: "/images/linkedin.svg",
    href: "#",
    alt: "LinkedIn",
  },
  {
    icon: "/images/x.svg",
    href: "#",
    alt: "X",
  },
  {
    icon: "/images/youtube.svg",
    href: "#",
    alt: "YouTube",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >
      {/* =========================================================== */}
      {/*                    BACKGROUND GLOW                          */}
      {/* =========================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-90
        "
      >
        {/* LEFT GLOW */}

        <div
          className="
            absolute
            left-[-10%]
            bottom-[-20%]
            w-[45vw]
            h-[45vw]
            rounded-full
            blur-[140px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(164,119,100,0.55) 0%, rgba(164,119,100,0.15) 40%, transparent 75%)",
          }}
        />

        {/* CENTER GLOW */}

        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            bottom-[-30%]
            w-[55vw]
            h-[55vw]
            rounded-full
            blur-[160px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(164,119,100,0.45) 0%, rgba(164,119,100,0.10) 45%, transparent 80%)",
          }}
        />

        {/* RIGHT GLOW */}

        <div
          className="
            absolute
            right-[-10%]
            bottom-[-20%]
            w-[45vw]
            h-[45vw]
            rounded-full
            blur-[140px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(164,119,100,0.60) 0%, rgba(164,119,100,0.12) 40%, transparent 75%)",
          }}
        />
      </div>

      {/* =========================================================== */}
      {/*                         MAIN AREA                           */}
      {/* =========================================================== */}

      <div
        className="
          relative
          z-10
          max-w-[1700px]
          mx-auto
          px-6
          md:px-10
          lg:px-14
          pt-16
          md:pt-20
          lg:pt-24
          pb-10
        "
      >
        {/* ======================================================= */}
        {/*                       TOP AREA                          */}
        {/* ======================================================= */}

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
          "
        >

                  {/* ======================================================= */}
        {/*                       LOGO AREA                         */}
        {/* ======================================================= */}

        <div
          className="
            relative
            mt-20
            flex
            items-center
            justify-center
          "
        >
          <Image
            src="/images/footer-logo.svg"
            alt="ViitorX"
            width={400}
            height={400}
            priority
            className="
              w-full
              h-auto
              max-w-[400px]
              opacity-[0.96]
              select-none
              pointer-events-none
            "
          />
        </div>
          {/* =================================================== */}
          {/*                    SOCIAL ICONS                     */}
          {/* =================================================== */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-4
            "
          >
            {SOCIALS.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="
                  group
                  w-[54px]
                  h-[54px]
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  hover:border-[#A47764]
                  hover:bg-[#A47764]/10
                  hover:-translate-y-[2px]
                "
              >
                <Image
                  src={social.icon}
                  alt={social.alt}
                  width={20}
                  height={20}
                  className="
                    opacity-90
                    transition-all
                    duration-300
                    group-hover:opacity-100
                    group-hover:scale-110
                  "
                />
              </Link>
            ))}
          </div>

          {/* =================================================== */}
          {/*                    NAVIGATION                       */}
          {/* =================================================== */}

          <nav
            className="
              mt-14
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-10
              gap-y-5
            "
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item}
                href="#"
                className="
                  group
                  relative
                  text-[1.15rem]
                  md:text-[1.25rem]
                  font-medium
                  tracking-[-0.03em]
                  text-white/88
                  transition-all
                  duration-300
                  hover:text-[#E6C6B7]
                  hover:-translate-y-[2px]
                "
              >
                {item}

                {/* UNDERLINE */}

                <span
                  className="
                    absolute
                    left-0
                    -bottom-1
                    h-px
                    w-0
                    bg-[#A47764]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* ======================================================= */}
        {/*                     DIVIDER LINE                        */}
        {/* ======================================================= */}

        <div
          className="
            mt-16
            border-t
            border-white/10
          "
        />

        {/* ======================================================= */}
        {/*                    BOTTOM META                          */}
        {/* ======================================================= */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
            relative
          "
        >
          {/* LEFT */}

          <div
            className="
              text-[0.95rem]
              text-white/45
              tracking-[-0.02em]
            "
          >
            Powered by{" "}
            <span
              className="
                text-[#E6C6B7]
                font-semibold
              "
            >
              ViitorCloud
            </span>
          </div>

          {/* CENTER */}

          <div
            className="
              text-[0.95rem]
              text-white/45
              tracking-[-0.02em]
              md:absolute
              md:left-1/2
              md:-translate-x-1/2
            "
          >
            © 2026 ViitorX. All rights reserved.
          </div>

          {/* RIGHT */}

          <div
            className="
              text-[0.95rem]
              text-white/35
              tracking-[-0.02em]
            "
          >
            Immersive Digital Experiences
          </div>
        </div>


      </div>
    </footer>
  );
}