import { verifyJwt } from "@/lib/utils/jwt";
import prisma from "@/lib/prisma";
import { Status } from "@/lib/types/sql";
import type { Request, Response } from "express";

interface RequestBody {
  savedAnswer?: string;
  submittedAnswer?: string;
}

export default async function POST(req: Request, res: Response) {
  const { savedAnswer, submittedAnswer }: RequestBody = await req.body;

  const token = req.headers.authorization;

  const puzzleFromDatabase = await prisma.puzzle.findFirst({
    where: {
      id: Number(req.query.puzzleId),
    },
  });

  if (!puzzleFromDatabase || !token || !verifyJwt(token)) {
    res.status(403).json(!token || !verifyJwt(token) ? "unauthorized" : null);
    return;
  }
  const { answer, savedAnswer: currentSavedAnswer } = puzzleFromDatabase;

  const puzzleOverrides = {
    status: answer === submittedAnswer ? Status.COMPLETED : Status.IN_PROGRESS,
    savedAnswer: savedAnswer ?? currentSavedAnswer,
  };

  await prisma.puzzle.update({
    where: {
      id: Number(req.query.puzzleId),
    },
    data: puzzleOverrides,
  });

  res.status(200).json({ ...puzzleFromDatabase, ...puzzleOverrides });
}
