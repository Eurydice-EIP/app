/*
  Warnings:

  - You are about to drop the column `lastUpdate` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "lastUpdate",
ADD COLUMN     "last_update" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
