import puzzles, { Puzzle } from "./puzzles";

interface User {
  username: string;
  email: string;
  puzzles: Puzzle[];
}

const currentUser: User = {
  username: "bzahory",
  email: "test@test.com",
  puzzles,
};

export default currentUser;
