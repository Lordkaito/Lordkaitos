import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

// Endpoint para subir una imagen
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({ uploadDir: "./public/uploads" });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { image } = files;
    // const { name } = fields;
    // console.log(files.image.originalFilename, "image");

    if (!image) {
      return res.status(400).json({ error: "No se ha enviado ninguna imagen" });
    }

    // if (!name) {
    //   return res.status(400).json({ error: "No se ha enviado el nombre" });
    // }


    res
    .status(200)
    // @ts-ignore
      .json({ image: image, path: image._writeStream.path });
  });
};
