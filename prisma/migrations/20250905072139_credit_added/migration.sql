/*
  Warnings:

  - You are about to drop the column `credits` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "credits";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 10;
