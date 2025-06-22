import type { gradientMap } from "src/globals/gradients";

type Theme = keyof typeof gradientMap;

export type Dock = {
  dockId: string;
  name: string;
  tags: string[];
  emoji: string;
  description: string;
  theme: Theme;
  createdAt: string;
  updatedAt: string;
};

export type Stats = {
  streak: number;
  cardsStudied: number;
  docksReviewed: number;
};

export type User = {
  firstName: string;
  imageUrl: string;
};
