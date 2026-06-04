-- CreateEnum
CREATE TYPE "UserFriendState" AS ENUM ('PENDING', 'REQUESTED', 'CONFIRMED');

-- AlterTable
ALTER TABLE "user_friends" ADD COLUMN     "state" "UserFriendState" NOT NULL DEFAULT 'PENDING';
