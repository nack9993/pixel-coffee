/*
  Warnings:

  - Added the required column `optional` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "optional" TEXT NOT NULL;
