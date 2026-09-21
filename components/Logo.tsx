export default function Logo() {
  return (
    <svg viewBox="0 0 280 80" className="h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6F2DA8"/>
          <stop offset="55%" stopColor="#B14CFF"/>
          <stop offset="100%" stopColor="#FF91A4"/>
        </linearGradient>
      </defs>
      {/* F shape */}
      <g>
        {/* Vertical bar */}
        <rect x="4" y="8" width="12" height="64" fill="url(#fGrad)"/>
        {/* Top horizontal */}
        <rect x="4" y="8" width="32" height="12" fill="url(#fGrad)"/>
        {/* Middle horizontal */}
        <rect x="4" y="40" width="28" height="10" fill="url(#fGrad)"/>
      </g>
      {/* ORMA text */}
      <text x="48" y="62" fontFamily="Poppins, Arial, sans-serif"
            fontWeight="700" fontSize="56" fill="url(#fGrad)">ORMA</text>
    </svg>
  )
}
