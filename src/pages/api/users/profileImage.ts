import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  user: User[];
};

// provisionals
type Message = {
  message: string;
};

export default async function profileImage(
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
      const { userId } = fields;

      if (!image) {
        return res
          .status(400)
          .json({ message: "No se ha enviado ninguna imagen" });
      }

      const destinationDir = "./public/uploads";
      // @ts-ignore
      const originalFilename = image.originalFilename;
      const extension = path.extname(originalFilename);
      const filename = `picture-${userId}${extension}`;
      let filePath = path.join(destinationDir, filename);

      let index = 1;
      let newFilename = filename;
      while (fs.existsSync(filePath)) {
        newFilename = `picture-${userId}-${index}${extension}`;
        filePath = path.join(destinationDir, newFilename);
        index++;
      }
      // @ts-ignore
      fs.renameSync(image.filepath, path.join(destinationDir, newFilename));

      const user = await User.addProfileImage(userId as string, newFilename);

      if (user) {
        return res.status(200).json({ message: "Image uploaded" });
      }
    } catch {
      return res.status(500).json({ message: "Error uploading image" });
    }
  });
}

// this is optimized code, we will check it once we apply the function to upload your profile image in the frontend

// import { NextApiRequest, NextApiResponse } from "next";
// import User from "@/controllers/User";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// type Message = {
//   message: string;
// };

// export default async function profileImage(
//   req: NextApiRequest,
//   res: NextApiResponse<Message>
// ) {
//   const form = new formidable.IncomingForm({ uploadDir: "./public/uploads" });

//   try {
//     const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve({ fields, files });
//         }
//       });
//     });

//     const { image } = files;
//     const { userId } = fields;

//     if (!image) {
//       return res.status(400).json({ message: "No se ha enviado ninguna imagen" });
//     }

//     const destinationDir = "./public/uploads";
//     const originalFilename = image.originalFilename;
//     const extension = path.extname(originalFilename);
//     const filename = `picture-${userId}${extension}`;
//     let filePath = path.join(destinationDir, filename);

//     let index = 1;
//     let newFilename = filename;

//     while (fs.existsSync(filePath)) {
//       newFilename = `picture-${userId}-${index}${extension}`;
//       filePath = path.join(destinationDir, newFilename);
//       index++;
//     }

//     fs.renameSync(image.filepath, path.join(destinationDir, newFilename));

//     const user = await User.addProfileImage(userId as string, newFilename);

//     if (user) {
//       return res.status(200).json({ message: "Image uploaded" });
//     } else {
//       return res.status(500).json({ message: "Error uploading image" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error uploading image" });
//   }
// }
