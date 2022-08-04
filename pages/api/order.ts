// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    let orders = {};
    try {
      orders = await prisma.order.findMany({
        include: {
          Coffee: true,
        },
      });
    } catch (e) {
      console.error(e);
    }

    return res.status(200).json(orders);
  }

  if (req.method === "POST") {
    let order = {};
    try {
      order = await prisma.order.create({
        data: req.body,
      });
      return res.status(200).json(order);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e.message);
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this email"
          );
        }
      }

      return res.status(500).json({ message: e.message });
    }

    // return res.status(200).json(order);
  }
};
