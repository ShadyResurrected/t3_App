import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import { jsonCache } from "lib/redis";


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
        createdAt : new Date()
      },
    });

    // Invalidating the redis cache
    await jsonCache.del("posts")
    await jsonCache.del(postId)

    res.status(201).json({ updatedPost, success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error updating post" });
  } finally {
    await prisma.$disconnect();
  }
}
