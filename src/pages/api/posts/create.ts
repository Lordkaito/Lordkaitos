import { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import Post from "@/controllers/Post";
import formidable from "formidable";
import fs from "fs";
import path from "path";

type Message = {
  message: string;
  user?: User;
  post?: Post;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const form = new formidable.IncomingForm({ uploadDir: "./public/uploads" });

  try {
    const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    const { userId, username, post } = fields;
    const { image } = files;

    let newFilename;
    if (image !== undefined) {
      const destinationDir = "./public/uploads";
      // @ts-ignore
      const originalFilename = image.originalFilename;
      const extension = path.extname(originalFilename);
      const filename = `picture-${userId}${extension}`;
      let index = 1;
      newFilename = filename;

      while (fs.existsSync(path.join(destinationDir, newFilename))) {
        newFilename = `picture-${userId}-${index}${extension}`;
        index++;
      }
      // @ts-ignore
      fs.renameSync(image.filepath, path.join(destinationDir, newFilename));
    }

    const id = Number(userId);
    const newPost = await Post.create(
      { id, name: username as string },
      post as string,
      image ? newFilename : undefined
    );

    return res.status(200).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error creating post" });
  }
}
