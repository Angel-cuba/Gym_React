const U = "https://images.unsplash.com/photo";

/**
 * Curated Unsplash photos per body part — used when API GIFs fail to load.
 * Multiple per category so we can pick deterministically via exercise ID.
 */
export const bodyPartImages: Record<string, string[]> = {
  back: [
    `${U}-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1532029837-7654a04d6eba?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  cardio: [
    `${U}-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  chest: [
    `${U}-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  "lower arms": [
    `${U}-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1590507621108-433608c97823?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  "lower legs": [
    `${U}-1434682772312-f1f699ca1236?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  neck: [
    `${U}-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  shoulders: [
    `${U}-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  "upper arms": [
    `${U}-1590507621108-433608c97823?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  "upper legs": [
    `${U}-1534258936331-e3e64e6c5aae?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  waist: [
    `${U}-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1541534741688-7db9eb5a2e9b?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
  all: [
    `${U}-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&h=450&q=80`,
    `${U}-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&h=450&q=80`,
  ],
};

/** Background image for the body-part category card (wider crop). */
export const bodyPartCardImages: Record<string, string> = {
  all: `${U}-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&h=320&q=80`,
  back: `${U}-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=320&q=80`,
  cardio: `${U}-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&h=320&q=80`,
  chest: `${U}-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&h=320&q=80`,
  "lower arms": `${U}-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&h=320&q=80`,
  "lower legs": `${U}-1434682772312-f1f699ca1236?auto=format&fit=crop&w=400&h=320&q=80`,
  neck: `${U}-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&h=320&q=80`,
  shoulders: `${U}-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&h=320&q=80`,
  "upper arms": `${U}-1590507621108-433608c97823?auto=format&fit=crop&w=400&h=320&q=80`,
  "upper legs": `${U}-1534258936331-e3e64e6c5aae?auto=format&fit=crop&w=400&h=320&q=80`,
  waist: `${U}-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&h=320&q=80`,
};

/** Returns a deterministic fallback image for an exercise. */
export function getExerciseFallbackImage(bodyPart: string, exerciseId: string): string {
  const images = bodyPartImages[bodyPart.toLowerCase()] ?? bodyPartImages.all;
  const seed = exerciseId ? exerciseId.charCodeAt(exerciseId.length - 1) : 0;
  return images[seed % images.length];
}
