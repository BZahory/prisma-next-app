import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

interface RequestBody {
  username: string;
  password: string;
}

export default async function POST(req: Request, res: Response) {
  const { username, password }: RequestBody = await req.body;

  const userFromDatabase = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (
    userFromDatabase &&
    (await bcrypt.compare(password, userFromDatabase.password))
  ) {
    const { password, ...userWithoutPassword } = userFromDatabase;
    res.status(200).json(userWithoutPassword);
  } else {
    return res.status(200).json(null);
  }
}
