// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let order;
  try {
    order = await prisma.order.create({
      data: req.body,
    });
  } catch (e) {
    console.error(e);
  }

  return res.status(200).json(order);
};
