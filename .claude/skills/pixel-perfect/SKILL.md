---
name: pixel-perfect
description: Auditoría y corrección "pixel perfect" de oi0.es contra el diseño de Figma (archivo QE9nZ85NAdnyDONuQeKO42). Úsala cuando haya que comparar la web con Figma, cuando Rodrigo diga que algo "no se ve como en Figma", antes de publicar, o después de implementar cualquier pantalla o componente.
---

# Pixel perfect: oi0.es contra Figma

Trabajas como **diseñador de producto senior y director creativo** que además escribe el código. Tu estándar es que una persona que ponga Figma y la web lado a lado no encuentre diferencias. No rediseñas: **Figma manda** en layout, tipografía, color, espaciado e imágenes. Las únicas excepciones son las que se listan en «Fuentes de verdad».

## Fuentes de verdad
- **Estilos y layout:** Figma `QE9nZ85NAdnyDONuQeKO42`.
- **Textos e imágenes:** `content/*.ts`. Si Figma y `content/` no coinciden en un texto, gana `content/` y lo apuntas.
- **Comportamiento** (barra fija, ficha, navbar, filtros, hover): los prompts `rediseno/PROMPT-*.md` y `rediseno/*-brief-*.md`. Figma solo enseña estados estáticos.
- **Tokens:** colecciones de variables de Figma (Color, Proyecto, Espaciado, Layout, Radio, Tipografía con modos Desktop/Mobile) ↔ el CSS global (`globals.css`, bloque `@theme`).

## Mapa de frames (desktop 1440 / móvil 390)

| Pantalla | Desktop | Móvil |
|---|---|---|
| Home | `91:388` | `91:2288` |
| Proyectos | `85:344` | `85:462` |
| Contacto | `75:349` | `75:383` |
| Plantilla de caso | `40:3` | `40:113` |
| Estado scroll (barra fija) | `49:269` | `49:296` |
| Catalonia | `63:378` | `63:487` |
| Burger King | `70:1304` | `70:1413` |
| Push | `63:2` | `63:156` |
| RBI | `66:936` | `66:1025` |
| Santalucía | `64:799` | `64:879` |
| Rank Me Higher | `66:1166` | `66:1256` |
| Marca · Salma | `86:474` | `86:2240` |
| Marca · Málaga Tech | `98:540` | `98:558` |
| Marca · Laskurain | `98:2484` | `98:2568` |

- **Componentes:** página `37:2` (Site/*, Case/*, Logo/*).
- **Notas para código:** `87:394`.
- **Ojo:** los casos de «Casos · v1» (página 55:2) pueden tener imágenes o textos anteriores. Usa de ellos el layout y los estilos; los contenidos salen de `content/`.

## Método (en cada pantalla, primero desktop y luego móvil)

1. **Inventario de Figma.**
   - Con el MCP de Figma: `get_design_context` y `get_variable_defs` del frame y de cada sección hija, y `get_screenshot` del frame a 1x.
   - Apunta por sección: anchos, paddings, gaps, alto de las medias, estilo de texto (familia, peso, tamaño, interlineado, tracking, mayúsculas), colores (con su variable), radios, sombras, alineaciones y el `object-fit`/encuadre de las imágenes.
2. **Captura de la web** con Playwright, en el preview o en `pnpm dev`:
   - Viewport exacto: 1440 × 900 y 390 × 844, `deviceScaleFactor: 1`.
   - Espera a `document.fonts.ready` y a que carguen las imágenes.
   - Desactiva las animaciones con `prefers-reduced-motion: reduce` o inyectando `*{transition:none!important;animation:none!important}`.
   - Captura de página completa y, por sección, `getBoundingClientRect()` y `getComputedStyle()` de cada nodo equivalente.
3. **Comparación numérica.** Por sección, una tabla:

   `| Sección | Elemento | Propiedad | Figma | Web | Δ | Corrección |`

   Tolerancias:
   - Espaciado y tamaños: **0 px**. Si hay subpíxeles, ±0,5 px.
   - Tipografía: tamaño e interlineado exactos. Tracking ±0,01em.
   - Color: hex exacto, el mismo token.
   - Posición de bloques: ±1 px.
4. **Comparación visual.**
   - Pon lado a lado (o superpuestas al 50 %) la captura de Figma y la de la web de cada sección, a la misma escala.
   - Si hace falta, usa `pixelmatch` o `odiff` sobre recortes alineados. No persigas el antialiasing de las fuentes ni la compresión JPG: eso no cuenta como diferencia.
5. **Corrección, en este orden:**
   1. **Tokens** en `globals.css`: un valor equivocado en un token arregla muchas pantallas a la vez.
   2. **Componentes compartidos:** WorkCard, StickyBar, CaseHeader, Footer, Navbar…
   3. **Ajustes de pantalla.**
   - Nunca un valor suelto (`mt-[13px]`) si existe un token. Si Figma usa un valor que no está en los tokens, apúntalo como **«fuera de sistema»** y pregunta antes de inventar un token.
6. **Verificación:** vuelve a capturar, vuelve a medir y repite hasta que la tabla no tenga filas con Δ fuera de tolerancia.

## Trampas típicas de Figma a CSS (revísalas siempre)
- **Letter-spacing:** en Figma va en % → en CSS es `em` = % / 100. Ejemplo: −2 % → `-0.02em`.
- **Interlineado:** en Figma puede ir en % o en px; en CSS usa el mismo valor sin redondear. El «text box trim» de Figma no existe por defecto en CSS: compara la posición de la línea base, no la caja.
- **Pesos:** comprueba que la fuente servida (`next/font`) incluye exactamente el peso que pide Figma y no uno sintetizado.
- **Auto layout:** el `gap` de Figma es `gap` en CSS, no márgenes. «Hug» es `width: auto` / `fit-content`; «Fill» es `flex: 1` o `width: 100%`.
- **Anchos máximos:** el contenedor de 1312 (márgenes de 64) en desktop y los márgenes de 16 en móvil. Revisa también 768 y 1024, aunque Figma no los dibuje, para que nada se rompa.
- **Imágenes:** `object-fit` y `object-position` iguales a los del encuadre de Figma (FILL = cover; FIT = contain sobre `project-tint`). Mismo radio y mismo alto de media.
- **Colores por proyecto:** cada página o tarjeta lleva `data-project` y usa `project-accent`, `project-tint`, `on-accent` y `on-accent-2`. Ningún hex suelto.
- **Bordes:** 1 px con `border-subtle`, `border-default` o `border-strong` según la variable.
- **Mayúsculas de las etiquetas:** `text-transform` en CSS, no texto escrito en mayúsculas.

## Entregable de cada pasada
- `qa/pixel/<pantalla>-<1440|390>-figma.png`, `-web.png` y `-diff.png`. Añade `qa/` a `.gitignore`.
- `qa/pixel/INFORME.md` con:
  - la tabla de diferencias (las corregidas y las que no);
  - qué tokens se tocaron;
  - la lista de valores «fuera de sistema»;
  - las dudas para Rodrigo.
- Commits pequeños y por zona: `fix(pixel): tokens tipografía`, `fix(pixel): WorkCard`, `fix(pixel): home móvil`…

## Qué no hacer
- No cambies textos, el orden ni el comportamiento para «que se parezca más». Si Figma y los prompts de comportamiento se contradicen, gana el prompt y lo apuntas.
- No borres tokens ni componentes sin preguntar.
- No hagas merge a `main` ni publiques. Eso solo pasa cuando Rodrigo dice «publica».
