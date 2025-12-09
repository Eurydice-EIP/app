-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED');

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'PENDING';
