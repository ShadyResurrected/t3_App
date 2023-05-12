import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import { redis } from "lib/redis";
import JSONCache from "redis-json";


export default async function updatePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, postId } = req.body;
  const jsonCache = new JSONCache(redis);

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

    // Invalidating the redis cache
    await jsonCache.del("posts")
    await jsonCache.del(updatePost?.authorId)

    res.status(201).json({ updatedPost, success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error updating post" });
  } finally {
    await prisma.$disconnect();
  }
}
