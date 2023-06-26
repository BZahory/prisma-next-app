import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import type { Request, Response } from "express";

export default async function GET(req: Request, res: Response) {
  const token = req.headers.authorization;

  const userPuzzles = await prisma.puzzle.findMany({
    where: { authorId: req.query.username?.toString() },
    include: {
      author: {
        select: {
          email: true,
          username: true,
        },
      },
    },
  });

  if (!token || !verifyJwt(token)) {
    const censoredUserPuzzles = userPuzzles.map((userPuzzle) => {
      userPuzzle.savedAnswer = "";
      userPuzzle["author"]["email"] = "";
      userPuzzle["authorId"];
      return userPuzzle;
    });
    res.status(200).json(censoredUserPuzzles);
    return;
  }

  res.status(200).json(userPuzzles);
}
