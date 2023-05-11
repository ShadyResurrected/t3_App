import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { redis } from "lib/redis";
import JSONCache from "redis-json";

const prisma = new PrismaClient();

export default async function getPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId } = req.body;
  const jsonCache = new JSONCache(redis);
  try {
    const cachedValue = await jsonCache.get(postId);

    if (cachedValue) {
      return res.status(200).json(cachedValue);
    }

    const singlePost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!singlePost)
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });

    await jsonCache.set(postId, singlePost);

    res.status(200).json(singlePost);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  } finally {
    await prisma.$disconnect();
  }
}
