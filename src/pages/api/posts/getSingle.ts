import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const {authorId} = req.body

  try {
    const singlePost = await prisma.post.findMany({
        where : {
            authorId : authorId
        }
    });
    res.status(200).json(singlePost);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error fetching posts" });
  } finally {
    await prisma.$disconnect();
  }
}
