/*
  Warnings:

  - The primary key for the `user_friends` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_friends` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_friends" DROP CONSTRAINT "user_friends_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "user_friends_pkey" PRIMARY KEY ("user_id", "friend_id");

-- CreateIndex
CREATE INDEX "idx_state" ON "user_friends"("state");
