import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, authorId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: { id: authorId },
        },
      },
    });
    res.status(201).json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error creating post" });
  } finally {
    await prisma.$disconnect();
  }
}
