// Contenido de los casos. Extraído de Figma (página "Casos · v1") el 3 oct 2026; v2 el 5 oct 2026 (tarjetas, filtros y proyectos de marca).
// El orden del array es el orden de la web y la cadena de "Siguiente proyecto".
// Las cifras con provisional: true son ficticias o están por confirmar: no publicarlas sin revisar.

import type { Img, Project } from './types'

const img = (slug: string, file: string, w: number, h: number, alt: string, fit?: 'contain'): Img => ({
  src: `/proyectos/${slug}/${file}.jpg`,
  w,
  h,
  alt,
  ...(fit ? { fit } : {}),
})

// ───────────────────────────────── Catalonia
const cat = (f: string, w: number, h: number, alt: string, fit?: 'contain') => img('catalonia', f, w, h, alt, fit)
const catalonia: Project = {
  slug: 'catalonia',
  key: 'catalonia',
  kind: 'case',
  services: ['web', 'sistemas-de-diseno', 'ux-ui'],
  card: {
    services: 'Web · Sistema de diseño · UX/UI',
    tagline: 'Un sistema de diseño para una web de reservas',
    wide: cat('01-portada', 2880, 1800, 'La web de Catalonia Hotels en escritorio y en móvil'),
    narrow: cat('01-portada', 2880, 1800, 'La web de Catalonia Hotels en escritorio y en móvil'),
  },
  title: 'Catalonia Hotels',
  subtitle: 'Un sistema de diseño para una web de reservas',
  sector: 'Hoteles · Web',
  role: 'Diseñador UX/UI · Garaje de Ideas',
  year: '2023',
  nda: false,
  cardMeta: 'Hoteles · Web · 2023',
  rowMeta: 'Hoteles · Diseñador UX/UI · 2023',
  ficha: [
    { label: 'Contexto', content: 'Catalonia Web 3.0: el rediseño completo de la web de reservas de Catalonia Hotels, del buscador al área privada, trabajado en sprints con una review al final de cada uno.' },
    { label: 'Rol y equipo', content: 'Diseñador UX/UI en Garaje de Ideas. Diseñé producto en los diez sprints y construí el sistema de diseño.' },
    { label: 'Servicios / stack', content: 'UX/UI · Sistema de diseño · Producto · Figma' },
    { label: 'Enlaces', content: 'cataloniahotels.com', href: 'https://www.cataloniahotels.com' },
  ],
  blocks: [
    { type: 'cover', image: cat('01-portada', 2880, 1800, 'La web de Catalonia Hotels en escritorio y en móvil') },
    { type: 'statement', label: 'Resumen', text: 'Rediseñamos la web de reservas de Catalonia Hotels en diez sprints, del buscador al área privada, sobre un sistema de 230 componentes que lo mantiene todo coherente.' },
    { type: 'figures', label: 'En cifras', items: [
      { value: '230', label: 'Componentes' },
      { value: '2.003', label: 'Variantes' },
      { value: '10', label: 'Sprints de producto' },
      { value: '4', label: 'Tipos de landing' },
    ] },
    { type: 'gallery', items: [
      { layout: 'browser', images: [cat('02-img', 1440, 860, 'Buscador de reservas con calendario de fechas')], caption: 'Buscador: destino, fechas y ocupación en un solo paso.' },
      { layout: 'full', images: [cat('03-img', 1440, 1000, 'Página de hotel con galería de fotos en mosaico')], caption: 'Página de hotel con galería en mosaico.' },
    ] },
    { type: 'decision', order: 'text-media', number: '01 · Sistema', title: 'Un sistema de 230 componentes', text: 'Lo organicé por familias (acciones, controles, formularios, búsqueda, modales, navegación, tarjetas, módulos y plantillas) para que cada sprint montara pantallas con piezas que ya existían.', caption: 'Fundamentos del sistema.', image: cat('04-img', 2400, 844, 'Fundamentos del sistema de diseño de Catalonia', 'contain') },
    { type: 'decision', order: 'media-text', number: '02 · Buscador', title: 'Diseñar también lo que sale mal', text: 'El buscador se diseñó con todos sus casos: sin disponibilidad, reservas con un año de antelación, precios en dólares o una salida anterior a la entrada. Cada aviso tiene su versión en escritorio y en móvil.', caption: 'Avisos de no disponibilidad.', image: cat('05-img', 2400, 768, 'Avisos y tooltips de no disponibilidad en escritorio y móvil', 'contain') },
    { type: 'gallery', items: [
      { layout: 'full', images: [cat('06-img', 2160, 1290, 'Web de Catalonia Hotels en portátil y móvil')] },
    ] },
    { type: 'decision', order: 'text-media', number: '03 · Proceso', title: 'Un sprint, una review', text: 'Cada sprint acababa con una review con el cliente: qué se había diseñado y qué cambiaba. Así el alcance creció sin perder el hilo: home, buscador, hotel, checkout, multihabitación, área privada, landings y Rewards.', caption: 'Índice de la review del sprint 2.', image: cat('07-img', 1920, 1080, 'Diapositiva de la review del sprint 2 con el índice de lo diseñado', 'contain') },
    { type: 'outcome', variant: 'data', label: 'Resultado', title: 'La conversión en reserva subió un 18 % en los tres meses siguientes al lanzamiento.', text: 'Datos de analítica de la cadena, comparando el trimestre anterior con el siguiente.', items: [
      { value: '+18 %', label: 'Conversión en reserva', provisional: true },
      { value: '−22 %', label: 'Rebote en la portada', provisional: true },
      { value: '+12 %', label: 'Tráfico', provisional: true },
    ] },
  ],
  seo: { title: 'Catalonia Hotels: sistema de diseño para una web de reservas', description: 'Rediseño de la web de reservas de Catalonia Hotels en diez sprints sobre un sistema de 230 componentes.' },
}

// ───────────────────────────────── Burger King / Popeyes
const bk = (f: string, w: number, h: number, alt: string, fit?: 'contain') => img('burger-king', f, w, h, alt, fit)
const burgerKing: Project = {
  slug: 'burger-king',
  key: 'bk',
  kind: 'case',
  services: ['producto', 'sistemas-de-diseno', 'ux-ui'],
  card: {
    services: 'Producto · Sistema de diseño · Kioskos',
    tagline: 'Kioskos de pedido para dos marcas con una sola librería',
    wide: bk('01-portada', 2880, 1800, 'Hamburguesa, logo de Burger King y el kiosko con su portada de promociones'),
    narrow: bk('03-img', 1080, 1920, 'Kiosko de Burger King: más vendidos', 'contain'),
  },
  title: 'Burger King / Popeyes',
  subtitle: 'Kioskos de pedido para dos marcas con una sola librería',
  sector: 'Restauración · Kioskos',
  role: 'Diseñador UX/UI · Garaje de Ideas',
  year: '2024',
  nda: true,
  cardMeta: 'Restauración · Kioskos · 2024',
  rowMeta: 'Restauración · Diseñador UX/UI · 2024 · NDA',
  ficha: [
    { label: 'Contexto', content: 'Kiosk 2.0: la nueva experiencia de pedido en los kioskos de Burger King y Popeyes, con una librería de diseño común para las dos marcas.' },
    { label: 'Rol y equipo', content: 'Diseñador UX/UI en Garaje de Ideas. Diseñé flujos del kiosko y mantuve la librería.' },
    { label: 'Servicios / stack', content: 'UX/UI · Sistema de diseño · Kioskos' },
    { label: 'Enlaces', content: 'Proyecto bajo NDA.' },
  ],
  blocks: [
    { type: 'cover', image: bk('01-portada', 2880, 1800, 'Hamburguesa, logo de Burger King y el kiosko con su portada de promociones') },
    { type: 'statement', label: 'Resumen', text: 'Diseñé flujos del Kiosk 2.0 de Burger King y Popeyes y mantuve su librería: una sola base de componentes para dos marcas y más de 500 pantallas de kiosko.' },
    { type: 'figures', label: 'En cifras', items: [
      { value: '515', label: 'Pantallas de kiosko' },
      { value: '154', label: 'Componentes en la librería' },
      { value: '2', label: 'Marcas con los mismos componentes' },
      { value: '+9 %', label: 'Ticket medio', provisional: true },
    ] },
    { type: 'gallery', items: [
      { layout: 'full', images: [bk('02-img', 2624, 1476, 'La misma pantalla de hamburguesas en Burger King y en Popeyes')], caption: 'Burger King y Popeyes con los mismos componentes.' },
      { layout: 'phones', images: [
        bk('10-img', 1080, 1920, 'Portada del kiosko de Burger King con promociones y MyBurgerKing'),
        bk('03-img', 1080, 1920, 'Kiosko de Burger King: más vendidos'),
        bk('05-img', 1080, 1920, 'Kiosko de Popeyes: categoría de pollo'),
      ], caption: 'Portada y más vendidos de Burger King, y pollo de Popeyes.' },
    ] },
    { type: 'decision', order: 'text-media', number: '01 · Carrito', title: 'El carrito siempre a la vista', text: 'Al navegar por el menú el pedido se perdía de vista. El carrito pasa a estar fijo abajo durante todo el recorrido, con el número de productos y el botón de pago, para que nadie llegue al final con sorpresas.', caption: 'Barra inferior con carrito y pago.', image: bk('06-img', 1080, 1920, 'Kiosko de Popeyes con la barra inferior de carrito y pago', 'contain') },
    { type: 'decision', order: 'media-text', number: '02 · Venta', title: 'Recomendaciones según lo que llevas', text: 'Las sugerencias dependen del carrito: si falta la bebida o el postre, se ofrecen en el paso donde tienen sentido. Y quien ya ha pedido antes puede repetir su pedido con un toque.', caption: 'Resumen del pedido con productos en tendencia.', image: bk('07-img', 1080, 1920, 'Resumen del pedido con productos recomendados', 'contain') },
    { type: 'decision', order: 'text-media', number: '03 · Librería', title: 'Reglas también para la foto de producto', text: 'La librería comparte componentes entre marcas, con un modo de tokens para cada una. Y fija cómo se encuadra cada foto: tamaño, composición del menú y altura del producto principal, para que la carta se vea ordenada.', caption: 'Guía de imagen de producto: antes y después.', image: bk('08-img', 2028, 1167, 'Guía de composición de foto de producto, antes y después', 'contain') },
    { type: 'decision', order: 'media-text', number: '04 · Alérgenos', title: 'Los alérgenos, en el móvil del cliente', text: 'La tabla de alérgenos no cabe en el kiosko sin estorbar al pedido. Desde el menú superior se abre un código QR: el cliente lo escanea, elige alérgenos o información nutricional y consulta en su móvil el PDF siempre actualizado.', caption: 'Del kiosko al móvil con un código QR.', image: bk('11-img', 2400, 1500, 'Kiosko con el código QR de alérgenos y tres móviles con el listado en PDF', 'contain') },
    { type: 'gallery', items: [
      { layout: 'full', images: [bk('09-img', 1280, 853, 'Clientes pidiendo en un kiosko de Burger King')], caption: 'El kiosko en el restaurante.' },
    ] },
    { type: 'outcome', variant: 'data', label: 'Resultado', title: 'El ticket medio subió un 9 % con las recomendaciones según el carrito.', text: 'Datos del piloto en restaurantes, comparados con el flujo anterior.', items: [
      { value: '+9 %', label: 'Ticket medio', provisional: true },
      { value: '−20 %', label: 'Tiempo de pedido', provisional: true },
      { value: '515', label: 'Pantallas' },
    ] },
  ],
  seo: { title: 'Burger King y Popeyes: kioskos de pedido con una sola librería', description: 'Flujos del Kiosk 2.0 de Burger King y Popeyes y una librería común para dos marcas.' },
}

// ───────────────────────────────── Push
const push = (f: string, w: number, h: number, alt: string, fit?: 'contain') => img('push', f, w, h, alt, fit)
const pushProject: Project = {
  slug: 'push',
  key: 'push',
  kind: 'case',
  services: ['web', 'seo', 'producto', 'ux-ui'],
  card: {
    services: 'Web · SEO · Producto · XR',
    tagline: 'Web de venta y app de terapia con realidad virtual',
    wide: push('01-portada', 1920, 1032, 'Portada de virtualpush.es'),
    narrow: push('00-tarjeta', 1664, 2160, 'Logo de Push y la web en un móvil sobre un cielo de nubes'),
  },
  title: 'Push',
  subtitle: 'Web de venta y app de terapia con realidad virtual',
  sector: 'Salud mental · XR',
  role: 'Cofundador · Producto, diseño y web',
  year: '2024–hoy',
  nda: false,
  cardMeta: 'Salud mental · XR · 2024–hoy',
  rowMeta: 'Salud mental · Cofundador · 2024–hoy',
  ficha: [
    { label: 'Contexto', content: 'Push es una plataforma de realidad virtual para tratar fobias con exposición gradual. La web es su escaparate de ventas: tiene que conseguir que un psicólogo pida una demo o compre un plan.' },
    { label: 'Rol y equipo', content: 'Cofundador. Diseñé la web y su sistema, y el producto de la app, del research al prototipo.' },
    { label: 'Servicios / stack', content: 'Web · SEO · Sistema de diseño · Producto · UX/UI · Research' },
    { label: 'Enlaces', content: 'virtualpush.es', href: 'https://virtualpush.es' },
  ],
  blocks: [
    { type: 'cover', image: push('01-portada', 1920, 1032, 'Portada de virtualpush.es: exposición en realidad virtual dirigida desde tu consulta') },
    { type: 'statement', label: 'Resumen', text: 'Rediseñé virtualpush.es para que venda: una página por fobia para aparecer en Google y un camino corto hasta pedir una demo o comprar un plan. Detrás está la app que el psicólogo usa en consulta con su paciente.' },
    { type: 'figures', label: 'En cifras', items: [
      { value: '10', label: 'Pantallas, en escritorio y móvil' },
      { value: '+65 %', label: 'Tráfico orgánico en tres meses', provisional: true },
      { value: '3,8 %', label: 'Visitas que piden demo', provisional: true },
      { value: '6', label: 'Escenarios en la app' },
    ] },
    { type: 'gallery', items: [
      { layout: 'browser', images: [push('02-img', 1920, 1091, 'Escenarios de exposición: miedo a volar y miedo a conducir')], caption: 'Portada: los escenarios de exposición, a la vista desde el primer scroll.' },
      { layout: 'phones', images: [
        push('03-img', 390, 880, 'Evidencia clínica de Push, en móvil'),
        push('04-img', 390, 1308, 'Formulario para pedir una demo, en móvil'),
        push('05-img', 390, 906, 'Así es una sesión con Push, en móvil'),
      ], caption: 'En móvil: evidencia clínica, pedir una demo y cómo es una sesión.' },
    ] },
    { type: 'decision', order: 'text-media', number: '01 · SEO', title: 'Una página por fobia', text: 'Un psicólogo no busca "realidad virtual", busca cómo tratar el miedo a volar. Cada fobia tiene su página, con los niveles del escenario, preguntas frecuentes y el botón para pedir la demo.', caption: '/miedo-a-volar', image: push('06-img', 1920, 816, 'Cabecera de la página de miedo a volar', 'contain') },
    { type: 'decision', order: 'media-text', number: '02 · Venta', title: 'Dos caminos para comprar: demo o plan', text: 'Quien duda pide una demo con un formulario corto; quien lo tiene claro elige plan y paga en el momento. Los dos botones están en toda la web y cada camino acaba en su página de confirmación.', caption: '/precios', image: push('07-img', 1920, 912, 'Página de precios con los planes para profesionales', 'contain') },
    { type: 'decision', order: 'text-media', number: '03 · Sistema', title: 'Un archivo pensado para pasar a código', text: 'Tokens con nombre CSS, modos de escritorio y móvil, componentes para todo lo que se repite y un prototipo enlazado. La web se monta en Next.js y Tailwind sin traducir nada a mano.', caption: 'Fundamentos de la web: color.', image: push('08-img', 1680, 988, 'Paleta de color y tokens de la web de Push', 'contain') },
    { type: 'gallery', items: [
      { layout: 'full', images: [push('09-img', 2400, 1500, 'Construcción del escenario de miedo a conducir')], caption: 'Construcción escenario del miedo a conducir.' },
      { layout: 'full', images: [push('10-img', 2400, 1500, 'Panel de control y escenario de una cabina de avión')], caption: 'Panel de control y escenario de una cabina de avión.' },
    ] },
    { type: 'decision', order: 'media-text', number: '04 · App', title: 'La exposición sube por niveles y la decide el psicólogo', text: 'Antes de diseñar analicé diez gafas de realidad virtual y mixta y seis apps de salud mental y terapia. Con eso y las entrevistas con psicólogos, cada escenario se dividió en capítulos de intensidad creciente que desbloquea el terapeuta.', caption: 'Parte del estudio de mercado de gafas.', image: push('11-img', 2400, 1500, 'Estudio de mercado de gafas de realidad virtual', 'contain') },
    { type: 'outcome', variant: 'data', label: 'Resultado', title: 'En sus tres primeros meses, la web nueva trae 14 demos al mes.', text: 'Medido con la analítica de la web, comparando con los tres meses anteriores al rediseño.', items: [
      { value: '14', label: 'Demos al mes', provisional: true },
      { value: '+65 %', label: 'Tráfico orgánico', provisional: true },
      { value: '3,8 %', label: 'Conversión a demo', provisional: true },
    ] },
  ],
  seo: { title: 'Push: web de venta y app de terapia con realidad virtual', description: 'Rediseño de virtualpush.es orientado a SEO y venta, y diseño de producto de la app de exposición en realidad virtual.' },
}

// ───────────────────────────────── RBI
const rbi = (f: string, w: number, h: number, alt: string, fit?: 'contain') => img('rbi', f, w, h, alt, fit)
const rbiProject: Project = {
  slug: 'rbi',
  key: 'rbi',
  kind: 'case',
  services: ['producto', 'ux-ui'],
  card: {
    services: 'Producto · UX/UI · App',
    tagline: 'La app de los empleados de Burger King, Popeyes y Tim Hortons',
    wide: rbi('01-portada', 1015, 884, 'App de empleados de RBI con el calendario de turnos'),
    narrow: rbi('02-img', 739, 1600, 'App de empleados de RBI: turnos'),
  },
  title: 'RBI',
  subtitle: 'La app de los empleados de Burger King, Popeyes y Tim Hortons',
  sector: 'Restauración · App interna',
  role: 'Diseñador UX/UI · Garaje de Ideas',
  year: '2023–2024',
  nda: true,
  cardMeta: 'App interna · 2023–2024',
  rowMeta: 'Restauración · Diseñador UX/UI · 2023–2024 · NDA',
  ficha: [
    { label: 'Contexto', content: 'App interna de RBI para los empleados de restaurantes y oficinas: turnos, vacaciones, ausencias, noticias, comunidad, beneficios y loyalty, para cuatro marcas.' },
    { label: 'Rol y equipo', content: 'Diseñador UX/UI en Garaje de Ideas. Entré sobre la base de una compañera y diseñé módulos nuevos.' },
    { label: 'Servicios / stack', content: 'UX/UI · App iOS y Android · Web · Fichas de tienda' },
    { label: 'Enlaces', content: 'Proyecto bajo NDA.' },
  ],
  blocks: [
    { type: 'cover', image: rbi('01-portada', 1015, 884, 'App de empleados de RBI con el calendario de turnos') },
    { type: 'statement', label: 'Resumen', text: 'La app con la que los empleados de Burger King, Popeyes y Tim Hortons consultan sus turnos, piden vacaciones, cubren ausencias y siguen las noticias de la empresa. Una sola app para cuatro marcas, en móvil y en web.' },
    { type: 'figures', label: 'En cifras', items: [
      { value: '550+', label: 'Pantallas diseñadas' },
      { value: '4', label: 'Marcas en una app' },
      { value: '12', label: 'Módulos' },
      { value: '2', label: 'Idiomas en las tiendas' },
    ] },
    { type: 'gallery', items: [
      { layout: 'phones', images: [
        rbi('02-img', 739, 1600, 'Captura de tienda de la app de empleados'),
        rbi('03-img', 739, 1600, 'Captura de tienda de la app de empleados'),
        rbi('04-img', 739, 1600, 'Captura de tienda de la app de empleados'),
      ], caption: 'Capturas para App Store y Google Play.' },
    ] },
    { type: 'decision', order: 'text-media', number: '01 · Marcas', title: 'Una app, cuatro marcas', text: 'El onboarding pregunta a qué marca perteneces y la app se viste con sus colores: Burger King, Popeyes, Tim Hortons u oficina de RBI. Las funciones son las mismas; cambia la piel.', caption: 'Onboarding por marca.', image: rbi('05-img', 360, 800, 'Pantalla de onboarding con elección de marca', 'contain') },
    { type: 'decision', order: 'media-text', number: '02 · Ausencias', title: 'Cubrir una ausencia sin llamar a nadie', text: 'Ausencias y vacantes fue el módulo más grande, con más de 150 pantallas. Cuando alguien falta, la app propone a un compañero disponible para cubrir el turno y el responsable lo aprueba desde el móvil.', caption: 'Propuesta de empleado para cubrir un turno.', image: rbi('06-img', 360, 800, 'Propuesta de un compañero para cubrir un turno', 'contain') },
    { type: 'outcome', variant: 'learning', label: 'Qué aprendí', title: 'Al heredar un proyecto, primero decides qué conservar y luego qué cambiar.', text: 'Respetar la base de mi compañera me dejó dedicar el tiempo a los módulos nuevos y a los puntos que más quejas daban.' },
  ],
  seo: { title: 'RBI: app de empleados para Burger King, Popeyes y Tim Hortons', description: 'Diseño de la app interna de RBI: turnos, ausencias, noticias y beneficios para cuatro marcas, en móvil y web.' },
}

// ───────────────────────────────── Santalucía Impulsa
const sl = (f: string, w: number, h: number, alt: string, fit?: 'contain') => img('santalucia', f, w, h, alt, fit)
const santalucia: Project = {
  slug: 'santalucia',
  key: 'santalucia',
  kind: 'case',
  services: ['producto', 'ux-ui'],
  card: {
    services: 'UX research · Producto',
    tagline: 'Saber en qué punto está la reparación de tu casa',
    wide: sl('01-portada', 2880, 1800, 'Manos protegiendo una casa y la app de Santalucía Impulsa en dos móviles'),
    narrow: sl('01-portada', 2880, 1800, 'Manos protegiendo una casa y la app de Santalucía Impulsa'),
  },
  title: 'Santalucía Impulsa',
  subtitle: 'Saber en qué punto está la reparación de tu casa',
  sector: 'Seguros · App',
  role: 'Proyecto de bootcamp · UXER School',
  year: '2023',
  nda: false,
  cardMeta: 'Seguros · App · 2023',
  rowMeta: 'Seguros · Proyecto de bootcamp · 2023',
  ficha: [
    { label: 'Contexto', content: 'Proyecto del bootcamp de UXER School sobre Santalucía, no un encargo de la aseguradora. El reto: un canal para que el cliente siga el estado de un siniestro de su casa.' },
    { label: 'Rol y equipo', content: 'Diseñador UX/UI: research, flujo, wireframes, guía de estilo y diseño final.' },
    { label: 'Servicios / stack', content: 'Research · User flow · Wireframes · UX/UI · Guía de estilo' },
    { label: 'Enlaces', content: 'Caso publicado por UXER School', href: '' /* TODO: URL del caso en UXER School */ },
  ],
  blocks: [
    { type: 'cover', image: sl('01-portada', 2880, 1800, 'Manos protegiendo una casa y la app de Santalucía Impulsa en dos móviles') },
    { type: 'statement', label: 'Resumen', text: 'Una app para que el cliente de Santalucía sepa en todo momento en qué punto está la reparación de su casa: quién va, cuándo y qué falta. Proyecto del bootcamp de UXER School, elegido después como caso de estudio.' },
    { type: 'figures', label: 'En cifras', items: [
      { value: '4', label: 'Problemas detectados en el research' },
      { value: '3', label: 'Principios de diseño' },
      { value: '50+', label: 'Pantallas' },
      { value: '12', label: 'Pantallas en el diseño final' },
    ] },
    { type: 'gallery', items: [
      { layout: 'phones', images: [
        sl('02-img', 425, 856, 'Notificación de la app en la pantalla de bloqueo'),
        sl('03-img', 425, 856, 'Estado del siniestro'),
        sl('04-img', 425, 856, 'Profesional asignado y hora de llegada'),
      ], caption: 'Diseño final: aviso, estado del siniestro y profesional asignado.' },
    ] },
    { type: 'decision', order: 'text-media', number: '01 · Research', title: 'El problema era no saber qué estaba pasando', text: 'El research dejó claro que no saber en qué punto está el siniestro ni qué viene después genera inseguridad y desconfianza. La app gira alrededor de un estado claro: abierto, en curso, resolución y cierre.', caption: 'Estado del siniestro, paso a paso.', image: sl('05-img', 425, 856, 'Pantalla de estado del siniestro paso a paso', 'contain') },
    { type: 'decision', order: 'media-text', number: '02 · Flujo', title: 'Cambiar la visita en un par de gestos', text: 'El cliente ve qué profesional va, a qué hora llega y puede cambiar fecha u hora en un par de gestos. Santalucía o la empresa reparadora se encargan del resto, incluido el videoperitaje cuando hace falta.', caption: 'Wireframe del videoperitaje.', image: sl('06-img', 628, 766, 'Wireframe del flujo de videoperitaje', 'contain') },
    { type: 'outcome', variant: 'learning', label: 'Qué aprendí', title: 'En un proceso largo, lo que más tranquiliza es saber cuál es el siguiente paso.', text: 'Por eso cada pantalla del estado dice qué ha pasado, qué va a pasar y cuándo. UXER School eligió el proyecto como caso de estudio.' },
  ],
  seo: { title: 'Santalucía Impulsa: seguir la reparación de tu casa', description: 'App para seguir el estado de un siniestro del hogar. Proyecto de bootcamp de UXER School elegido como caso de estudio.' },
}

// ───────────────────────────────── Rank Me Higher
const rmh = (f: string, w: number, h: number, alt: string, fit?: 'contain') => img('rank-me-higher', f, w, h, alt, fit)
const rankMeHigher: Project = {
  slug: 'rank-me-higher',
  key: 'rank',
  kind: 'case',
  services: ['web', 'seo', 'ux-ui'],
  card: {
    services: 'Web · SEO · UX/UI',
    tagline: 'Diseño y SEO para una agencia de Londres',
    wide: rmh('01-portada', 2880, 1800, 'Portada y página de servicios de rankmehigher.co sobre el degradado de la marca'),
    narrow: rmh('01-portada', 2880, 1800, 'Web de Rank Me Higher'),
  },
  title: 'Rank Me Higher',
  subtitle: 'Diseño y SEO para una agencia de Londres',
  sector: 'Marketing · SEO',
  role: 'Diseño UX/UI y consultoría SEO/GEO',
  year: '2022–hoy',
  nda: false,
  cardMeta: 'Marketing · SEO · 2022–hoy',
  rowMeta: 'Marketing · UX/UI y SEO/GEO · 2022–hoy',
  ficha: [
    { label: 'Contexto', content: 'Rank Me Higher es una agencia de SEO de Londres. Necesitaba una web que convirtiera y alguien que llevara a la vez el diseño y el posicionamiento de sus clientes.' },
    { label: 'Rol y equipo', content: 'Diseñador UX/UI y consultor SEO/GEO, en remoto con el equipo de Londres.' },
    { label: 'Servicios / stack', content: 'UX/UI · Web · SEO · GEO · Branding' },
    { label: 'Enlaces', content: 'rankmehigher.co', href: 'https://rankmehigher.co' },
  ],
  blocks: [
    { type: 'cover', image: rmh('01-portada', 2880, 1800, 'Portada y página de servicios de rankmehigher.co sobre el degradado de la marca') },
    { type: 'statement', label: 'Resumen', text: 'Diseño la web de Rank Me Higher y llevo el SEO y el GEO de sus clientes: pymes de varios países que necesitan salir en Google y en las respuestas de los buscadores con IA.' },
    { type: 'figures', label: 'En cifras', items: [
      { value: '25', label: 'Webs de clientes diseñadas', provisional: true },
      { value: '+140 %', label: 'Tráfico orgánico medio', provisional: true },
      { value: '3', label: 'Países', provisional: true },
      { value: '4', label: 'Años trabajando juntos' },
    ] },
    { type: 'gallery', items: [
      { layout: 'browser', images: [rmh('02-img', 2400, 1282, 'Portada de rankmehigher.co')], caption: 'Portada: casos de clientes antes que promesas.' },
    ] },
    { type: 'decision', order: 'text-media', number: '01 · Web', title: 'Una web que vende con casos de clientes', text: 'La web anterior hablaba de SEO en abstracto. En la nueva, la portada enseña resultados de clientes y cada servicio tiene su propia página, pensada también para posicionar.', caption: 'Página de servicio.', image: rmh('03-img', 2400, 1282, 'Página de servicio de Rank Me Higher', 'contain') },
    { type: 'decision', order: 'media-text', number: '02 · SEO y GEO', title: 'Salir en Google y también en las respuestas de la IA', text: 'Desde 2024 no basta con Google: los clientes también tienen que aparecer en ChatGPT, Perplexity o Gemini. Ordeno el contenido con datos estructurados y respuestas directas para que esos buscadores lo citen.', caption: 'Contenido preparado para buscadores con IA.', image: rmh('04-img', 2400, 1282, 'Página con contenido estructurado para buscadores', 'contain') },
    { type: 'outcome', variant: 'data', label: 'Resultado', title: 'El tráfico orgánico de los clientes creció un 140 % de media en el primer año.', text: 'Media de las cuentas que llevo, medida en Google Search Console.', items: [
      { value: '+140 %', label: 'Tráfico orgánico', provisional: true },
      { value: '+35 %', label: 'Contactos desde la web de RMH', provisional: true },
      { value: '60', label: 'Palabras clave en el top 3', provisional: true },
    ] },
  ],
  seo: { title: 'Rank Me Higher: diseño y SEO para una agencia de Londres', description: 'Web de Rank Me Higher y SEO/GEO para sus clientes: pymes que necesitan salir en Google y en buscadores con IA.' },
}


// ───────────────────────────────── Proyectos de marca (kind: 'brand')
// Página corta: cabecera + barra con la ficha ABIERTA por defecto, una pareja de imágenes y "Siguiente proyecto".
const svg = (slug: string, w: number, h: number, alt: string): Img => ({ src: `/proyectos/${slug}/logo.svg`, w, h, alt })

const salma: Project = {
  slug: 'salma',
  key: 'salma',
  kind: 'brand',
  title: 'Salma',
  subtitle: 'Identidad y redes para un centro de entrenamiento en Málaga',
  sector: 'Fitness',
  role: 'Branding y redes sociales',
  year: '2026', // TODO Rodrigo: confirmar año
  nda: false,
  services: ['branding'],
  card: {
    services: 'Branding · Redes sociales',
    tagline: 'Identidad y redes para un centro de entrenamiento en Málaga',
    logo: svg('salma', 300, 80, 'Logotipo de Salma'),
  },
  cardMeta: 'Fitness · Branding · 2026',
  rowMeta: 'Fitness · Branding y redes sociales · 2026',
  ficha: [
    { label: 'Contexto', content: 'Salma es un centro de entrenamiento en grupos pequeños en Málaga, pensado para entrenar a tu ritmo y cuidar el cuerpo en momentos delicados: embarazo, postparto o a partir de cierta edad.' },
    { label: 'Rol y equipo', content: 'Diseñador de marca y redes sociales. Trabajo directo con los dos fundadores.' },
    { label: 'Servicios / stack', content: 'Identidad de marca · Logotipo e isotipo · Plantillas y calendario de contenido para Instagram' },
    { label: 'Enlaces', content: 'Instagram', href: '' /* TODO Rodrigo: URL de Instagram de Salma, o borrar la fila */ },
  ],
  blocks: [
    { type: 'gallery', items: [
      { layout: 'pair', images: [
        img('salma', '01-isotipo', 1280, 1280, 'Isotipo de Salma en crema sobre verde oliva'),
        img('salma', '02-logo', 1280, 1280, 'Logotipo de Salma en verde oscuro sobre crema'),
      ] },
    ] },
  ],
  seo: { title: 'Salma: identidad y redes para un centro de entrenamiento', description: 'Identidad de marca, logotipo, isotipo y contenido de Instagram para Salma, centro de entrenamiento en grupos pequeños en Málaga.' },
}

const malagaTech: Project = {
  slug: 'malaga-tech',
  key: 'malaga-tech',
  kind: 'brand',
  title: 'Málaga Tech',
  subtitle: 'Identidad de marca para la comunidad de startups de Málaga', // TODO Rodrigo: si fue una propuesta, cambiar a "Propuesta de identidad…"
  sector: 'Emprendimiento',
  role: 'Branding',
  year: '2026', // TODO Rodrigo: confirmar año
  nda: false,
  services: ['branding'],
  card: {
    services: 'Branding',
    tagline: 'Identidad de marca para la comunidad de startups de Málaga',
    logo: svg('malaga-tech', 340, 66, 'Logotipo de Málaga Tech'),
  },
  cardMeta: 'Emprendimiento · Branding · 2026',
  rowMeta: 'Emprendimiento · Branding · 2026',
  ficha: [
    { label: 'Contexto', content: 'Málaga Tech es la asociación de emprendedores tecnológicos más grande del sur de España. Organiza eventos, programas de incubación y aceleración, y conecta a las startups con inversores y empresas.' },
    { label: 'Rol y equipo', content: 'Diseñador de marca.' },
    { label: 'Servicios / stack', content: 'Identidad de marca · Logotipo e isotipo · Sistema de iconos' },
    { label: 'Enlaces', content: 'techmalaga.com', href: 'https://techmalaga.com' },
  ],
  blocks: [
    { type: 'gallery', items: [
      { layout: 'pair', images: [
        img('malaga-tech', '01-isotipo', 1280, 1280, 'Isotipo de Málaga Tech sobre negro'),
        img('malaga-tech', '02-logo', 1280, 1280, 'Logotipo de Málaga Tech con su sistema de iconos sobre blanco'),
      ] },
    ] },
  ],
  seo: { title: 'Málaga Tech: identidad de marca', description: 'Identidad de marca para Málaga Tech, la asociación de emprendedores tecnológicos de Málaga.' },
}

const laskurain: Project = {
  slug: 'laskurain',
  key: 'laskurain',
  kind: 'brand',
  title: 'Laskurain',
  subtitle: 'Web para un consultor de estrategia de marca',
  sector: 'Consultoría',
  role: 'Diseño y desarrollo web',
  year: '2026', // TODO Rodrigo: confirmar año
  nda: false,
  services: ['web'],
  card: {
    services: 'Web · WordPress',
    tagline: 'Web para un consultor de estrategia de marca',
    wide: img('laskurain', '00-tarjeta', 2880, 1800, 'Portada de laskurain.es en un navegador'),
    narrow: img('laskurain', '00-tarjeta', 2880, 1800, 'Portada de laskurain.es en un navegador', 'contain'),
  },
  cardMeta: 'Consultoría · Web · 2026',
  rowMeta: 'Consultoría · Diseño y desarrollo web · 2026',
  ficha: [
    { label: 'Contexto', content: 'Miguel Ángel Laskurain ayuda a empresas cuyo valor no llega al mercado, después de veinte años en Silicon Valley. Su web tenía que explicar un servicio intangible con la misma claridad que vende.' },
    { label: 'Rol y equipo', content: 'Diseño web y desarrollo en WordPress con Elementor Pro.' },
    { label: 'Servicios / stack', content: 'Diseño web · Desarrollo en WordPress · Web bilingüe (ES/EN)' },
    { label: 'Enlaces', content: 'laskurain.es', href: 'https://laskurain.es' },
  ],
  blocks: [
    { type: 'gallery', items: [
      { layout: 'pair', images: [
        img('laskurain', '01-web-escritorio', 1728, 1280, 'Portada de laskurain.es en escritorio'),
        img('laskurain', '02-web-movil', 832, 1280, 'Portada de laskurain.es en móvil'),
      ] },
    ] },
  ],
  seo: { title: 'Laskurain: web para un consultor de estrategia de marca', description: 'Diseño y desarrollo en WordPress de laskurain.es, la web de Miguel Ángel Laskurain, consultor de posicionamiento de marca.' },
}

/** Orden de la web. "Siguiente proyecto" = el siguiente del array (el último vuelve al primero). */
export const projects: Project[] = [
  catalonia,
  pushProject,
  rbiProject,
  burgerKing,
  santalucia,
  rankMeHigher,
  salma,
  malagaTech,
  laskurain,
]

/** Slugs de la home ("Proyectos destacados"), en este orden: filas 8+4 / 4+8. */
export const featuredSlugs = ['catalonia', 'push', 'rbi', 'burger-king'] as const

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
