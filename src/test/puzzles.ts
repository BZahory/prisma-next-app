interface Puzzle {
  id: number;
  name: string;
  savedCode: string;
  description: string;
  status: Status;
}

export enum Status {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

const puzzles: Puzzle[] = [
  {
    id: 1,
    name: "puzzle 1",
    description: "part 1\npart2",
    savedCode: "hi",
    status: Status.IN_PROGRESS,
  },
  {
    id: 2,
    name: "puzzle 2",
    description: "part 1\npart2\npart3",
    savedCode: "",
    status: Status.COMPLETED,
  },
];

export default puzzles;
