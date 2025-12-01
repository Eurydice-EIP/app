/*
  Warnings:

  - Added the required column `lastUpdate` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "lastUpdate" TIMESTAMP(3) NOT NULL;
