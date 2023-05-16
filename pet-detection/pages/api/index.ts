// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const data = req.body;
    const captureData = await prisma.captureData.create({ data });
    return res.status(200).json({ data: captureData });
  }
  if (req.method === "GET") {
    const data = await prisma.captureData.findMany();
    return res.status(200).json(data);
  }
  return res.status(405).json({ error: "Method not allowed" });
}
