export default function LogoMark({ size = 80, className = "" }: { size?: number, className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Vertical bar */}
      <rect x="22" y="12" width="8" height="72" rx="1" fill="#ffffff" />
      {/* Top bracket */}
      <rect x="22" y="12" width="22" height="6" rx="1" fill="#ffffff" />
      {/* Three horizontal speed stripes */}
      <rect x="38" y="22" width="28" height="7" rx="3.5" fill="#4d7cfe" />
      <rect x="38" y="38" width="32" height="7" rx="3.5" fill="#4d7cfe" />
      <rect x="38" y="54" width="26" height="7" rx="3.5" fill="#4d7cfe" />
    </svg>
  );
}
