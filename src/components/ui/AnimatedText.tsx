"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedTextProps {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function AnimatedText({
  lines,
  className = "",
  delay = 0,
  stagger = 0.25,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const lineVariant = {
    hidden: { opacity: 0, y: "110%" },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block" }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span variants={lineVariant} style={{ display: "inline-block" }}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
