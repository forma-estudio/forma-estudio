# CLAUDE.md — FORMA ESTUDIO

Instrucciones operativas para trabajar en este repositorio. Leelas al empezar cada sesión y aplicalas en TODO cambio, sin que haga falta repetirlas.

---

## Rol

Desarrollás el sitio técnicamente. Las decisiones de diseño y de contenido son del dueño del proyecto.

- No inventes secciones, textos ni funcionalidades que no se pidieron.
- No "mejores" ni reinterpretes algo ya aprobado. Si se entrega código exacto (SVG, CSS, JSX), se copia tal cual, sin cambiar valores.
- Si falta un dato de contenido (textos, cifras, campos de un formulario), preguntá. No lo inventes.

## Proyecto

- Landing page única de FORMA ESTUDIO (agencia de diseño web para PyMEs, profesionales y comercios locales).
- Stack: Next.js (App Router) + React + TypeScript + Tailwind. Deploy automático en Vercel con cada push a `master`.
- Tipografía: Poppins vía `next/font/google` para todo, salvo los títulos. Los títulos (Hero, h2 de sección, h3 de tarjetas, números grandes y frases del carrusel) usan la clase `font-display`: Unbounded, cargada en `app/layout.tsx` con la variable `--font-display`. Para cambiar la tipografía de títulos alcanza con cambiar la fuente que carga `layout.tsx`.
- Formulario de contacto: envía con Web3Forms a formawebok@gmail.com. Campos con 16px de letra (`text-base`) debajo de 1024 para evitar el zoom en iPhone.
- Navegación: scroll suave a anclas dentro de la misma página. No hay rutas separadas por sección.

## Identidad visual (sagrado, no se toca sin pedido explícito)

- Colores de marca: negro `#101820`, blanco `#FFFFFF`, violeta `#6F2DA8`, rosa `#FF91A4`. Tonos de apoyo ya usados: `#B98CE8`, `#8B2FD9`, `#B14CFF`.
- Estética: oscura, editorial, minimalista. Mucho espacio, jerarquía fuerte.
- Palabras clave con glow pulsante en loop infinito y sin cortes (keyframes con 0% y 100% idénticos).
- Botones: forma pill (bordes totalmente redondeados).
- Prohibido: sombras excesivas, gradientes decorativos que no estén ya definidos, emojis en la interfaz, librerías de UI genéricas.
- Las secciones no llevan fondo sólido para que se vean las partículas. El fondo de la página es #101820. Los botones siempre van con color pleno. Las tarjetas de Cómo trabajamos llevan borde fino (border-white/25) y el degradé en opacity-25.

---

## REGLAS MOBILE (obligatorias en todo cambio)

**Principio:** mobile no es la versión de escritorio achicada. Es una recomposición que conserva la identidad: mismos colores, misma tipografía, mismo tono, mismas animaciones (en versión liviana cuando haga falta).

### Enfoque

- Mobile-first: los estilos base son los del celular y se amplían con `md:` y `lg:`.
- **La versión de escritorio (≥1024px) no debe cambiar** cuando se adapta mobile. Si cambia algo, es un error.
- Todo lo nuevo que se agregue al sitio nace con su versión mobile incluida. No se entrega "primero escritorio y después vemos".

### Anchos de prueba obligatorios

320 (mínimo absoluto), 360, 390, 412, 430, 768 (tablet), 1024, 1280 y 1366 (escritorio).
Alturas de referencia: 1024px en tablet, 768px en escritorio. Los motores a cubrir son Safari en iPhone y Chrome en Android. Cualquier efecto que dependa del navegador (filtros SVG, `backdrop-filter`, `100vh`) se prueba pensando en ambos.

### Layout y espaciado

- Márgenes laterales de 20 a 24px en todas las secciones. Nada pegado al borde.
- Las secciones de dos columnas pasan a una columna, con orden de lectura pensado.
- Nunca scroll horizontal, en ningún ancho. Los elementos decorativos grandes (las "@", los globos, los anillos) se recortan con `overflow: hidden` en el contenedor.
- Altura de pantalla: no usar `100vh` ni `h-screen` para secciones a pantalla completa. Usar `100svh` o `100dvh` (o `min-h-svh` / `min-h-dvh` si la versión de Tailwind lo soporta), porque las barras del navegador del celular distorsionan `100vh`.

### Tipografía

- Tamaños fluidos con `clamp()` o escalas responsivas. Los títulos grandes deben mantener impacto sin desbordar.
- **Tamaños de fuente SOLO en clases de Tailwind, nunca en `style` inline.** El style inline pisa las clases `md:` y `lg:`. Referencia: `text-7xl` = 72px, `text-5xl` = 48px.
- Para medir el ancho de un título o texto, usar un Range sobre su contenido: `document.createRange(); range.selectNodeContents(elemento); range.getClientRects()`. El `getBoundingClientRect()` del elemento devuelve siempre el 100% del ancho de su caja, no el ancho real del texto.
- **No usar `whitespace-nowrap` en mobile.** Si un título necesita ir en una línea en escritorio, aplicar `md:whitespace-nowrap` y dejar que en celular pase a 2 renglones centrados.
- Centrar siempre con `text-center` y flex (`justify-center`), nunca confiando en que el desborde se reparta solo.
- Las frases animadas (rotativas o con efecto de tipeo) reservan su espacio (altura y ancho mínimos) para que no se mueva el resto del texto cuando cambian.

### Botones y toques

- Altura mínima de 48px y separación suficiente entre botones.
- En mobile los botones del Hero van apilados, a casi todo el ancho.
- Los links de email y teléfono son tocables (`mailto:`).

### Hover → tap

En celular no existe el hover. Todo efecto que hoy depende del cursor tiene equivalente táctil:

- Botones: el cambio de color al hover pasa al estado `:active` (presionado).
- Preguntas frecuentes: debajo de 1024 (mobile y tablet) son un acordeón (`FaqAccordion.tsx`): lista con líneas finas, "+" violeta que rota a ×, una abierta por vez. En escritorio siguen siendo el botón rosa con tooltip al costado.
- Tarjetas de "Cómo trabajamos": debajo de 768, apiladas; de 768 a 1279, grilla 2x2; desde 1280, fila de 4 con vaivén de ±20px. Debajo de 1024, las tarjetas aparecen al scrollear (IntersectionObserver).
- Carrusel de Servicios: autoplay que sigue después de tocar los puntitos o deslizar; la pausa por hover es solo para dispositivos con mouse.

### Rendimiento (versión liviana pero fiel)

Los efectos pesados se simplifican en mobile manteniendo la misma estética:

- **Fondo de partículas (ParticlesBackground.tsx, three):** canvas fijo detrás de toda la página (-z-10). Las partículas se densifican y cambian de color (blancos/azules a violetas/rosas) con el scroll, se apartan con el cursor o el dedo y forman FORMA en la sección PhraseForma (frase fija con sticky). 10.000 partículas en escritorio y 4.500 debajo de 768. THREE.ColorManagement.enabled = false. Referencia aprobada: referencias/particulas-forma.html (no se sube al repo).
- **Anillos del vórtice (Empecemos tu proyecto):** de 15 anillos a 6–8 en mobile, con menos `blur`.
- Animar solo `transform` y `opacity` cuando sea posible.
- Respetar `prefers-reduced-motion`: con esa preferencia activa, bajar o detener las animaciones decorativas.

### Reglas técnicas aprendidas (errores que ya pasaron)

- **Rotación y desplazamiento en elementos anidados distintos.** Si un elemento rota con una animación CSS y además se desplaza por JS, van en dos wrappers separados. Si comparten `transform`, uno pisa al otro.
- Elementos decorativos: `pointer-events: none` en toda la cadena (contenedor, wrapper y SVG).
- SVG con formas superpuestas: `fill-rule="nonzero"`. Con `evenodd` la superposición genera agujeros.
- Pegar un degradé distinto en cada pieza de una misma forma deja costuras. Una forma = un solo relleno continuo.
- Loops sin cortes visibles: preferir elementos independientes con `animation-delay` escalonado antes que una sola animación del conjunto que reinicia de golpe.
- Si aparece el error `__webpack_modules__[moduleId] is not a function` en desarrollo, borrar la carpeta `.next` y reiniciar. No tocar `tailwind.config` por eso. (`text-7xl` y `text-8xl` existen por defecto en Tailwind.)

---

## Forma de trabajo

1. **Una sección por vez.** No se tocan otras secciones en el mismo cambio.
2. **Verificación visual obligatoria antes de cada commit.** Mostrar capturas en 360, 390, 768 y 1280 de la sección modificada. Leer el texto de la página (`get_page_text` o similar) NO cuenta como verificación visual. Si no se pueden sacar capturas, ver el punto 7.
3. Si el resultado no coincide con lo pedido, no hacer commit. Avisar qué diferencia hay entre lo obtenido y lo pedido.
4. Antes de un cambio grande que mueve estructura, listar qué se va a mover. Se mueve el código existente, no se reescribe de memoria.
5. Un commit por cambio, con mensaje claro. `npm run build` tiene que pasar sin errores antes de cada push.
6. Todo push a `master` publica en producción vía Vercel. Revisar el resultado en la URL pública después del deploy.
7. Si el navegador de la sesión no puede mostrar la página (pestaña oculta), no se inventan mediciones: se sube la rama, se pega el diff real y el usuario verifica en la vista previa de Vercel.

## Estado de las secciones (orden de la página)

Nav → Hero → Impacto → Cómo trabajamos → Servicios (carrusel sobre la malla) → Sobre nosotros (+ preguntas frecuentes) → Dale FORMA a tu negocio → Empecemos tu proyecto (formulario) → Footer.

Pendiente, a resolver aparte: logo tipográfico del nav (la F con el palo superior extendido como techo sobre "ORMA", un solo SVG con un degradé continuo). La implementación anterior no coincidió con el diseño aprobado. No tocar el logo hasta que se pida.
