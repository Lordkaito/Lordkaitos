import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import Item from "@/controllers/Item";
import formidable from "formidable";

type Data = {
  user?: User;
  // price: number;
  // name: string;
  description?: string;
  message?: string;
  items?: Item[];
};

// provisionals
type Message = {
  message: string;
  user?: User;
  items?: Item[];
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function getAll(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("req.query inside getAllForUser");
  // const request = JSON.stringify(req.body);
  const form = new formidable.IncomingForm();
  try {
    const { fields } = await new Promise<{ fields: formidable.Fields }>(
      (resolve, reject) => {
        console.log(req.query, "req.query inside getAllForUser");
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
    const items = await Item.getAll(Number(userId));
    console.log(items, "items inside getAllForUser");
    if (items) {
      return res.status(201).json({ message: "ok", items: items as Item[] });
    }
    return res.status(401).json({ message: "Error getting items" });
  } catch {
    return res.status(401).json({ message: "Error getting itemssss" });
  }
}
