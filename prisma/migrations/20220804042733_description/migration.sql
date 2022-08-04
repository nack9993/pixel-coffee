/*
  Warnings:

  - You are about to drop the column `optional` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "optional",
ADD COLUMN     "description" TEXT;
