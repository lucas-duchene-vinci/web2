interface Films {
  id: number;
  title: string;
  director: string;
  duration: number;

  //optional informations
  budget ?: number;
  description ?: string;
  imageUrl ?: string;
}

type NewFilms = Omit<Films, "id">;

export enum Level {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

interface Text {
  id: string;
  content: string;
  level: Level
};

type NewText = Omit<Text, "id">;

export type { Films, NewFilms, Text, NewText };
