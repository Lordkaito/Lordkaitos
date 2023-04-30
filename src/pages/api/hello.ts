// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";

type Data = {
  users: User[]
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = await User.getAll();
  res.status(200).json({ users });
}
