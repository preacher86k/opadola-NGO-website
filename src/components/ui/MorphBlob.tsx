"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MorphBlobProps {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export default function MorphBlob({
  className = "",
  color = "var(--color-primary)",
  size = 120,
  duration = 12,
  delay = 0,
}: MorphBlobProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  const blobPath = "M40,-35C50,-20,55,-5,52,10C49,25,38,40,22,46C6,52,-12,49,-25,40C-38,31,-45,16,-48,0C-51,-16,-49,-32,-38,-42C-27,-52,-10,-55,5,-53C20,-51,30,-50,40,-35Z";

  return (
    <motion.div
      className={`morph-blob ${className}`}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        pointerEvents: "none",
        zIndex: 0,
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <svg viewBox="-60 -60 120 120" width="100%" height="100%" style={{ overflow: "visible" }}>
        <motion.path
          fill={color}
          opacity={0.12}
          animate={{
            d: [
              blobPath,
              "M45,-30C52,-15,50,5,42,20C34,35,15,45,-3,47C-21,49,-38,40,-48,25C-58,10,-60,-10,-52,-25C-44,-40,-25,-50,-8,-48C9,-46,25,-40,45,-30Z",
              blobPath,
            ],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
