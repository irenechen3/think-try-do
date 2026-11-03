/**
 * English copy — the source of truth for every string on the site.
 * Spanish (es.ts) must match this shape exactly; TypeScript enforces it.
 *
 * Brand words THINK / TRY / GO stay in English in every language.
 */

export const en = {
  meta: {
    title: "Think Try Go | Real-World Adventures for Curious Kids",
    description:
      "Hands-on building, problem solving and adventure workshops for kids aged 4–12. Coming soon to Coronado, Panama.",
  },

  nav: {
    skip: "Skip to content",
    adventures: "Adventures",
    how: "How it works",
    ages: "Ages",
    faq: "FAQ",
    join: "Join the list",
    menu: "Menu",
    close: "Close menu",
    languageLabel: "Language",
  },

  cta: {
    primary: "Join the Founding Families list",
    secondary: "Explore the adventures",
    sticky: "Join the list",
  },

  hero: {
    eyebrow: "Coming to Coronado, Panama",
    headline: "Real-world adventures for curious kids.",
    body: "Hands-on workshops where kids build, experiment, solve problems and discover what they can do when nobody gives them the answer.",
    facts: ["Ages 4–12", "2–3 hour workshops", "Coronado & Panamá Oeste"],
    note: "First workshop series in planning. No dates or venue yet — Founding Families hear first.",
    sketchNotes: ["more weight?", "steeper?", "try again!"],
    imageAlt:
      "A child testing a home-made wooden racer on a ramp, with sketch notes about weight and angle.",
  },

  problem: {
    eyebrow: "Why now",
    headline: "The world is changing. Childhood shouldn't become more passive.",
    lead: "AI can give our kids answers in seconds.",
    body: "But some of the abilities they'll need most can't simply be downloaded:",
    abilities: [
      "thinking for themselves",
      "making good decisions",
      "solving unfamiliar problems",
      "trying something that might fail",
      "changing their mind when the evidence changes",
      "turning an idea into something real",
    ],
    close: "Think Try Go gives children more chances to practise those skills where they matter most:",
    closeEmphasis: "in the real world.",
    sideNote: "Answers are getting easier to find. Knowing what to ask, what to believe and what to try next matters more than ever.",
  },

  how: {
    eyebrow: "How it works",
    headline: "Every adventure runs on three words.",
    steps: [
      {
        word: "THINK",
        sub: "Work out what might work",
        lines: ["There's a problem to solve.", "Look closely.", "Ask questions.", "Come up with an idea."],
      },
      {
        word: "TRY",
        sub: "Test it and see",
        lines: ["Build it.", "Test it.", "See what happens.", "Maybe it doesn't work.", "That's part of the adventure."],
      },
      {
        word: "GO",
        sub: "Make it happen",
        lines: ["Change it.", "Try again.", "Make something happen."],
      },
    ],
    quote: "“I figured that out.”",
    quoteNote: "The sentence we're aiming for, every single workshop.",
  },

  adventures: {
    eyebrow: "Featured adventures",
    headline: "Here's the challenge. What are you going to try?",
    body: "A taste of the workshops we're preparing. Every one has a real problem, real materials, and more than one way to win.",
    skillsLabel: "Skills in play",
    voteLabel: "I'd want this",
    votedLabel: "Added to your wishlist",
    items: {
      racer: {
        family: "Little Builders",
        title: "Build your own wooden racer",
        tagline: "Saw. Sand. Build. Test.",
        body: "Then race your creation down the Think Try Go ramp and discover how small design changes — wheels, weight, balance — change the result. Not an identical car. Can you make yours work better?",
        skills: ["Problem solving", "Practical confidence", "Experimentation", "Persistence"],
        imageAlt: "A hand-built wooden racer rolling down a ramp.",
      },
      rescue: {
        family: "Think Try Go Challenge",
        title: "The Great Rescue",
        tagline: "Something has been stranded.",
        body: "A toy is stuck on an island. Your team has limited materials and one rule: nobody steps on the island. Can you invent a way to bring it home?",
        skills: ["Critical thinking", "Creativity", "Collaboration", "Adaptability"],
        imageAlt: "A toy stranded on a small island with a rope rescue line being built.",
      },
      bridge: {
        family: "Think Try Go Challenge",
        title: "The Bridge Challenge",
        tagline: "Strong enough to carry the load?",
        body: "Design it. Build it. Break it. Improve it. Use only the materials on the table to span the gap — then pile on the weight and find out.",
        skills: ["Engineering thinking", "Experimentation", "Persistence", "Problem solving"],
        imageAlt: "A cardboard and stick bridge holding a stack of weights.",
      },
      mystery: {
        family: "Think Try Go Challenge",
        title: "Mystery Mission",
        tagline: "Something doesn't add up.",
        body: "Follow the clues. Question the evidence. Spot what's missing. Work out what actually happened — and be ready to explain how you know.",
        skills: ["Reasoning", "Judgment", "Evidence checking", "Decision making"],
        imageAlt: "A magnifying glass over a set of clues and footprints.",
      },
    },
    moreTitle: "Also on the drawing board",
    more: ["Catapults", "Marble runs", "Cargo drop", "Move it (without touching it)", "Expedition survival", "Boats", "Bird houses", "Planter boxes"],
    voteCta: "Which adventure should we launch first?",
    voteCtaButton: "Tell us",
  },

  different: {
    eyebrow: "What makes this different",
    headline: "We don't give kids all the answers.",
    notLabel: "Not",
    not: ["Watch", "Copy", "Follow instructions", "Get the “right” answer"],
    insteadLabel: "Instead",
    instead: ["Question", "Build", "Test", "Decide", "Adapt", "Try again"],
    body: "Our facilitators set the challenge, provide the tools and keep children safe.",
    bodyEmphasis: "But whenever possible, the thinking belongs to the child.",
    exampleWeakLabel: "Copy this",
    exampleWeak: "“Copy this exact wooden car.”",
    exampleStrongLabel: "Try this",
    exampleStrong: "“Build a vehicle that can carry this cargo down the ramp without losing it.”",
  },

  tools: {
    eyebrow: "Real tools. Real materials. Real experiences.",
    headline: "Children are capable of more than we sometimes give them credit for.",
    body: "Selected workshops use real, age-appropriate tools and building materials. We create environments where kids can safely try real things — and find out what happens.",
    materials: ["Wood", "Hand tools", "Fasteners", "Cardboard", "Rope", "Wheels", "Simple mechanisms", "Recycled materials", "Natural materials"],
    safetyTitle: "How we keep it safe",
    safety: [
      { title: "Age-adjusted", body: "Activities, tools and difficulty are matched to each age group." },
      { title: "Supervised", body: "Any tool use is supervised by our facilitators." },
      { title: "Guided", body: "Kids get clear safety guidance before they start — then room to figure things out." },
    ],
    footnote: "Each workshop listing will spell out exactly which tools and materials are involved.",
  },

  skills: {
    eyebrow: "Why Think Try Go",
    headline: "What they're really practising.",
    chips: [
      "Critical thinking",
      "Judgment",
      "Problem solving",
      "Decision making",
      "Creativity",
      "Adaptability",
      "Practical confidence",
      "Persistence",
      "Collaboration",
      "Curiosity",
    ],
    line1: "These aren't taught as lessons.",
    line2: "They're practised through adventure.",
  },

  ages: {
    eyebrow: "Ages 4–12",
    headline: "Grouped by age. Pitched just right.",
    body: "Tools, challenges, supervision and difficulty change with each age group. Every workshop listing will say exactly which ages it's for.",
    groups: [
      {
        range: "4–6",
        name: "Little Explorers",
        points: ["Shorter challenges", "More sensory exploration", "Simple building", "Guided discovery"],
      },
      {
        range: "6–8",
        name: "Junior Makers",
        points: ["More independent making", "Design choices", "Testing and improving", "Problem-solving missions"],
      },
      {
        range: "8–12",
        name: "Young Inventors",
        points: ["More complex tools", "Engineering challenges", "Strategy", "Team missions", "Greater independence"],
      },
    ],
    yearsLabel: "years",
  },

  founding: {
    eyebrow: "Coronado Founding Families",
    headline: "Help us launch Think Try Go in Coronado.",
    body: "We're preparing our first workshop series for families in Coronado and the surrounding Panamá Oeste communities. Before we lock in the venue and timetable, we want local families to help decide what comes first.",
    tellUsTitle: "Join the list and tell us:",
    tellUs: ["your children's ages", "which adventures they'd love", "when you'd come", "where you're based"],
    perksTitle: "Founding Families will:",
    perks: [
      "hear about the first workshops before public release",
      "help shape which workshops launch first",
      "vote on preferred days and times",
      "get early access to limited workshop places",
    ],
    honesty: "This is an expression of interest, not a booking. No payment, no commitment.",
  },

  form: {
    title: "Founding Families list",
    stepLabel: "Step {current} of {total}",
    steps: ["Your kids", "Adventures", "You"],
    next: "Next",
    back: "Back",
    submit: "Join the list",
    submitting: "Sending…",
    optional: "optional",

    childrenLegend: "How old are your children?",
    childrenHint: "Add each child — it helps us plan age groups.",
    childLabel: "Child {n}",
    addChild: "Add another child",
    removeChild: "Remove child {n}",
    ageUnder4: "Under 4",
    age13plus: "13+",

    locationLabel: "Where are you based?",
    locationPlaceholder: "Choose an area",
    locationOtherLabel: "Which area?",

    interestsLegend: "Which adventures would they love?",
    interestsHint: "Pick as many as you like.",
    interestOtherLabel: "Tell us more",
    durationLegend: "Which workshop length would you prefer?",
    daysLegend: "When would you come?",
    daysHint: "Pick all that could work.",
    languageLegend: "Preferred workshop language",

    nameLabel: "Your first name",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp number",
    whatsappHint: "Optional, but it's the quickest way for us to share first dates.",
    whatsappPlaceholder: "+507 6000 0000",
    loveLabel: "What kind of activity would your child LOVE to try?",
    lovePlaceholder: "Rockets? Treehouses? A real detective case? Tell us anything.",
    consentLabel:
      "Yes, contact me about Think Try Go launch news. I can unsubscribe any time.",
    privacyNote: "We'll only use your details to plan and announce Think Try Go workshops. We never sell or share them.",

    options: {
      interests: {
        woodworking: "Woodworking & Building",
        maker_challenges: "Maker Challenges",
        problem_solving: "Problem-Solving Adventures",
        outdoor: "Outdoor Challenges",
        creative_engineering: "Creative Engineering",
        mystery: "Mystery / Detective Challenges",
        other: "Other",
      },
      durations: {
        "2h": "2 hours",
        "2.5h": "2.5 hours",
        "3h": "3 hours",
        no_preference: "No preference",
      },
      days: {
        weekday_mornings: "Weekday mornings",
        weekday_afternoons: "Weekday afternoons",
        saturday: "Saturday",
        sunday: "Sunday",
        school_holidays: "School holidays",
      },
      languages: {
        en: "English",
        es: "Spanish",
        either: "Either",
      },
      locations: {
        coronado: "Coronado",
        nueva_gorgona: "Nueva Gorgona",
        chame: "Chame",
        san_carlos: "San Carlos",
        other: "Other",
      },
    },

    errors: {
      children: "Add at least one child's age.",
      location: "Choose the area you're based in.",
      locationOther: "Tell us which area.",
      interests: "Pick at least one adventure type.",
      duration: "Choose a workshop length.",
      days: "Pick at least one day or time.",
      language: "Choose a language.",
      name: "Tell us your first name.",
      email: "Enter a valid email address.",
      whatsapp: "That number doesn't look right — check it or leave it blank.",
      consent: "Please tick the box so we can contact you.",
      generic: "Something went wrong sending your details. Please try again in a moment.",
      network: "We couldn't reach the server. Check your connection and try again.",
      summary: "Please fix the highlighted fields.",
    },

    success: {
      title: "You're in!",
      body: "We'll let you know when the first Coronado adventures are ready.",
      note: "You're on the Founding Families list — this isn't a booking yet. We'll be in touch before places open so you can choose your workshop.",
      share: "Know another curious kid? Share Think Try Go",
      shareText: "Real-world adventure workshops for kids 4–12, coming to Coronado. Join the Founding Families list:",
      copied: "Link copied!",
    },
  },

  sketches: {
    racer: ["wheels closer? ↔"],
    rescue: ["rope? hook? raft?", "no stepping on the island!"],
    bridge: ["will it hold?", "triangles = strong?"],
    mystery: ["clue #3", "who? when? how?"],
    tools: ["real stuff"],
  },

  faq: {
    eyebrow: "Questions",
    headline: "Good questions. Honest answers.",
    items: [
      {
        q: "Where will the workshops be held?",
        a: "We're currently exploring suitable venues in the Coronado area. Founding Families will be the first to hear once our first location is confirmed.",
      },
      {
        q: "When do workshops start?",
        a: "We're planning our first trial workshops now. Join the Founding Families list to hear launch dates first.",
      },
      {
        q: "How long are workshops?",
        a: "Most experiences will run approximately 2–3 hours, depending on age and activity.",
      },
      {
        q: "What ages are workshops for?",
        a: "Think Try Go is designed for children aged roughly 4–12, with workshops grouped by suitable age and challenge level.",
      },
      {
        q: "Do parents stay?",
        a: "Parent attendance requirements may vary by age and workshop format. Full details will be provided when individual workshops are released.",
      },
      {
        q: "Will children use tools?",
        a: "Some workshops will include supervised use of age-appropriate real tools. Each workshop listing will clearly explain the activities involved.",
      },
      {
        q: "Is this a school or tutoring program?",
        a: "No. Think Try Go is about learning through real-world adventure play — making, experimenting and solving problems. No worksheets, no screens.",
      },
      {
        q: "Is the program available in Spanish?",
        a: "We plan to support both English- and Spanish-speaking families. Let us know your preferred language when you join the list.",
      },
      {
        q: "Does joining the list commit me to anything?",
        a: "No. It's a free expression of interest. You'll hear about the first workshops early and can decide then.",
      },
    ],
  },

  final: {
    headline: "What could your child figure out if you stopped giving them the answer?",
    facts: ["Coronado, Panama", "Ages 4–12", "First adventures coming soon"],
  },

  footer: {
    tagline: "Kids learn to think by doing things worth thinking about.",
    region: "Coronado · Panamá Oeste",
    rights: "All rights reserved.",
    contact: "Contact",
  },
};

export type Dictionary = typeof en;
