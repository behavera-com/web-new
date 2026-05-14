import Image from "next/image";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import { consultReps } from "../sections/rep-data";

export default function MobileStickyCta() {
  const reps = consultReps.filter((r) => r.photo).slice(0, 3);

  return (
    <div
      id="sj-mobile-cta"
      className="sj-mobile-cta md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 pointer-events-none"
    >
      <a
        href="#consult"
        aria-label="Domluvit nezávazný 15minutový hovor"
        className="sj-mobile-cta-pill pointer-events-auto group relative flex items-center gap-3 rounded-full pl-1.5 pr-4 py-1.5 overflow-hidden"
      >
        <div className="flex -space-x-3 shrink-0">
          {reps.map((rep, i) => (
            <span
              key={rep.name}
              className="relative inline-block h-12 w-12 rounded-full ring-2 ring-[#fbfafd] overflow-hidden bg-[#2a1f4a]"
              style={{ zIndex: 3 - i }}
            >
              {rep.photo && (
                <Image
                  src={rep.photo}
                  alt={rep.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </span>
          ))}
        </div>

        <div className="flex-1 min-w-0 leading-tight">
          <div className="text-[10px] tracking-[0.18em] uppercase text-white/55 font-medium">
            Nezávazný hovor · 15 min
          </div>
          <div className="text-[16px] font-semibold text-white mt-0.5">
            Promluvte si s námi
          </div>
        </div>

        <span className="flex-none w-9 h-9 rounded-full inline-flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-1">
          <ArrowRightIcon size={18} />
        </span>
      </a>
    </div>
  );
}
