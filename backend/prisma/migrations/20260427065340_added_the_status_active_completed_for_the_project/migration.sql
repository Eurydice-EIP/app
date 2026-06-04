-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE';
