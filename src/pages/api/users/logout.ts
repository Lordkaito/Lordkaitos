// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/controllers/User";
import jwt, { Secret } from "jsonwebtoken";

type Data = {
  user?: User;
  message: string;
  token?: string;
};

// provisionals
type Message = {
  message: string;
  user?: User
  token? : string
};

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = JSON.parse(req.body);
  const user = await User.login(email, password);

  if (user) {
    const jwtSecret = process.env.JWT_SECRET!;
    const token = jwt.sign({ userId: user.id }, jwtSecret as Secret, {
      expiresIn: "7 days",
    });
    return res.status(200).json({ message: "ok", user: user, token: token });
    // return {user: user, token: token}
  } else {
    res.status(401).json({
      message: "error no user found"
    });
  }
}
