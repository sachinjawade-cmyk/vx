"use client";

import { useEffect, useRef, useState } from "react";
import { useTransform, MotionValue } from "framer-motion";

const FRAME_COUNT = 146;

const preloadImages = () => {
  const images: HTMLImageElement[] = [];
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const paddedIndex = i.toString().padStart(3, "0");
    const img = new Image();
    img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
    images.push(img);
  }
  return images;
};

export default function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Map scroll progress to a frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload images once on mount
    const preloaded = preloadImages();
    setImages(preloaded);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const render = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[index];
      if (!img || !img.complete) return;

      // Ensure canvas dimensions match window for high-res rendering
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Object-fit: cover logic
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    // Initial render
    render(0);

    // Render on scroll
    const unsubscribe = frameIndex.on("change", (latest) => {
      render(Math.round(latest));
    });

    // Re-render on resize
    const handleResize = () => render(Math.round(frameIndex.get()));
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />;
}
