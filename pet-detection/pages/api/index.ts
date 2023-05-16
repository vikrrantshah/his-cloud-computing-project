// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return res.status(200).json({ name: "John Doe" });
  }
  if (req.method === "GET") {
    return res.status(200).json({ name: "John Doe" });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
