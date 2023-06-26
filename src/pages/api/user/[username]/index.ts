import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import type { Request, Response } from "express";

export default async function GET(req: Request, res: Response) {
  const token = req.headers.authorization;

  const userFromDatabase = await prisma.user.findFirst({
    where: {
      username: req.query.username?.toString(),
    },
  });

  if (!userFromDatabase) {
    res.status(200).json(null);
    return;
  }

  userFromDatabase["password"];

  const { username } = userFromDatabase;

  const userPuzzles = await prisma.puzzle.findMany({
    where: { author: { username: req.query.username?.toString() } },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!token || !verifyJwt(token)) {
    const censoredUserPuzzles = userPuzzles.map((userPuzzle) => {
      userPuzzle.savedAnswer = "";
      userPuzzle["authorId"];
      return userPuzzle;
    });
    res.status(200).json({ username, puzzles: censoredUserPuzzles });
    return;
  }

  res.status(200).json({ ...userFromDatabase, puzzles: userPuzzles });
}
