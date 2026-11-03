/**
 * Image slots + art direction.
 *
 * Every slot currently renders a hand-drawn sketch illustration. To use a real
 * photo, drop it in /public/images and set `src` (e.g. "/images/hero.jpg").
 * The `prompt` is the brief for a photographer or an image-generation tool.
 *
 * Shared direction for ALL imagery:
 *   Natural light, real materials, slightly messy, documentary feel. Diverse
 *   kids (mixed Panamanian, Latin American and international families) in
 *   everyday clothes with sawdust, tape and dirt on their hands. Real
 *   concentration and real celebration — no posed stock smiles, no tablets,
 *   no classrooms, no desks in rows, no lab coats.
 */

export type ImageSlot = { src: string | null; prompt: string };

export const IMAGERY = {
  hero: {
    src: null,
    prompt:
      "Documentary photo, golden late-afternoon light on a covered outdoor terrace near the Pacific coast of Panama. A 7-year-old girl kneels beside a plywood ramp, releasing a hand-built wooden racer with mismatched wheels; two other kids (around 6 and 9) crouch close, one pointing, one holding a tape measure. Sawdust, offcuts, clamps and a small hand saw on the ground. Shallow depth of field, focus on hands and the car. Warm, natural, unposed. No screens.",
  },
  racer: {
    src: null,
    prompt:
      "Close-up of a child's hands sanding a rough pine block shaped into a racing car, pencil marks and wonky axle holes visible, a few wooden wheels and nails on a workbench, warm side light, shallow depth of field.",
  },
  rescue: {
    src: null,
    prompt:
      "Three kids aged 8–10 outdoors on grass, building a rope-and-stick contraption to retrieve a small toy sitting on a chalk-drawn 'island'; one lies on their stomach reaching with a hooked stick, others hold the rope taut; laughing, concentrating, slightly muddy knees.",
  },
  bridge: {
    src: null,
    prompt:
      "A cardboard, string and craft-stick bridge spanning a gap between two stacks of books, sagging under a pile of metal washers; a 9-year-old boy watching intently, hands hovering, ready to catch; another kid in the background cheering. Natural light, real mess.",
  },
  mystery: {
    src: null,
    prompt:
      "Top-down photo of a wooden table with clue cards, a magnifying glass, a muddy footprint on paper, string connecting notes, and two kids' hands pointing at different clues mid-argument. Warm, tactile, no screens.",
  },
  tools: {
    src: null,
    prompt:
      "Flat-lay on raw plywood: kid-sized hand saw, clamps, a hammer, sandpaper, wooden wheels, screws in a jar, rope, cardboard tubes, a pencil and a tape measure — arranged slightly imperfectly, sawdust visible. Overhead natural light.",
  },
  og: {
    src: null,
    prompt:
      "Social share image 1200×630: warm sand background, bold stacked wordmark THINK / TRY / GO in near-black with an orange hand-drawn arrow connecting them; right side a photo of a child's dusty hands holding a hand-built wooden racer. Caption: Real-world adventures for curious kids · Coronado, Panama · Ages 4–12.",
  },
} satisfies Record<string, ImageSlot>;
