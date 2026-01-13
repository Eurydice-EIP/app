-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('MAIN', 'SIDE');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "due_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,
    "type" "ProjectType" NOT NULL,
    "importance" INTEGER NOT NULL,
    "estimated_min" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
