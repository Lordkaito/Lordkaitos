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
  message: string;
};

export default async function profileImage(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  console.log(req);
}
