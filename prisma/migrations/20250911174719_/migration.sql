/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `Distributor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `Retailer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `Retailer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Customer" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Distributor" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Retailer" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_clerkId_key" ON "public"."Customer"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_clerkId_key" ON "public"."Distributor"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Retailer_clerkId_key" ON "public"."Retailer"("clerkId");
