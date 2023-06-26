import prisma from "@/lib/prisma";
import { Puzzle, Status } from "@/lib/types/sql";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const createDefaultPuzzles = () => {
  const puzzleOneNumbers = [
    randomIntFromInterval(0, 1000),
    randomIntFromInterval(0, 1000),
  ];
  const puzzleOne: Puzzle = {
    title: "Puzzle One",
    description: `Add two integers between 0 and 1000.\nYour numbers are: ${puzzleOneNumbers[0]} and ${puzzleOneNumbers[1]}.`,
    savedAnswer: "",
    status: Status.NOT_STARTED,
    answer: String(puzzleOneNumbers[0] + puzzleOneNumbers[1]),
  };

  const puzzleTwoArray = Array.from({ length: 500 }, () =>
    randomIntFromInterval(1, 1000)
  );

  const puzzleTwo = {
    title: "Puzzle Two",
    description: `Given 500 numbers between 1 and 1000, sort the numbers in descending order, then find the number in the 300th position (299th index).\nYour numbers are:\n${puzzleTwoArray.join(
      " "
    )}`,
    savedAnswer: "",
    status: Status.NOT_STARTED,
    answer: String(puzzleTwoArray.sort((a, b) => b - a)[299]),
  };

  return [puzzleOne, puzzleTwo];
};

export default async function POST(req: Request, res: Response) {
  const { username, email, password }: RequestBody = req.body;

  const userFromDatabase = await prisma.user.create({
    data: {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      puzzles: {
        create: createDefaultPuzzles(),
      },
    },
  });

  const { password: withheldPassword, ...result } = userFromDatabase;

  res.status(200).json(result);
}
