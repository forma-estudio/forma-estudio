// La sección es alta y la frase queda fija: ese recorrido es el momento en que las partículas forman "FORMA".
export default function PhraseForma() {
  return (
    <section id="frase" className="block min-h-[170svh]">
      <div className="sticky top-0 h-[100svh] flex items-center justify-center px-6 text-center">
        <h2 className="font-display font-bold leading-[1.1] text-white text-[clamp(1.6rem,5.2vw,3.4rem)]">
          <span className="block my-[.15em]">Dale</span>
          <span className="block my-[.15em]">
            <span id="slot" className="inline-block text-[2.3em] leading-[1.05] tracking-[.01em] text-transparent">FORMA</span>
          </span>
          <span className="block my-[.15em]">a tu negocio</span>
        </h2>
      </div>
    </section>
  )
}
