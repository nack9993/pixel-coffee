// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.order.delete({
      where: {
        id: req.body.id,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return res.status(200).json({});
};
