"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "max(24px, env(safe-area-inset-bottom, 0px))", right: "max(24px, env(safe-area-inset-right, 0px))", zIndex: 45 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            style={{ width: "min(340px, calc(100vw - 48px))", marginBottom: "16px" }}
          >
            {/* Header */}
            <div className="bg-primary text-white px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{t("title")}</p>
                <p className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                  <span
                    className="rounded-full bg-green-400"
                    style={{ width: "6px", height: "6px" }}
                  />
                  {t("online")}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="px-5 py-6" style={{ minHeight: "200px" }}>
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600 max-w-[80%]">
                {t("subtitle")} 👋
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                <input
                  type="text"
                  placeholder={t("placeholder")}
                  className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
                  disabled
                />
                <button className="text-accent hover:text-accent-dark transition-colors">
                  <Send className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-accent text-primary rounded-full shadow-lg hover:bg-accent-dark transition-all hover:scale-105"
        style={{ width: "56px", height: "56px" }}
        aria-label={t("title")}
      >
        {open ? (
          <X className="h-6 w-6 mx-auto" />
        ) : (
          <MessageCircle className="h-6 w-6 mx-auto" />
        )}
      </button>
    </div>
  );
}
