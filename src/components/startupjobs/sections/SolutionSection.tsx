import { Fragment } from "react";
import ReportGallery from "./ReportGallery";
import SoftScrollCta from "../ui/SoftScrollCta";
import SolutionBlock, { type SolutionBlockData } from "./SolutionBlock";

const blocks: SolutionBlockData[] = [
  {
    num: "01",
    tag: "BENCHMARK",
    title: (
      <>
        Najdeme skutečné prediktory <em>úspěchu</em>.
      </>
    ),
    body: (
      <>
        Analyzujeme váš stávající tým a zjistíme, co odlišuje top performery od
        ostatních. <span className="sj-hl">Často to není to, co byste čekali.</span>
      </>
    ),
    details: [
      <Fragment key="a">
        Hard skills, soft skills, motivace a kontext —{" "}
        <strong style={{ color: "var(--color-ink)" }}>vše v jednom profilu</strong>.
      </Fragment>,
      <Fragment key="b">
        Pozitiva i obavy přímo z dat —{" "}
        <strong style={{ color: "var(--color-ink)" }}>žádné dojmy z pohovoru</strong>.
      </Fragment>,
    ],
    image: {
      src: "/startupjobs/hiring/top-performers-comparison.png",
      alt: "Behavera — Profil kandidáta: pozitiva, obavy a kompetence z Office Day simulace.",
      caption: "Profil kandidáta",
      video: "/startupjobs/product/profil-kandidata.mp4",
    },
    pins: [],
  },
  {
    num: "02",
    tag: "FIT MATRIX",
    title: (
      <>
        Postavíme z toho <em>filtr</em>.
      </>
    ),
    body: (
      <>
        Stejné kompetence, které vidíme ve vašem týmu, měříme u uchazečů.{" "}
        <span className="sj-hl">Dál jdou jen ti</span>, jejichž DNA sedí
        náročnosti role.
      </>
    ),
    details: [
      <Fragment key="a">
        Jeden přehled —{" "}
        <strong style={{ color: "var(--color-ink)" }}>fit %, kompetence, datum</strong>.
      </Fragment>,
      <Fragment key="b">
        Sortování od shora dolů —{" "}
        <strong style={{ color: "var(--color-ink)" }}>recruiter ví, koho volat první</strong>.
      </Fragment>,
    ],
    image: {
      src: "/startupjobs/hiring/candidate-fit-matrix.png",
      alt: "Behavera — výňatek z reálného reportingu (anonymizováno): seznam kandidátů na pozici Enterprise Salesperson s procentuálním fit skóre.",
      caption: "Kandidátský scoring",
    },
    pins: [
      { x: "84%", y: "22%" },
      { x: "18%", y: "48%" },
      { x: "62%", y: "82%" },
    ],
    reverse: true,
  },
  {
    num: "03",
    tag: "OFFICE DAY",
    title: (
      <>
        Vy dostanete data, <em>kandidát zážitek</em>.
      </>
    ),
    body: (
      <>
        Office Day simulace, ne další test.{" "}
        <span className="sj-hl">Uchazeči ji dokončují</span> i u seniorních
        rolí — a píšou, že to bylo nejlepší první kolo, jaké zažili.
      </>
    ),
    details: [
      <Fragment key="a">
        Hraje se v prohlížeči, 30–60 min — kandidáta nesvazujete časovým slotem.
      </Fragment>,
      <Fragment key="b">
        Strukturovaný výstup se{" "}
        <strong style={{ color: "var(--color-ink)" }}>
          silnými stránkami, tím, na co dát pozor, a pevnými základy
        </strong>{" "}
        — recruiter si připraví otázky předem.
      </Fragment>,
    ],
    image: {
      src: "/startupjobs/hiring/office-day-output.png",
      alt: "Behavera — výstupní profil kandidáta po Office Day simulaci: Fit na roli %, silné stránky, na co dát pozor, pevné základy.",
      caption: "Office Day · výstup",
    },
    pins: [
      { x: "30%", y: "26%" },
      { x: "72%", y: "70%" },
    ],
  },
];

export default function SolutionSection() {
  return (
    <section
      id="metodika"
      className="sj-grain sj-reveal scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-3">
            <span className="sj-section-anchor">05 · Datová vrstva v praxi</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section max-w-[18ch]">
              Behavera: nábor, který sedí <em>napoprvé</em>.
            </h2>
            <p
              className="mt-7 leading-[1.6] max-w-[58ch]"
              style={{
                fontSize: 20,
                color: "rgba(28,18,55,0.8)",
              }}
            >
              Datová vrstva nad vaším náborem. Méně chyb, lepší KPI, klid v
              reportingu.
            </p>
          </div>
        </div>

        <div className="space-y-24 md:space-y-32">
          {blocks.map((b, i) => (
            <SolutionBlock
              key={b.num}
              block={b}
              showCta={i === blocks.length - 1}
            />
          ))}
        </div>


        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-6 mb-6 md:mb-8 flex-wrap">
            <div>
              <span className="sj-eyebrow">Co uvidíte v reportu</span>
              <h3
                className="sj-display mt-2 max-w-[22ch]"
                style={{ fontSize: 28, lineHeight: 1.15 }}
              >
                Z jednoho reportu pět pohledů.
              </h3>
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-muted)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              klik na dlaždici = zvětšit
            </p>
          </div>
          <ReportGallery />

          <SoftScrollCta target="#cases" label="Reálné výsledky klientů" />
        </div>
      </div>
    </section>
  );
}
