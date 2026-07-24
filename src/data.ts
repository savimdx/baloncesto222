import { BenefitItem, BonusItem, DrillItem, TestimonialItem, FAQItem } from './types';

export const HERO_BULLETS = [
  "Más de 1000 sesiones listas para aplicar",
  "Adaptable a todas las categorías y edades",
  "Ahorra horas de planificación semanal",
  "Acceso inmediato y de por vida"
];

export const RECEIVE_CARDS = [
  {
    id: "rec-1",
    tag: "OFENSIVA",
    title: "Sesiones Ofensivas",
    description: "Sistemas de ataque estructurados, spacing moderno, cortes, circulación rápida de balón y lectura de ventajas.",
    accent: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Sword"
  },
  {
    id: "rec-2",
    tag: "DEFENSA",
    title: "Sesiones Defensivas",
    description: "Presión a toda cancha, defensa individual, ajustes en zona, ayudas, rotaciones y fintas defensivas efectivas.",
    accent: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    icon: "Shield"
  },
  {
    id: "rec-3",
    tag: "VELOCIDAD",
    title: "Contraataque",
    description: "Transiciones explosivas, salida de presión, toma de decisiones rápidas en superioridad numérica y pases de apertura.",
    accent: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: "Zap"
  },
  {
    id: "rec-4",
    tag: "PUNTERÍA",
    title: "Tiro Exterior",
    description: "Mecánica de tiro perfecta, catch & shoot, tiro tras bote, salidas de pantallas y rutinas de alta repetición.",
    accent: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Target"
  },
  {
    id: "rec-5",
    tag: "MANEJO",
    title: "Dribbling",
    description: "Manejo de balón avanzado con ambas manos, cambios de dirección mortales, fintas y velocidad de ejecución.",
    accent: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    icon: "Dribbble"
  },
  {
    id: "rec-6",
    tag: "TÁCTICA",
    title: "Pick & Roll",
    description: "Lectura del bloqueo directo, ángulos de pantalla, continuaciones (roll/pop) y toma de decisiones del base.",
    accent: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "Users"
  },
  {
    id: "rec-7",
    tag: "SISTEMAS",
    title: "Transiciones",
    description: "Llegadas en transición secundaria, spacing rápido tras rebote defensivo y canastas en los primeros 8 segundos.",
    accent: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    icon: "TrendingUp"
  },
  {
    id: "rec-8",
    tag: "FÍSICO",
    title: "Preparación Física",
    description: "Fuerza explosiva, salto vertical (pliometría), resistencia aeróbica, agilidad lateral y prevención de lesiones.",
    accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "Activity"
  },
  {
    id: "rec-9",
    tag: "ROLES",
    title: "Trabajo por Posiciones",
    description: "Sesiones especializadas con detalles técnicos individuales para bases (guards), aleros (wings) y pívots (bigs).",
    accent: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: "Award"
  },
  {
    id: "rec-10",
    tag: "BASE",
    title: "Categorías Inferiores",
    description: "Entrenamientos dinámicos y lúdicos enfocados en la iniciación, psicomotricidad, diversión y fundamentos del mini-basket.",
    accent: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    icon: "Smile"
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: "ben-1",
    title: "Más de 1000 sesiones listas",
    description: "Accede al instante a una biblioteca monumental de sesiones preparadas para copiar y aplicar en la cancha desde el primer minuto."
  },
  {
    id: "ben-2",
    title: "Adaptable a todas las categorías",
    description: "Desde el baloncesto infantil y escolar hasta equipos senior competitivos. Filtra y ajusta según la edad y nivel técnico."
  },
  {
    id: "ben-3",
    title: "Ahorra horas de planificación",
    description: "No pases horas dibujando jugadas en cuadernos o buscando videos en internet. Ten tu semana de entrenamiento organizada en 5 minutos."
  },
  {
    id: "ben-4",
    title: "Acceso inmediato",
    description: "Recibe todo el material digital directamente en tu correo electrónico segundos después de completar tu registro, disponible para siempre."
  },
  {
    id: "ben-5",
    title: "Actualizaciones gratuitas",
    description: "La biblioteca se expande regularmente. Recibirás todos los nuevos sistemas, ejercicios y recursos añadidos sin pagar un solo centavo extra."
  },
  {
    id: "ben-6",
    title: "Acceso de por vida",
    description: "Un pago único sin molestas suscripciones mensuales o anuales. El material es tuyo de forma permanente e ilimitada."
  }
];

export const BONUSES: BonusItem[] = [
  {
    id: "bon-1",
    number: 1,
    title: "Ejercicios de Manejo de Balón en el Baloncesto",
    description: "Aprende ejercicios progresivos para mejorar el control del balón, cambios de dirección y velocidad de ejecución.",
    originalPrice: 39,
    tag: "MANEJO DE BALÓN",
    image: "https://i.postimg.cc/xCthVTWc/Chat-GPT-Image-18-de-jul-de-2026-20-14-42.png"
  },
  {
    id: "bon-2",
    number: 2,
    title: "Ejercicios de Técnica Individual e Táctica de Baloncesto",
    description: "Rutinas para desarrollar precisión, mecánica de lanzamiento, tiros en movimiento y situaciones reales de partido.",
    originalPrice: 49,
    tag: "TÉCNICA Y TÁCTICA",
    image: "https://i.postimg.cc/d0n4LNn8/Chat-GPT-Image-18-de-jul-de-2026-20-15-40.png"
  },
  {
    id: "bon-3",
    number: 3,
    title: "Ejercicios para el Entrenamiento del Bote, el Rebote y el Pase en el Baloncesto",
    description: "Manual completo con progresiones para perfeccionar el pase de apertura, el bloqueo reboteador y el bote dinámico bajo presión.",
    originalPrice: 29,
    tag: "FUNDAMENTOS PRO",
    image: "https://i.postimg.cc/xqrPWwTV/Chat-GPT-Image-18-de-jul-de-2026-20-17-11.png"
  },
  {
    id: "bon-4",
    number: 4,
    title: "Lecciones en Video de Baloncesto",
    description: "Videotutoriales paso a paso con la demostración de jugadas preparadas, lectura táctica y corrección de errores comunes explicados en detalle.",
    originalPrice: 59,
    tag: "LECCIONES EN VIDEO",
    image: "https://i.postimg.cc/SR4nyWRc/Chat-GPT-Image-20-de-jul-de-2026-20-59-47.png"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Adrián Gómez",
    role: "Entrenador Cantera - Club de Baloncesto",
    quote: "Ahorro más de 5 horas cada semana. Ya no tengo que buscar videos sueltos en Instagram o YouTube. Mis entrenamientos ahora son estructurados y los chicos progresan muchísimo más rápido.",
    rating: 5,
    achievement: "✓ 5 Horas Ahorradas Semanalmente",
    avatarSeed: "adrian",
    avatarUrl: "https://i.postimg.cc/8CtkQ8MB/1-19082024mf14-39510599.webp"
  },
  {
    id: "test-2",
    name: "Patrick Ruiz",
    role: "Coordinador Mini-Basket y Juvenil",
    quote: "Mis entrenamientos ahora son mucho más dinámicos. Los jugadores están muy motivados y los ejercicios progresivos me permiten adaptarlos tanto a niños de 10 años como a juveniles.",
    rating: 5,
    achievement: "✓ Motivación y dinamismo al 100%",
    avatarSeed: "patricia",
    avatarUrl: "https://i.postimg.cc/pTrWP0JY/images111.jpg"
  },
  {
    id: "test-3",
    name: "Carlos Villalba",
    role: "Director de Academia de Alto Rendimiento",
    quote: "Los jugadores están mucho más motivados. Este manual nos dio la consistencia que nos faltaba. Los conceptos tácticos como el Pick & Roll y Spacing están explicados de forma súper visual.",
    rating: 5,
    achievement: "✓ Resultados reales en competiciones",
    avatarSeed: "carlosv",
    avatarUrl: "https://i.postimg.cc/76hHqBn1/images444.jpg"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "¿Cómo recibiré el material?",
    answer: "Recibirás un enlace de descarga inmediata en tu correo electrónico segundos después de completar tu pago. Todo es digital y está disponible para siempre, compatible con celulares, tablets y computadoras, o listo para imprimir."
  },
  {
    id: "faq-2",
    question: "¿Sirve para baloncesto infantil?",
    answer: "Absolutamente. Incluye una sección específica de baloncesto base (mini-basket) y todos los ejercicios cuentan con variantes de progresión para simplificar o aumentar la dificultad según la categoría."
  },
  {
    id: "faq-3",
    question: "¿Es un pago único o mensual?",
    answer: "Es un pago único de por vida. No hay suscripciones, cargos ocultos ni cuotas de renovación. Pagas una vez hoy y disfrutas del material para siempre."
  },
  {
    id: "faq-4",
    question: "¿Tiene garantía de reembolso?",
    answer: "Sí. Ofrecemos una garantía incondicional de satisfacción de 7 días. Si por cualquier motivo sientes que este material no eleva la calidad de tus entrenamientos, nos envías un correo y te devolvemos el 100% de tu dinero."
  },
  {
    id: "faq-5",
    question: "¿Cómo puedo imprimir las plantillas?",
    answer: "Todas las plantillas están formateadas en alta resolución listas para imprimir en tamaño estándar de hoja carta o A4. Las puedes plastificar o llevar directamente en tu carpeta de cancha."
  }
];

export const DRILLS: DrillItem[] = [
  {
    id: "drill-1",
    category: "Movimientos Ofensivos",
    title: "Pick & Roll Central con Spacing de Tiradores",
    description: "Ejercicio de lectura táctica enfocado en el bloqueo directo central (Pick & Roll) con recolocación de tiradores en las esquinas y alero en 45 grados.",
    objective: "Mejorar la lectura táctica del portador del balón, la continuación rápida del bloqueador (Roll) y la descarga al tirador abierto.",
    organization: "Media cancha de baloncesto. Grupos de 4 contra 4 con un balón.",
    development: [
      "El base (1) conduce en el centro y recibe un bloqueo directo del pívot (5).",
      "El pívot continúa con fuerza hacia el aro (Roll).",
      "Los tiradores (2 y 3) mantienen espaciado en esquinas y corrigen su posición según la ayuda defensiva.",
      "El base debe leer si penetrar directo, descargar al pívot en el aro, o doblar el balón a los tiradores en el perímetro."
    ],
    variations: [
      "Variante 1: Forzar al pívot a abrirse para tiro exterior (Pick & Pop).",
      "Variante 2: Limitar la ofensiva a un máximo de 3 pases antes del lanzamiento."
    ],
    players: [
      { x: 200, y: 220, team: 'blue', label: "Base (1)" },
      { x: 240, y: 190, team: 'blue', label: "Pívot (5)" },
      { x: 70, y: 150, team: 'blue', label: "Escolta (2)" },
      { x: 330, y: 150, team: 'blue', label: "Alero (3)" },
      { x: 195, y: 130, team: 'red', label: "Defensor" },
      { x: 250, y: 100, team: 'red', label: "Defensor" },
      { x: 202, y: 208, team: 'ball' }
    ],
    lines: [
      { x1: 200, y1: 220, x2: 240, y2: 150, type: 'dribble' },
      { x1: 240, y1: 190, x2: 200, y2: 90, type: 'run' },
      { x1: 240, y1: 150, x2: 70, y2: 150, type: 'pass' }
    ]
  },
  {
    id: "drill-2",
    category: "Fundamentos de Tiro",
    title: "Salida de Pantalla Indirecta (Catch & Shoot)",
    description: "Estación de tiro de alta intensidad para automatizar el movimiento sin balón, la parada en dos tiempos y el lanzamiento veloz.",
    objective: "Perfeccionar la salida explosiva de bloqueo indirecto, recepción en carrera y equilibrio para el tiro exterior.",
    organization: "Media cancha, una canasta, con 3 conos simulando bloqueos y un pasador constante.",
    development: [
      "El tirador (1) amaga un corte hacia la canasta para desmarcarse.",
      "Sale en velocidad cortando rozando los conos (pantalla indirecta imaginaria) hacia la línea de tres puntos.",
      "Recibe un pase tenso del pivote o pasador (2).",
      "Realiza parada en un tiempo y tiro rápido con alineación perfecta."
    ],
    variations: [
      "Variante 1: Realizar finta de tiro tras recepción y atacar el aro con flotadora.",
      "Variante 2: Añadir un defensor recuperando activamente para forzar tiro punteado."
    ],
    players: [
      { x: 160, y: 110, team: 'blue', label: "Tirador" },
      { x: 200, y: 240, team: 'blue', label: "Pasador" },
      { x: 210, y: 225, team: 'ball' },
      { x: 130, y: 140, team: 'cone', label: "Bloqueo" },
      { x: 180, y: 150, team: 'cone', label: "Bloqueo" }
    ],
    lines: [
      { x1: 160, y1: 110, x2: 90, y2: 150, type: 'run' },
      { x1: 90, y1: 150, x2: 120, y2: 190, type: 'run' },
      { x1: 200, y1: 240, x2: 120, y2: 190, type: 'pass' }
    ]
  },
  {
    id: "drill-3",
    category: "Transición Ofensiva",
    title: "Contraataque Estructurado 3 vs 2",
    description: "Desarrollo rápido de la transición ofensiva buscando canastas fáciles en ventaja numérica antes del repliegue completo de la defensa.",
    objective: "Optimizar el espaciado de transición, los carriles de contraataque y la toma de decisiones rápidos.",
    organization: "Cancha completa o media cancha. 3 atacantes contra 2 defensores colocados en tándem.",
    development: [
      "El jugador central conduce el balón por el pasillo del centro (carril central).",
      "Los dos extremos corren a máxima velocidad pegados a las bandas ensanchando la defensa (carriles de banda).",
      "El defensor de adelante sale a parar el balón.",
      "El conductor pasa al extremo libre, quien ataca la canasta o dobla al poste bajo según se mueva el segundo defensor."
    ],
    variations: [
      "Variante 1: Si no hay tiro rápido, pasar a sistemas de transición secundaria.",
      "Variante 2: Añadir un tercer defensor persiguiendo desde atrás con 2 segundos de retraso."
    ],
    players: [
      { x: 200, y: 240, team: 'blue', label: "Conductor" },
      { x: 60, y: 200, team: 'blue', label: "Extremo Izq" },
      { x: 340, y: 200, team: 'blue', label: "Extremo Der" },
      { x: 200, y: 120, team: 'red', label: "Defensor 1" },
      { x: 200, y: 70, team: 'red', label: "Defensor 2" },
      { x: 195, y: 225, team: 'ball' }
    ],
    lines: [
      { x1: 200, y1: 240, x2: 200, y2: 150, type: 'dribble' },
      { x1: 200, y1: 150, x2: 60, y2: 130, type: 'pass' },
      { x1: 340, y1: 200, x2: 300, y2: 90, type: 'run' }
    ]
  }
];
