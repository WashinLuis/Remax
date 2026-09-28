"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function Counter({ to, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}
