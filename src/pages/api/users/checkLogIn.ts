// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
// import { Jwt } from "jsonwebtoken";
import jwt, { Secret } from "jsonwebtoken";

type Data = {
  token?: string;
  message?: string;
};

export default async function checkLogIn(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token } = JSON.parse(req.body);
  const isLoggedIn = await User.isLoggedIn(token);
  if (isLoggedIn) {
    res.status(200).redirect("/home");
  } else {
    res.status(200).json({ message: "Token expired" });
  }
}
