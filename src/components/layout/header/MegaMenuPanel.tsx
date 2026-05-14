"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: ReactNode;
};

export default function MegaMenuPanel({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  children,
}: Props) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="bg-white shadow-xl"
      style={{ position: "absolute", left: 0, width: "100%", zIndex: 40 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-10">{children}</div>
      </div>
    </motion.div>
  );
}
