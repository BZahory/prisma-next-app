import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

export default async function POST(req: Request, res: Response) {
  const { username, email, password }: RequestBody = req.body;

  const userFromDatabase = await prisma.user.create({
    data: { username, email, password: await bcrypt.hash(password, 10) },
  });

  const { password: withheldPassword, ...result } = userFromDatabase;

  res.status(200).json(result);
}
