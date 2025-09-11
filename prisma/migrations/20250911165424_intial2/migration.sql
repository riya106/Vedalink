/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Farmer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Farmer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Farmer" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_clerkId_key" ON "public"."Farmer"("clerkId");
