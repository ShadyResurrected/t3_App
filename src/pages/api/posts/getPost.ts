import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getPost(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const {postId} = req.body

  try {
    const singlePost = await prisma.post.findUnique({
        where : {
            id : postId
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
