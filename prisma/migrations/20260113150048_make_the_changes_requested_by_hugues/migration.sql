/*
  Warnings:

  - Made the column `estimated_min` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "due_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "importance" SET DEFAULT 1,
ALTER COLUMN "estimated_min" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "last_update" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "last_update" SET DATA TYPE TIMESTAMPTZ(3);
