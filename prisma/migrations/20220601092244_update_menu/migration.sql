/*
  Warnings:

  - You are about to drop the column `name` on the `Coffee` table. All the data in the column will be lost.
  - You are about to drop the column `coffeeId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[menuName]` on the table `Coffee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menuName` to the `Coffee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_coffeeId_fkey";

-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "name",
ADD COLUMN     "menuName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "coffeeId";

-- CreateIndex
CREATE UNIQUE INDEX "Coffee_menuName_key" ON "Coffee"("menuName");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
