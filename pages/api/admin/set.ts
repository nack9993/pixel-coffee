// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let response;
  try {
    response = await prisma.admin.upsert({
      where: { id: 1 },
      update: {
        isAvailable: req.body.isAvailable,
      },
      create: {
        isAvailable: req.body.isAvailable,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return res.status(200).json(response);
};
