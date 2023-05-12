import { NextApiRequest, NextApiResponse } from "next";

import { jsonCache } from "lib/redis";
import { prisma } from "lib/prisma";

export default async function getSingle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorId } = req.body;

  let cachedValue, singlePost;

  try {
    cachedValue = await jsonCache.get(authorId);

    if (cachedValue) {
      return res.status(200).json(cachedValue);
    }

    singlePost = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
    });

    if (!singlePost)
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });

    await jsonCache.set(authorId, singlePost);
    res.status(200).json(singlePost);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error fetching posts" });
  } finally {
    await prisma.$disconnect();
  }
}
