import { PrismaClient } from "@prisma/client";
import { usersData } from "./usersData";
import { drinksData } from "./drinksData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    usersData.map(async (user) => {
      return prisma.user.upsert({
        where: { name: user.name },
        update: {},
        create: {
          name: user.name,
          avatar: user.avatar,
        },
      });
    })
  );

  await Promise.all(
    drinksData.map(async (drink) => {
      // return prisma.coffee.create({
      //   data: {
      //     name: drink.name,
      //     type: drink.type,
      //   },
      // });
      return prisma.coffee.upsert({
        where: { menuName: drink.name },
        update: {},
        create: {
          menuName: drink.name,
          type: drink.type,
        },
      });
    })
  );
};

run()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
