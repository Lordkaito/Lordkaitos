import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import Post from "@/controllers/Post";
import formidable from "formidable";

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
  posts?: Post[];
};

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function getAllForUser(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  // const request = JSON.stringify(req.body);
  const form = new formidable.IncomingForm();
  try {
    const { fields } = await new Promise<{ fields: formidable.Fields }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields });
          }
        });
      }
    );
    const { userId } = fields;
    const posts = await Post.getAll(Number(userId));
    if (posts) {
      return res.status(201).json({ message: "ok", posts });
    }
    return res.status(401).json({ message: "Error getting postsssss" });
  } catch {
    return res.status(401).json({ message: "Error getting posts" });
  }
}
