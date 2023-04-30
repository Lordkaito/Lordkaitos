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

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const request = JSON.stringify(req.body);
  const { user, id } = JSON.parse(request); // this is just for testing, we need to change after testing with postman
  // const { User, username, id } = JSON.parse(req.body);
  const post = await Post.get(user, id);
  if (!post) {
    return res.status(201).json({ message: "ok" });
  } else {
    return res.status(401).json({ message: "Error getting post" });
  }
}
