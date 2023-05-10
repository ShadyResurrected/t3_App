import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function updatePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, postId } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        content: content,
      },
    });
    res.status(201).json({ updatedPost, success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error updating post" });
  } finally {
    await prisma.$disconnect();
  }
}
