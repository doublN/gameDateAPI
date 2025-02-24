import { Cover } from "./cover.js";

export type Game = {
  id: number;
  cover: Cover | null;
  first_release_date: number;
  name: string;
};
