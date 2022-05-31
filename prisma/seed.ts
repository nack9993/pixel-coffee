import { PrismaClient } from "@prisma/client";
import { usersData } from "./usersData";

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
};

run()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
