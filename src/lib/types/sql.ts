export interface User {
  username: string;
  email: string;
  puzzles: Puzzle[];
}

export interface Puzzle {
  id?: number;
  title: string;
  savedAnswer: string;
  description: string;
  status: Status;
  answer: string;
}

export enum Status {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}
