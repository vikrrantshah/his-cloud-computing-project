import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const {id} = req.query;
    if(typeof id !== 'string') return res.status(400);
    const captureData = await prisma.captureData.findUnique({where:{id}});
    if(!captureData) return res.status(404).json({message:`No data item found for Id:${id}.`})
    return res.status(200).json(captureData);
  }
  return res.status(405).json({ error: "Method not allowed" });
}
