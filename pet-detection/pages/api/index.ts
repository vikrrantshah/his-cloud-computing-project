import { Pet, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const data = captureDataValidator.parse(req.body);
    const captureData = await prisma.captureData.create({
      data: { ...data, detectedAt: new Date(data.detectedAt) },
    });
    return res.status(200).json({ data: captureData });
  }
  if (req.method === "GET") {
    const captureData = await prisma.captureData.findMany();
    return res.status(200).json(captureData);
  }
  return res.status(405).json({ error: "Method not allowed" });
}

const captureDataValidator = z.object({
  image: z.string().url(),
  detectedPet: z.nativeEnum(Pet),
  detectedAt: z.string().datetime(),
  confidence: z.number().min(0).max(100),
});
