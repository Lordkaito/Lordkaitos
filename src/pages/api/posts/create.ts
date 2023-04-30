import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import Post from "@/controllers/Post";

type Data = {
  user?: User;
  price: number;
  name: string;
  description?: string;
};

// provisionals
type Message = {
  message: string;
  user?: User;
  post?: Post;
};

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const { User, title, content, image = "", published = true } = JSON.parse(req.body);
  const post = await Post.create(User, title, content, image, published);
  if (post) {
    return res.status(201).json({ message: "ok" });
  }
}
