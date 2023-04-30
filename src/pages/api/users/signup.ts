// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";

type Data = {
  user: User[]
};


// provisionals
type Message = {
  message: string
}

export default async function singUp(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const { username, email, password } = JSON.parse(req.body);
  const user = await User.create(username, email, password);
  if (user) {
    return res.status(200).json({ message: "User created" });
  }
  return res.status(401).json({ message: "Error creating user" });
}
