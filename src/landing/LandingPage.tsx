import * as React from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { TorusBackground } from "./TorusBackground";

const CONTACT_EMAIL = "hello@nodo.xyz";
const LEGAL_EMAIL = "legal@nodo.xyz";

const HEADLINE_PART_1 = "We are evolving into a";
const HEADLINE_PART_2 = "next-generation infrastructure";
const HEADLINE_PART_3 = "for market-neutral and directional strategies.";

/**
 * Split text into staggered word spans.
 * word-anim (outer) handles opacity/filter/translate entrance.
 * wordClassName (inner) carries optional text-gradient/sheen without colliding
 * with the outer `animation` property.
 */
const AnimatedWords: React.FC<{
  text: string;
  startDelay?: number;
  stepMs?: number;
  className?: string;
  wordClassName?: string;
}> = ({ text, startDelay = 0, stepMs = 70, className, wordClassName }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            className="word-anim inline-block"
            style={{ animationDelay: `${startDelay + i * stepMs}ms` }}
          >
            {wordClassName ? <span className={wordClassName}>{word}</span> : word}
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
};

export const LandingPage: React.FC = () => {
  // Total words before part 2 / part 3 so stagger is continuous across spans
  const words1 = HEADLINE_PART_1.split(" ").length;
  const words2 = HEADLINE_PART_2.split(" ").length;
  const step = 70;
  const start = 260;

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
      {/* WebGL torus background */}
      <div className="absolute inset-0 z-0">
        <TorusBackground />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 md:px-10">
        {/* Logo */}
        <header className="flex w-full items-center justify-center pt-6 md:pt-14">
          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-md px-1 py-1 focus-visible:shadow-focus-ring"
            aria-label="NODO"
          >
            <img
              src="/nodo-logo.svg"
              alt="NODO"
              width={130}
              height={56}
              className="h-9 md:h-12 w-auto transition-[filter,transform] duration-500 group-hover:scale-[1.02]"
              style={{
                filter:
                  "drop-shadow(0 0 24px rgba(255, 184, 84, 0.35)) drop-shadow(0 0 48px rgba(212, 113, 80, 0.2))",
              }}
              draggable={false}
            />
          </a>
        </header>

        {/* Main — text is always vertically centered on every viewport */}
        <main className="flex flex-1 flex-col items-center justify-center py-6 md:py-20">
          <div className="w-full max-w-3xl text-center">
            {/* Launching Soon — animated badge */}
            <div
              className="relative inline-block badge-reveal opacity-0"
              style={{ animationDelay: "120ms, 820ms" }}
            >
              <span aria-hidden className="badge-glow" />
              <span className="badge-animated inline-flex items-center gap-2 px-3.5 py-[6px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.22em] leading-none">
                <span className="relative flex size-1.5 shrink-0" aria-hidden>
                  <span className="absolute inline-flex size-full rounded-full bg-[#FFB854] opacity-75 animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[#FFB854] shadow-[0_0_12px_#FFB854]" />
                </span>
                <span className="bg-gradient-to-r from-[#FFE8C9] via-[#FFB854] to-[#D47150] bg-clip-text text-transparent">
                  Launching soon
                </span>
              </span>
            </div>

            {/* Hero headline — word-by-word blur-to-sharp fade; middle phrase has sheen */}
            <h1 className="mt-6 md:mt-8 text-balance text-[32px] leading-[1.18] font-medium tracking-tight text-white sm:text-[36px] md:text-[42px] md:leading-[1.15] lg:text-[52px] [text-wrap:balance]">
              <AnimatedWords text={HEADLINE_PART_1} startDelay={start} stepMs={step} />{" "}
              <AnimatedWords
                text={HEADLINE_PART_2}
                startDelay={start + words1 * step}
                stepMs={step}
                wordClassName="text-sheen font-semibold"
              />{" "}
              <AnimatedWords
                text={HEADLINE_PART_3}
                startDelay={start + (words1 + words2) * step}
                stepMs={step}
              />
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mt-5 md:mt-7 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/65 md:text-lg opacity-0 animate-slide-up"
              style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}
            >
              A unified platform for cross-venue execution and risk-managed access.
            </p>

            {/* CTA */}
            <div
              className="mt-7 md:mt-10 flex items-center justify-center opacity-0 animate-slide-up"
              style={{ animationDelay: "1600ms", animationFillMode: "forwards" }}
            >
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-button-md text-black transition-[transform,box-shadow,background-color] duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,184,84,0.35)] active:scale-[0.98]"
              >
                <Mail size={16} className="shrink-0" />
                Get in touch
                <ArrowUpRight
                  size={16}
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="w-full pb-5 md:pb-6 pt-3 md:pt-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "1800ms", animationFillMode: "forwards" }}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2.5 border-t border-white/[0.06] pt-4 md:pt-5 text-[11px] md:text-caption text-white/45 md:flex-row md:gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
              <span className="tabular-nums">© {new Date().getFullYear()} NODO Global Pte. Ltd.</span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span>All rights reserved</span>
            </div>
            <nav className="flex items-center gap-4 md:gap-5">
              <a
                href="https://docs.nodo.xyz/legal/terms-of-service"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white/80"
              >
                Terms
              </a>
              <a
                href="https://docs.nodo.xyz/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white/80"
              >
                Privacy
              </a>
              <a href={`mailto:${LEGAL_EMAIL}`} className="transition-colors hover:text-white/80">
                {LEGAL_EMAIL}
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};
