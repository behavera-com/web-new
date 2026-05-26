export default function PhoneIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 3.5C2 2.7 2.7 2 3.5 2h1.7c.4 0 .7.3.8.7l.5 2c.1.4-.1.7-.4.9l-1 .6c.7 1.4 1.8 2.5 3.2 3.2l.6-1c.2-.3.5-.5.9-.4l2 .5c.4.1.7.4.7.8v1.7c0 .8-.7 1.5-1.5 1.5C5.5 12.5 1.5 8.5 1.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
