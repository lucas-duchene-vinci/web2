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

export type { Films };
