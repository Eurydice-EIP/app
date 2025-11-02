/*
  Warnings:

  - You are about to drop the column `deadline` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_time` on the `task` table. All the data in the column will be lost.
  - Added the required column `due_at` to the `task` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "deadline",
DROP COLUMN "estimated_time",
ADD COLUMN     "due_at" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "estimated_min" INTEGER DEFAULT 0,
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "project_id" DROP DEFAULT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);
