export default function EnvelopeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="1.5" y="3" width="11" height="8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M1.5 3.5l5.5 4 5.5-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
