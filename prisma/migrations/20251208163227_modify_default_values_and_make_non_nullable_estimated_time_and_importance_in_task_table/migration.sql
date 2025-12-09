/*
  Warnings:

  - Made the column `importance` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estimated_time` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "task" ALTER COLUMN "importance" SET NOT NULL,
ALTER COLUMN "importance" SET DEFAULT 1,
ALTER COLUMN "estimated_time" SET NOT NULL,
ALTER COLUMN "estimated_time" SET DEFAULT 1;
