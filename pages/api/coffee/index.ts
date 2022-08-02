// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await prisma.coffee.create({
        data: req.body,
      });
    } catch (e) {
      console.error(e);
    }

    return res.status(200).json({});
  }

  if (req.method === "DELETE") {
    try {
      await prisma.coffee.delete({
        where: { id: req.body.id },
      });
    } catch (e) {
      console.error(e);
    }

    return res.status(200).json({ error: false, msg: "Delete menu success" });
  }
};
