"use client";

interface Props {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  borderRadius?: number;
  as?: "div" | "section" | "article";
}

export default function PulsingBorder({
  children,
  className = "",
  speed = 6,
  borderRadius,
  as: Tag = "div",
}: Props) {
  return (
    <Tag
      className={`pulsing-border ${className}`}
      style={{
        animationDuration: `${speed}s`,
        ...(borderRadius != null ? { borderRadius } : {}),
      }}
    >
      {children}
    </Tag>
  );
}
