
import { NextApiRequest, NextApiResponse } from "next";

import { redis } from "lib/redis";
import JSONCache from "redis-json";
import { prisma } from "lib/prisma";

export default async function getAll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonCache = new JSONCache(redis);

  try {
    const cachedPosts = await jsonCache.get("posts");

    if (cachedPosts) {
      return res.status(200).json(cachedPosts);
    }

    const posts = await prisma.post.findMany();

    await jsonCache.set("posts", [...posts]);

    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error fetching posts" });
  } finally {
    await prisma.$disconnect();
  }
}