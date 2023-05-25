/**
 * This is a TypeScript function that creates a new item with information provided in the request body.
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request in a Next.js API route. It contains information about the request, such as the HTTP method,
 * headers, query parameters, and request body.
 * @param res - `res` is the response object that will be sent back to the client making the request.
 * It contains methods for setting the response status, headers, and body. In this case, the response
 * body will be of type `Message`, which includes a message string and optional `user` and `token`
 */
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import Item from "@/controllers/Item";
import formidable from "formidable";
import fs from "fs";
// import a from "../../../../public/uploads"

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

/**
 * This is an async function that extracts data from a request body in JSON format.
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request. It contains information about the request such as the HTTP method, headers, URL, and body.
 * In this case, it is of type `NextApiRequest`, which is a custom type defined by the Next.js
 * framework for handling
 * @param res - `res` is the response object that will be sent back to the client making the request.
 * It is of type `NextApiResponse<Message>`, which means it is an object that has methods for sending
 * different types of responses (e.g. JSON, HTML, text) and a generic type `Message
 */

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const form = new formidable.IncomingForm({ uploadDir: "./public/uploads" });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: err.message });
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
      unlimited,
      quantity,
    } = fields;
    console.log(image)

    const filePath = `./public/uploads/${name}.png`;
    fs.renameSync(image.filepath, filePath);

    const item = await Item.create(
      Number(userId),
      userEmail.toString(),
      username.toString(),
      name.toString(),
      description.toString(),
      Number(price),
      Boolean(unlimited),
      Number(quantity),
      filePath
    );

    if (item) {
      return res.status(200).json({ message: "Item created" });
    }

    return res.status(500).json({ message: "Error creating item" });
  });
}
