"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  X,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  SERVICES                                  */
/* -------------------------------------------------------------------------- */

const SERVICES = [
  "Immersive Experience Centres",
  "Simulation-Based Learning",
  "Event & Brand Activation",
  "Digital Experiences",
];

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */

export default function InquirySection() {
  const [selectedService, setSelectedService] =
    useState("Immersive Experience Centres");

  return (
    <section
      className="
        relative
        min-h-screen
        bg-[#0A0A0A]
        overflow-hidden
        px-4
        py-16
        md:px-8
        lg:px-12
      "
    >
      {/* =============================================================== */}
      {/*                           MAIN CARD                             */}
      {/* =============================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          max-w-[1500px]
          mx-auto
          bg-[#F0F0E5]
          rounded-[36px]
          border-[3px]
          border-black
          overflow-hidden
          shadow-[0_40px_120px_rgba(0,0,0,0.45)]
        "
      >
       

        {/* =========================================================== */}
        {/*                           CONTENT                          */}
        {/* =========================================================== */}

        <div
          className="
            relative
            z-10
            px-8
            py-14
            md:px-14
            md:py-20
            lg:px-20
          "
        >
          {/* ======================================================= */}
          {/*                       INTRO LINE                        */}
          {/* ======================================================= */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-4
              text-[clamp(1.8rem,3vw,3rem)]
              leading-[1.15]
              tracking-[-0.05em]
              font-semibold
              text-[#111111]
            "
          >
            <span>My name is</span>

            <input
              type="text"
              placeholder="your name"
              className="
                bg-transparent
                border-b-2
                border-[#A47764]
                text-[#A47764]
                outline-none
                min-w-[220px]
                pb-2
                placeholder:text-[#BDB8AF]
              "
            />

            <span>from</span>

            <input
              type="text"
              placeholder="your company"
              className="
                bg-transparent
                border-b-2
                border-[#D7D1C7]
                text-[#111111]
                outline-none
                min-w-[240px]
                pb-2
                placeholder:text-[#BDB8AF]
              "
            />
          </div>

          {/* ======================================================= */}
          {/*                    CAPSULE SECTION                      */}
          {/* ======================================================= */}

          <div className="mt-16">
            <h3
              className="
                text-[clamp(1.8rem,3vw,3rem)]
                leading-[1.2]
                tracking-[-0.04em]
                font-semibold
                text-[#111111]
                mb-7
              "
            >
              and I&apos;m curious about...
            </h3>

            {/* CAPSULES */}

            <div className="flex flex-wrap gap-3">
              {SERVICES.map((service) => {
                const active = selectedService === service;

                return (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`
                      px-6
                      py-3
                      rounded-full
                      border
                      text-[0.95rem]
                      font-medium
                      tracking-[-0.02em]
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-[#151515] text-white border-[#151515]"
                          : "bg-transparent text-[#111111] border-[#1B1B1B]"
                      }
                    `}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================= */}
          {/*                    CONTACT SECTION                      */}
          {/* ======================================================= */}

          <div className="mt-20">
            {/* EMAIL */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-4
                text-[clamp(1.8rem,3vw,3rem)]
                leading-[1.2]
                tracking-[-0.04em]
                font-semibold
                text-[#111111]
              "
            >
              <span>Get in touch with me at</span>

              <input
                type="email"
                placeholder="your@email.com"
                className="
                  flex-1
                  min-w-[320px]
                  bg-transparent
                  border-b-2
                  border-[#D6D1C7]
                  text-[#111111]
                  outline-none
                  placeholder:text-[#B7B7B7]
                  pb-2
                "
              />
            </div>

            {/* MOBILE */}

            <div className="mt-12">
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-4
                  text-[clamp(1.8rem,3vw,3rem)]
                  leading-[1.2]
                  tracking-[-0.04em]
                  font-semibold
                  text-[#111111]
                "
              >
                <span>or call me at</span>

                <input
                  type="tel"
                  placeholder="+91 99999 99999"
                  className="
                    flex-1
                    min-w-[260px]
                    bg-transparent
                    border-b-2
                    border-[#D6D1C7]
                    text-[#111111]
                    outline-none
                    placeholder:text-[#B7B7B7]
                    pb-2
                  "
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <div className="mt-16 flex justify-start">
              <button
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  px-10
                  py-5
                  rounded-full
                  bg-[#A47764]
                  text-white
                  text-[1rem]
                  font-medium
                  tracking-[-0.02em]
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:bg-[#1ea45f]
                "
              >
                SUBMIT
                
              </button>
            </div>
          </div>

          {/* ======================================================= */}
          {/*                        FOOTER                           */}
          {/* ======================================================= */}

          <div
            className="
              mt-16
              pt-8
              border-t
              border-[#DDD7CC]
              flex
              flex-wrap
              items-center
              gap-6
              text-[#777777]
              text-sm
            "
          >
            <div className="flex items-center gap-2">
              <Mail size={18} />
              support@viitorx.com
            </div>

            {/* <div className="flex items-center gap-2">
              <Phone size={16} />
              +91 99999 99999
            </div>
            */}

            <div className="flex items-center gap-2">
              <Building2 size={18} />
              Ahmedabad, India
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
