export default function Logo() {
  return (
    <svg width="160" height="45" viewBox="0 0 320 90" className="h-full w-auto">
      <defs>
        <linearGradient id="fGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6F2DA8"/>
          <stop offset="55%" stopColor="#B14CFF"/>
          <stop offset="100%" stopColor="#FF91A4"/>
        </linearGradient>
      </defs>
      <path d="
        M0,6
        L14,6
        L14,45
        L54,45
        L54,57
        L14,57
        L14,80
        L0,80
        Z
        M0,0
        L300,0
        L300,14
        L0,14
        Z
      " fill="url(#fGrad)" fillRule="nonzero"/>
      <text x="70" y="80" fontFamily="Poppins, Arial, sans-serif"
            fontWeight="800" fontSize="68" letterSpacing="1"
            fill="url(#fGrad)">ORMA</text>
    </svg>
  )
}
