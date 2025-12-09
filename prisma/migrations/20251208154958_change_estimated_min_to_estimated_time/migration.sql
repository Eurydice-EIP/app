/*
  Warnings:

  - You are about to drop the column `estimated_min` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "estimated_min",
ADD COLUMN     "estimated_time" INTEGER DEFAULT 0;
