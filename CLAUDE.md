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
- Tipografía: Poppins vía `next/font/google`, en toda la web.
- Navegación: scroll suave a anclas dentro de la misma página. No hay rutas separadas por sección.

## Identidad visual (sagrado, no se toca sin pedido explícito)

- Colores de marca: negro `#101820`, blanco `#FFFFFF`, violeta `#6F2DA8`, rosa `#FF91A4`. Tonos de apoyo ya usados: `#B98CE8`, `#8B2FD9`, `#B14CFF`.
- Estética: oscura, editorial, minimalista. Mucho espacio, jerarquía fuerte.
- Palabras clave con glow pulsante en loop infinito y sin cortes (keyframes con 0% y 100% idénticos).
- Botones: forma pill (bordes totalmente redondeados).
- Prohibido: sombras excesivas, gradientes decorativos que no estén ya definidos, emojis en la interfaz, librerías de UI genéricas.

---

## REGLAS MOBILE (obligatorias en todo cambio)

**Principio:** mobile no es la versión de escritorio achicada. Es una recomposición que conserva la identidad: mismos colores, misma tipografía, mismo tono, mismas animaciones (en versión liviana cuando haga falta).

### Enfoque

- Mobile-first: los estilos base son los del celular y se amplían con `md:` y `lg:`.
- **La versión de escritorio (≥1024px) no debe cambiar** cuando se adapta mobile. Si cambia algo, es un error.
- Todo lo nuevo que se agregue al sitio nace con su versión mobile incluida. No se entrega "primero escritorio y después vemos".

### Anchos de prueba obligatorios

320 (mínimo absoluto), 360, 390, 412, 430, 768 (tablet), 1024 y 1280 (escritorio).
Los motores a cubrir son Safari en iPhone y Chrome en Android. Cualquier efecto que dependa del navegador (filtros SVG, `backdrop-filter`, `100vh`) se prueba pensando en ambos.

### Layout y espaciado

- Márgenes laterales de 20 a 24px en todas las secciones. Nada pegado al borde.
- Las secciones de dos columnas pasan a una columna, con orden de lectura pensado.
- Nunca scroll horizontal, en ningún ancho. Los elementos decorativos grandes (las "@", los globos, los anillos) se recortan con `overflow: hidden` en el contenedor.
- Altura de pantalla: no usar `100vh` ni `h-screen` para secciones a pantalla completa. Usar `100svh` o `100dvh` (o `min-h-svh` / `min-h-dvh` si la versión de Tailwind lo soporta), porque las barras del navegador del celular distorsionan `100vh`.

### Tipografía

- Tamaños fluidos con `clamp()` o escalas responsivas. Los títulos grandes deben mantener impacto sin desbordar.
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
- Preguntas frecuentes: se abren con un tap (en mobile, como panel casi a pantalla completa con botón para cerrar; en escritorio siguen abriéndose al hover, hacia el costado).
- Tarjetas de "Cómo trabajamos": carrusel horizontal con swipe, tarjetas a ~80% del ancho para que se asome la siguiente. El "agrandar al hover" pasa a tap sobre la tarjeta activa.
- Globos de "Sobre nosotros": el parallax por mouse se reemplaza por un movimiento sutil ligado al scroll. La rotación se mantiene.
- Carrusel de Servicios: swipe táctil además del autoplay y la barra de progreso.

### Rendimiento (versión liviana pero fiel)

Los efectos pesados se simplifican en mobile manteniendo la misma estética:

- **Malla ondulante (Servicios):** filtro SVG de turbulencia + desplazamiento. En mobile usar una versión más simple (menor distorsión, sin el brillo extra o con menos octavas) para que no se trabe ni gaste batería.
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
2. **Verificación visual obligatoria antes de cada commit.** Mostrar capturas en 360, 390, 768 y 1280 de la sección modificada. Leer el texto de la página (`get_page_text` o similar) NO cuenta como verificación visual.
3. Si el resultado no coincide con lo pedido, no hacer commit. Avisar qué diferencia hay entre lo obtenido y lo pedido.
4. Antes de un cambio grande que mueve estructura, listar qué se va a mover. Se mueve el código existente, no se reescribe de memoria.
5. Un commit por cambio, con mensaje claro. `npm run build` tiene que pasar sin errores antes de cada push.
6. Todo push a `master` publica en producción vía Vercel. Revisar el resultado en la URL pública después del deploy.

## Estado de las secciones (orden de la página)

Nav → Hero → Impacto → Cómo trabajamos → Servicios (carrusel sobre la malla) → Sobre nosotros (+ preguntas frecuentes) → Empecemos tu proyecto (formulario) → Footer.

Pendiente, a resolver aparte: logo tipográfico del nav (la F con el palo superior extendido como techo sobre "ORMA", un solo SVG con un degradé continuo). La implementación anterior no coincidió con el diseño aprobado. No tocar el logo hasta que se pida.
