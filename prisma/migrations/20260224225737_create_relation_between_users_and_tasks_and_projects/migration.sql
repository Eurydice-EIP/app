/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `user_id` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_project_id_fkey";

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "user_id" SET NOT NULL;

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "due_at" TIMESTAMPTZ(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "ProjectType" NOT NULL,
    "importance" INTEGER NOT NULL DEFAULT 1,
    "estimated_min" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
