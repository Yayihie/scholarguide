// shared/quickCheckPassages.ts — Static, curated reading passages for the Quick Check tool.
// Static deliberately — an unauthenticated route calling Gemini would be an open cost/abuse surface.
// Each passage has a known word count for WPM calculation.

export interface QuickCheckPassage {
  id: string;
  grade: number;
  title: string;
  text: string;
  wordCount: number;
}

export const QUICK_CHECK_PASSAGES: QuickCheckPassage[] = [
  {
    id: "g1-sun",
    grade: 1,
    title: "The Sun",
    text: "The sun is up. It is hot. The sun is yellow. I like the sun. I play in the sun.",
    wordCount: 20,
  },
  {
    id: "g2-cat",
    grade: 2,
    title: "My Cat",
    text: "I have a cat. Her name is Bell. She is brown and white. She likes to sit on my lap. She purrs when I pet her. I love my cat.",
    wordCount: 30,
  },
  {
    id: "g3-rain",
    grade: 3,
    title: "The Rainstorm",
    text: "The sky grew dark as the clouds rolled in. The wind began to blow, and the trees swayed side to side. Then the rain came. It pattered on the roof like tiny fingers drumming on a drum. I watched from the window and waited for the storm to pass.",
    wordCount: 49,
  },
  {
    id: "g4-garden",
    grade: 4,
    title: "The Garden",
    text: "Every spring, my grandmother plants a garden behind her house. She grows tomatoes, peppers, and green beans. She says the secret is patience. You have to water the plants every day, pull the weeds before they grow too tall, and wait for the sun to do its work. By July, we pick baskets of vegetables and she makes soup.",
    wordCount: 59,
  },
  {
    id: "g5-migration",
    grade: 5,
    title: "The Great Migration",
    text: "Every year, monarch butterflies travel thousands of miles from Canada to Mexico. No single butterfly makes the whole trip. Instead, it takes four generations to complete the journey. The butterflies that arrive in Mexico have never been there before, yet they find the same forests their great-grandparents used. Scientists are still studying how they do it.",
    wordCount: 56,
  },
  {
    id: "g6-ocean",
    grade: 6,
    title: "The Deepest Place",
    text: "The Mariana Trench is the deepest point in any ocean on Earth. It reaches down almost seven miles below the surface, where the pressure is more than a thousand times greater than at sea level. Few people have ever been there. In 1960, two explorers descended in a steel sphere and spent only twenty minutes at the bottom. They reported seeing a flatfish swim past, proving that life survives even in the most extreme conditions.",
    wordCount: 75,
  },
  {
    id: "g7-silkroad",
    grade: 7,
    title: "The Silk Road",
    text: "For over a thousand years, merchants carried goods across the Silk Road, a network of trade routes connecting China to the Mediterranean. They transported silk, spices, and precious metals across mountains and deserts. But they also carried ideas: Buddhism spread from India to China along these same routes, and papermaking traveled west from China to the Islamic world. The Silk Road was not a single road, but a web of paths that shaped the modern world.",
    wordCount: 76,
  },
  {
    id: "g8-genetics",
    grade: 8,
    title: "The Code of Life",
    text: "Every cell in your body contains a complete copy of your DNA, the molecule that stores the instructions for building you. DNA is arranged in structures called chromosomes, and sections of those chromosomes are called genes. Each gene carries the code for a specific protein, and those proteins build everything: your eye color, your blood type, the enzymes that digest your food. The Human Genome Project spent thirteen years mapping all twenty-three pairs of human chromosomes, and the map is still being refined today.",
    wordCount: 84,
  },
];
