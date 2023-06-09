import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import Item from "@/controllers/Item";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
  item?: Item;
  error?: string;
};

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const form = new formidable.IncomingForm({ uploadDir: "./public/uploads" });

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        throw new Error(err.message);
      }

      const { image } = files;

      if (!image) {
        return res
          .status(400)
          .json({ message: "No se ha enviado ninguna imagen" });
      }

      const {
        userEmail,
        username,
        userId,
        name,
        description,
        price,
        priceId,
        unlimited,
        quantity,
      } = fields;

      const destinationDir = "./public/uploads";
      // @ts-ignore
      const originalFilename = image.originalFilename; // this is not a real error, only linter
      const extension = path.extname(originalFilename);
      const filename = `item-${userId}-${name}${extension}`;
      let filePath = path.join(destinationDir, filename);

      let index = 1;
      let newFilename = filename;
      while(fs.existsSync(filePath)) {
        newFilename = `item-${userId}-${name}-${index}${extension}`;
        filePath = path.join(destinationDir, newFilename);
        index++;
      }
      // @ts-ignore
      fs.renameSync(image.filepath, path.join(destinationDir, newFilename)); // this is not a real error, only linter

      const item = await Item.create(
        Number(userId),
        userEmail as string,
        username as string,
        name as string,
        description as string,
        Number(price),
        priceId as string,
        Boolean(unlimited),
        Number(quantity),
        filePath
      );

      if (item) {
        return res.status(200).json({ message: "Item created" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error creating item" });
    }
  });
}
