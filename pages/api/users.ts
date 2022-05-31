// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let users;
  try {
    users = await prisma.user.findMany({});
  } catch (e) {}

  return await res.status(200).json(users);
};
