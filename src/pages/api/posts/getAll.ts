import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const post = await prisma.post.findMany();
    res.status(200).json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error fetching posts" });
  } finally {
    await prisma.$disconnect();
  }
}
