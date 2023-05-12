import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import { redis } from "lib/redis";
import JSONCache from "redis-json";

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, authorId } = req.body;
  const jsonCache = new JSONCache(redis);

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

    // Invalidating the redis cache
    await jsonCache.del(authorId);
    await jsonCache.del("posts");

    res.status(201).json({ post, success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error creating post" });
  } finally {
    await prisma.$disconnect();
  }
}
