// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: true,
  },
};

type Data = {
  user: User[];
};

// provisionals
type Message = {
  message?: string,
  image?: string
};

export default async function profileImage(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const user = await User.getById(Number(req.query.userId));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { image } = user;

  if (!image) {
    return res.status(404).json({ message: "Image not found" });
  }

  return res.status(200).json({ image: image });
}
