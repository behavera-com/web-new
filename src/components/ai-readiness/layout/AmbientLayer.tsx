"use client";

/**
 * Decorative ambient layer for /startupjobs.
 * - Fixed full-viewport, behind content (z-0 with main content above).
 * - Drifts with scroll via --sj-y / --sj-progress (set by ScrollEffects).
 * - Pointer-following soft spotlight via --sj-mx / --sj-my (desktop).
 * - Pure CSS animations; respects prefers-reduced-motion via globals.css.
 */
export default function AmbientLayer() {
  return (
    <div aria-hidden className="sj-ambient" role="presentation">
      <div className="sj-ambient-grid" />
      <div className="sj-ambient-orb sj-ambient-orb--a" />
      <div className="sj-ambient-orb sj-ambient-orb--b" />
      <div className="sj-ambient-orb sj-ambient-orb--c" />
      <div className="sj-ambient-spotlight" />
      <svg
        className="sj-ambient-shapes"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sjLineGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#8b5cf6" stopOpacity="0.55" />
            <stop offset="1" stopColor="#2ddba6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="sj-ambient-line"
          d="M -40 720 C 260 640, 520 820, 820 660 S 1300 540, 1520 620"
          fill="none"
          stroke="url(#sjLineGrad)"
          strokeWidth="1.4"
          strokeDasharray="6 10"
        />
        <path
          className="sj-ambient-line sj-ambient-line--slow"
          d="M -40 200 C 320 280, 600 120, 900 240 S 1280 360, 1520 280"
          fill="none"
          stroke="url(#sjLineGrad)"
          strokeWidth="1"
          strokeDasharray="3 14"
        />
      </svg>
    </div>
  );
}
