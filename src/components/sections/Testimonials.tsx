"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Quote, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    image: string;
    videoUrl?: string;
  }>;

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-bold text-accent uppercase tracking-widest text-center mb-4">
              {t("title")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-200 h-full flex flex-col group">
                  <Quote className="h-6 w-6 text-accent/40 mb-4 flex-shrink-0" />
                  <p className="text-gray-700 text-base leading-relaxed flex-1 font-medium">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-5 border-t border-gray-200 flex items-center gap-3">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.author}
                        width={44}
                        height={44}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {item.author
                          .split(" ")
                          .filter(Boolean)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary">
                        {item.author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.role}, {item.company}
                      </p>
                    </div>
                    {/* Video play button */}
                    {item.videoUrl !== undefined && (
                      item.videoUrl ? (
                        <button
                          onClick={() => setActiveVideo(item.videoUrl ?? null)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors cursor-pointer"
                          style={{ fontSize: "12px" }}
                        >
                          <Play className="h-3.5 w-3.5" fill="currentColor" />
                          <span className="font-medium">Video</span>
                        </button>
                      ) : (
                        <span
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-400 cursor-default"
                          style={{ fontSize: "12px" }}
                        >
                          <Play className="h-3.5 w-3.5" fill="currentColor" />
                          <span className="font-medium">Brzy</span>
                        </span>
                      )
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Video modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="text-white hover:text-gray-300 transition-colors"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
              }}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black rounded-xl overflow-hidden w-full"
              style={{ maxWidth: "900px", aspectRatio: "16/9" }}
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
