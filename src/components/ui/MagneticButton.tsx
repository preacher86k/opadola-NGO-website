"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  href,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  function handleMouse(e: React.MouseEvent) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * strength, y: y * strength });
  }

  function reset() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.div
      style={{ display: "inline-block" }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
    >
      <Link
        ref={ref}
        href={href}
        className={className}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
      >
        {children}
      </Link>
    </motion.div>
  );
}
