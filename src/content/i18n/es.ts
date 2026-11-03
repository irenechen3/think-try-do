import type { Dictionary } from "./en";

/**
 * Spanish copy. Must mirror en.ts exactly (TypeScript checks the shape).
 * Written for Panamanian / Latin American Spanish, using "tú".
 */

export const es: Dictionary = {
  meta: {
    title: "Think Try Do | Aventuras del mundo real para niños curiosos",
    description:
      "Talleres prácticos de construcción, resolución de problemas y aventura para niños de 4 a 12 años. Muy pronto en Coronado, Panamá.",
  },

  nav: {
    skip: "Ir al contenido",
    adventures: "Aventuras",
    how: "Cómo funciona",
    ages: "Edades",
    faq: "Preguntas",
    join: "Únete a la lista",
    menu: "Menú",
    close: "Cerrar menú",
    languageLabel: "Idioma",
  },

  cta: {
    primary: "Únete a las Familias Fundadoras",
    secondary: "Descubre las aventuras",
    sticky: "Únete a la lista",
  },

  hero: {
    eyebrow: "Muy pronto en Coronado, Panamá",
    headline: "Aventuras del mundo real para niños curiosos.",
    body: "Talleres prácticos donde los niños construyen, experimentan, resuelven problemas y descubren lo que son capaces de hacer cuando nadie les da la respuesta.",
    facts: ["De 4 a 12 años", "Talleres de 2–3 horas", "Coronado y Panamá Oeste"],
    note: "Estamos preparando la primera serie de talleres. Aún sin fechas ni sede: las Familias Fundadoras se enteran primero.",
    sketchNotes: ["¿más peso?", "¿más inclinado?", "¡otra vez!"],
    imageAlt:
      "Un niño probando un carrito de madera hecho por él en una rampa, con notas a mano sobre peso e inclinación.",
  },

  problem: {
    eyebrow: "¿Por qué ahora?",
    headline: "El mundo está cambiando. La infancia no debería volverse más pasiva.",
    lead: "La IA puede darles respuestas a nuestros hijos en segundos.",
    body: "Pero algunas de las habilidades que más van a necesitar no se pueden descargar:",
    abilities: [
      "pensar por sí mismos",
      "tomar buenas decisiones",
      "resolver problemas nuevos",
      "intentar algo que podría fallar",
      "cambiar de opinión cuando cambian las pruebas",
      "convertir una idea en algo real",
    ],
    close: "Think Try Do les da a los niños más oportunidades de practicar esas habilidades donde más importan:",
    closeEmphasis: "en el mundo real.",
    sideNote: "Las respuestas son cada vez más fáciles de encontrar. Saber qué preguntar, qué creer y qué probar después importa más que nunca.",
  },

  how: {
    eyebrow: "Cómo funciona",
    headline: "Cada aventura funciona con tres palabras.",
    steps: [
      {
        word: "THINK",
        sub: "Piensa qué podría funcionar",
        lines: ["Hay un problema que resolver.", "Observa con atención.", "Haz preguntas.", "Se te ocurre una idea."],
      },
      {
        word: "TRY",
        sub: "Pruébalo y mira qué pasa",
        lines: ["Constrúyelo.", "Pruébalo.", "Mira qué pasa.", "Quizás no funciona.", "Eso también es parte de la aventura."],
      },
      {
        word: "DO",
        sub: "Hazlo realidad",
        lines: ["Cámbialo.", "Inténtalo otra vez.", "Haz que suceda."],
      },
    ],
    quote: "“¡Lo descubrí yo solo!”",
    quoteNote: "La frase que buscamos en cada taller.",
  },

  adventures: {
    eyebrow: "Aventuras destacadas",
    headline: "Este es el reto. ¿Qué vas a intentar?",
    body: "Una muestra de los talleres que estamos preparando. Cada uno tiene un problema real, materiales reales y más de una forma de lograrlo.",
    skillsLabel: "Habilidades en juego",
    voteLabel: "¡Esta me interesa!",
    votedLabel: "Añadida a tu lista",
    items: {
      racer: {
        family: "Little Builders",
        title: "Construye tu propio carrito de madera",
        tagline: "Sierra. Lija. Construye. Prueba.",
        body: "Luego lánzalo por la rampa de Think Try Do y descubre cómo pequeños cambios — ruedas, peso, equilibrio — cambian el resultado. No se trata de copiar un carro. ¿Puedes hacer que el tuyo funcione mejor?",
        skills: ["Resolución de problemas", "Confianza práctica", "Experimentación", "Perseverancia"],
        imageAlt: "Un carrito de madera hecho a mano bajando por una rampa.",
      },
      rescue: {
        family: "Reto Think Try Do",
        title: "El Gran Rescate",
        tagline: "Algo se ha quedado atrapado.",
        body: "Un juguete está varado en una isla. Tu equipo tiene materiales limitados y una regla: nadie pisa la isla. ¿Puedes inventar una forma de traerlo de vuelta?",
        skills: ["Pensamiento crítico", "Creatividad", "Colaboración", "Adaptabilidad"],
        imageAlt: "Un juguete varado en una pequeña isla mientras se construye una línea de rescate con cuerda.",
      },
      bridge: {
        family: "Reto Think Try Do",
        title: "El Reto del Puente",
        tagline: "¿Lo bastante fuerte para la carga?",
        body: "Diséñalo. Constrúyelo. Rómpelo. Mejóralo. Usa solo los materiales de la mesa para cruzar el hueco — y luego ve añadiendo peso para descubrirlo.",
        skills: ["Pensamiento de ingeniería", "Experimentación", "Perseverancia", "Resolución de problemas"],
        imageAlt: "Un puente de cartón y palitos sosteniendo una pila de pesas.",
      },
      mystery: {
        family: "Reto Think Try Do",
        title: "Misión Misterio",
        tagline: "Algo no cuadra.",
        body: "Sigue las pistas. Cuestiona las pruebas. Detecta lo que falta. Descubre qué pasó en realidad — y prepárate para explicar cómo lo sabes.",
        skills: ["Razonamiento", "Criterio", "Verificar pruebas", "Toma de decisiones"],
        imageAlt: "Una lupa sobre un conjunto de pistas y huellas.",
      },
    },
    moreTitle: "También en la mesa de diseño",
    more: ["Catapultas", "Circuitos de canicas", "Rescate de carga", "Muévelo (sin tocarlo)", "Supervivencia en expedición", "Barcos", "Casitas para pájaros", "Maceteros"],
    voteCta: "¿Qué aventura deberíamos lanzar primero?",
    voteCtaButton: "Cuéntanos",
  },

  different: {
    eyebrow: "Qué nos hace diferentes",
    headline: "No les damos todas las respuestas.",
    notLabel: "No",
    not: ["Mirar", "Copiar", "Seguir instrucciones", "Dar la respuesta “correcta”"],
    insteadLabel: "Sino",
    instead: ["Preguntar", "Construir", "Probar", "Decidir", "Adaptarse", "Intentarlo otra vez"],
    body: "Nuestros facilitadores plantean el reto, ponen las herramientas y cuidan la seguridad de los niños.",
    bodyEmphasis: "Pero siempre que se pueda, el pensar le toca al niño.",
    exampleWeakLabel: "Copia esto",
    exampleWeak: "“Copia exactamente este carro de madera.”",
    exampleStrongLabel: "Intenta esto",
    exampleStrong: "“Construye un vehículo que lleve esta carga rampa abajo sin perderla.”",
  },

  tools: {
    eyebrow: "Herramientas reales. Materiales reales. Experiencias reales.",
    headline: "Los niños son capaces de más de lo que a veces creemos.",
    body: "Algunos talleres usan herramientas y materiales reales, adecuados para cada edad. Creamos espacios donde los niños pueden probar cosas reales de forma segura — y descubrir qué pasa.",
    materials: ["Madera", "Herramientas manuales", "Tornillos y clavos", "Cartón", "Cuerda", "Ruedas", "Mecanismos sencillos", "Materiales reciclados", "Materiales naturales"],
    safetyTitle: "Cómo cuidamos la seguridad",
    safety: [
      { title: "Adaptado a la edad", body: "Actividades, herramientas y dificultad ajustadas a cada grupo de edad." },
      { title: "Supervisado", body: "Todo uso de herramientas está supervisado por nuestros facilitadores." },
      { title: "Guiado", body: "Los niños reciben indicaciones claras de seguridad antes de empezar — y luego espacio para descubrir." },
    ],
    footnote: "Cada taller indicará claramente qué herramientas y materiales se usan.",
  },

  skills: {
    eyebrow: "Por qué Think Try Do",
    headline: "Lo que realmente están practicando.",
    chips: [
      "Pensamiento crítico",
      "Criterio",
      "Resolución de problemas",
      "Toma de decisiones",
      "Creatividad",
      "Adaptabilidad",
      "Confianza práctica",
      "Perseverancia",
      "Colaboración",
      "Curiosidad",
    ],
    line1: "No se enseñan como lecciones.",
    line2: "Se practican a través de la aventura.",
  },

  ages: {
    eyebrow: "De 4 a 12 años",
    headline: "Agrupados por edad. Al nivel justo.",
    body: "Las herramientas, los retos, la supervisión y la dificultad cambian con cada grupo. Cada taller indicará exactamente para qué edades es.",
    groups: [
      {
        range: "4–6",
        name: "Pequeños Exploradores",
        points: ["Retos más cortos", "Más exploración sensorial", "Construcción sencilla", "Descubrimiento guiado"],
      },
      {
        range: "6–8",
        name: "Jóvenes Constructores",
        points: ["Más autonomía al construir", "Decisiones de diseño", "Probar y mejorar", "Misiones para resolver problemas"],
      },
      {
        range: "8–12",
        name: "Jóvenes Inventores",
        points: ["Herramientas más complejas", "Retos de ingeniería", "Estrategia", "Misiones en equipo", "Mayor independencia"],
      },
    ],
    yearsLabel: "años",
  },

  founding: {
    eyebrow: "Familias Fundadoras de Coronado",
    headline: "Ayúdanos a lanzar Think Try Do en Coronado.",
    body: "Estamos preparando nuestra primera serie de talleres para familias de Coronado y comunidades cercanas de Panamá Oeste. Antes de definir la sede y el horario, queremos que las familias de la zona nos ayuden a decidir por dónde empezar.",
    tellUsTitle: "Únete a la lista y cuéntanos:",
    tellUs: ["las edades de tus hijos", "qué aventuras les encantarían", "cuándo podrían venir", "en qué zona viven"],
    perksTitle: "Las Familias Fundadoras:",
    perks: [
      "se enteran de los primeros talleres antes del lanzamiento público",
      "ayudan a decidir qué talleres se lanzan primero",
      "votan por los días y horarios preferidos",
      "tienen acceso anticipado a los cupos limitados",
    ],
    honesty: "Es una muestra de interés, no una reserva. Sin pago y sin compromiso.",
  },

  form: {
    title: "Lista de Familias Fundadoras",
    stepLabel: "Paso {current} de {total}",
    steps: ["Tus hijos", "Aventuras", "Tú"],
    next: "Siguiente",
    back: "Atrás",
    submit: "Unirme a la lista",
    submitting: "Enviando…",
    optional: "opcional",

    childrenLegend: "¿Qué edad tienen tus hijos?",
    childrenHint: "Añade a cada niño: nos ayuda a planificar los grupos.",
    childLabel: "Niño/a {n}",
    addChild: "Añadir otro niño/a",
    removeChild: "Quitar niño/a {n}",
    ageUnder4: "Menos de 4",
    age13plus: "13+",

    locationLabel: "¿Dónde viven?",
    locationPlaceholder: "Elige una zona",
    locationOtherLabel: "¿Qué zona?",

    interestsLegend: "¿Qué aventuras les encantarían?",
    interestsHint: "Elige todas las que quieras.",
    interestOtherLabel: "Cuéntanos más",
    durationLegend: "¿Qué duración de taller prefieres?",
    daysLegend: "¿Cuándo podrían venir?",
    daysHint: "Elige todas las opciones que te sirvan.",
    languageLegend: "Idioma preferido del taller",

    nameLabel: "Tu nombre",
    emailLabel: "Correo electrónico",
    whatsappLabel: "Número de WhatsApp",
    whatsappHint: "Opcional, pero es la forma más rápida de avisarte de las primeras fechas.",
    whatsappPlaceholder: "+507 6000 0000",
    loveLabel: "¿Qué tipo de actividad le ENCANTARÍA probar a tu hijo/a?",
    lovePlaceholder: "¿Cohetes? ¿Casas en el árbol? ¿Un caso de detectives de verdad? Cuéntanos lo que sea.",
    consentLabel:
      "Sí, quiero recibir novedades del lanzamiento de Think Try Do. Puedo darme de baja cuando quiera.",
    privacyNote: "Solo usaremos tus datos para planificar y anunciar los talleres de Think Try Do. Nunca los vendemos ni compartimos.",

    options: {
      interests: {
        woodworking: "Carpintería y construcción",
        maker_challenges: "Retos maker",
        problem_solving: "Aventuras para resolver problemas",
        outdoor: "Retos al aire libre",
        creative_engineering: "Ingeniería creativa",
        mystery: "Misterios / Retos de detectives",
        other: "Otro",
      },
      durations: {
        "2h": "2 horas",
        "2.5h": "2,5 horas",
        "3h": "3 horas",
        no_preference: "Me da igual",
      },
      days: {
        weekday_mornings: "Mañanas entre semana",
        weekday_afternoons: "Tardes entre semana",
        saturday: "Sábado",
        sunday: "Domingo",
        school_holidays: "Vacaciones escolares",
      },
      languages: {
        en: "Inglés",
        es: "Español",
        either: "Cualquiera",
      },
      locations: {
        coronado: "Coronado",
        nueva_gorgona: "Nueva Gorgona",
        chame: "Chame",
        san_carlos: "San Carlos",
        other: "Otra",
      },
    },

    errors: {
      children: "Añade la edad de al menos un niño/a.",
      location: "Elige la zona donde vives.",
      locationOther: "Dinos qué zona.",
      interests: "Elige al menos un tipo de aventura.",
      duration: "Elige una duración.",
      days: "Elige al menos un día u horario.",
      language: "Elige un idioma.",
      name: "Dinos tu nombre.",
      email: "Escribe un correo electrónico válido.",
      whatsapp: "Ese número no parece correcto: revísalo o déjalo en blanco.",
      consent: "Marca la casilla para que podamos contactarte.",
      generic: "Algo salió mal al enviar tus datos. Inténtalo de nuevo en un momento.",
      network: "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo otra vez.",
      summary: "Revisa los campos marcados.",
    },

    success: {
      title: "¡Ya estás dentro!",
      body: "Te avisaremos cuando las primeras aventuras en Coronado estén listas.",
      note: "Estás en la lista de Familias Fundadoras — todavía no es una reserva. Te escribiremos antes de abrir los cupos para que elijas tu taller.",
      share: "¿Conoces a otro niño curioso? Comparte Think Try Do",
      shareText: "Talleres de aventura del mundo real para niños de 4 a 12 años, muy pronto en Coronado. Únete a las Familias Fundadoras:",
      copied: "¡Enlace copiado!",
    },
  },

  sketches: {
    racer: ["¿ruedas más juntas? ↔"],
    rescue: ["¿cuerda? ¿gancho? ¿balsa?", "¡prohibido pisar la isla!"],
    bridge: ["¿aguantará?", "¿triángulos = más fuerte?"],
    mystery: ["pista #3", "¿quién? ¿cuándo? ¿cómo?"],
    tools: ["cosas de verdad"],
  },

  faq: {
    eyebrow: "Preguntas",
    headline: "Buenas preguntas. Respuestas honestas.",
    items: [
      {
        q: "¿Dónde serán los talleres?",
        a: "Estamos buscando sedes adecuadas en la zona de Coronado. Las Familias Fundadoras serán las primeras en saberlo cuando confirmemos la primera ubicación.",
      },
      {
        q: "¿Cuándo empiezan los talleres?",
        a: "Estamos planificando los primeros talleres de prueba. Únete a la lista de Familias Fundadoras para conocer las fechas antes que nadie.",
      },
      {
        q: "¿Cuánto duran los talleres?",
        a: "La mayoría durará aproximadamente entre 2 y 3 horas, según la edad y la actividad.",
      },
      {
        q: "¿Para qué edades son?",
        a: "Think Try Do está pensado para niños de aproximadamente 4 a 12 años, con talleres agrupados por edad y nivel de reto.",
      },
      {
        q: "¿Los padres se quedan?",
        a: "Puede variar según la edad y el formato del taller. Daremos todos los detalles cuando publiquemos cada taller.",
      },
      {
        q: "¿Los niños usarán herramientas?",
        a: "Algunos talleres incluirán el uso supervisado de herramientas reales adecuadas para su edad. Cada taller explicará claramente las actividades.",
      },
      {
        q: "¿Es una escuela o un programa de tutorías?",
        a: "No. Think Try Do trata de aprender a través del juego y la aventura en el mundo real: construir, experimentar y resolver problemas. Sin fichas y sin pantallas.",
      },
      {
        q: "¿El programa está disponible en español?",
        a: "Queremos atender tanto a familias que hablan inglés como español. Indícanos tu idioma preferido al unirte a la lista.",
      },
      {
        q: "¿Unirme a la lista me compromete a algo?",
        a: "No. Es una muestra de interés gratuita. Te enterarás de los primeros talleres antes que nadie y decidirás entonces.",
      },
    ],
  },

  final: {
    headline: "¿Qué podría descubrir tu hijo si dejaras de darle la respuesta?",
    facts: ["Coronado, Panamá", "De 4 a 12 años", "Primeras aventuras muy pronto"],
  },

  footer: {
    tagline: "Los niños aprenden a pensar haciendo cosas que vale la pena pensar.",
    region: "Coronado · Panamá Oeste",
    rights: "Todos los derechos reservados.",
    contact: "Contacto",
  },
};
