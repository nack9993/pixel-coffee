/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderBy` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userId",
ADD COLUMN     "coffeeId" INTEGER,
ADD COLUMN     "orderBy" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
