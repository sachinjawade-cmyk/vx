"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                  CONTENT                                   */
/* -------------------------------------------------------------------------- */

const POSTS = [
  {
    id: 1,
    image: "/images/blog/Immersive.png",
    title: "Immersive Showroom Design",
    description:
      "Creating immersive environments that help brands communicate complex value propositions visually.",
  },
  {
    id: 2,
    image: "/images/blog/Government Tourism.png",
    title: "Real-Time Visitor Analytics",
    description:
      "Interactive dashboards and spatial systems that reveal visitor engagement patterns in real time.",
  },
  {
    id: 3,
    image: "/images/blog/The ROI.png",
    title: "Collaborative Experience Systems",
    description:
      "Multi-user immersive systems that enable teams to collaborate seamlessly across environments.",
  },
];

/* -------------------------------------------------------------------------- */
/*                             MOTION CONFIG                                  */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*                             BLOG CARD                                      */
/* -------------------------------------------------------------------------- */

function BlogCard({
  post,
  index,
}: {
  post: (typeof POSTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isVisible = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        ease: EASE,
        delay: index * 0.08,
      }}
      className="group"
    >
      {/* IMAGE */}

      <div
        className="
          relative
          aspect-[4/5]
          overflow-hidden
          rounded-[28px]
          bg-[#181818]
          mb-5
        "
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.03]
          "
          priority={index === 0}
        />

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/30
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* TITLE */}

      <h3
        className="
          text-[#F5F5F5]
          text-[1.15rem]
          md:text-[1.25rem]
          leading-[1.3]
          font-medium
          tracking-[-0.03em]
          mb-3
        "
      >
        {post.title}
      </h3>

      {/* DESCRIPTION */}

      <p
        className="
          text-[#7A7A7A]
           text-[1rem]
          leading-[1.5]
        "
      >
        {post.description}
      </p>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function Blog() {
  const headerRef = useRef<HTMLDivElement>(null);

  const isHeaderVisible = useInView(headerRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <section
      className="
        relative
        w-full
        bg-[#0A0A0A]
        overflow-hidden
      "
    >
      {/* =============================================================== */}
      {/*                           HEADER                                */}
      {/* =============================================================== */}

      <div
        ref={headerRef}
        className="
          max-w-[1600px]
          mx-auto
          px-6
          md:px-10
          lg:px-14
          pt-24
          md:pt-32
          pb-20
        "
      >
        {/* TOP LABEL */}
{ /*
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
          className="
            inline-flex
            items-center
            border
            border-[#2A2A2A]
            rounded-full
            px-4
            py-2
            mb-10
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-[#8A8A8A]
            "
          >
            Insights
          </span> 
        </motion.div>
*/}
        {/* TITLE + DESCRIPTION */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-14
            gap-10
            items-end
        
            pt-10
          "
        >
          {/* LEFT TITLE */}

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              ease: EASE,
              delay: 0.08,
            }}
            className="lg:col-span-7"
          >
            <h2
              className="
                text-[clamp(2.8rem,5vw,5.5rem)]
                leading-[0.98]
                tracking-[-0.05em]
                font-semibold
                text-[#F5F5F5]
                max-w-[900px]
              "
            >
              Where Ideas Become Experiences

            </h2>
          </motion.div>

          {/* RIGHT DESCRIPTION */}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              ease: EASE,
              delay: 0.18,
            }}
            className="lg:col-span-4 lg:col-start-9"
          >
            <p
              className="
                text-[#777777]
                text-sm
                md:text-[18px]
                leading-[1.4]
                max-w-[320px]
              "
            >
              Insights and perspectives on immersive design, technology, and human connection.
            </p>
          </motion.div>
        </div>
      </div>

      {/* =============================================================== */}
      {/*                            GRID                                 */}
      {/* =============================================================== */}

      <div
        className="
          max-w-[1600px]
          mx-auto
          px-6
          md:px-10
          lg:px-14
          pb-28
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            lg:gap-8
          "
        >
          {POSTS.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}