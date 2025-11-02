-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER DEFAULT 0,
    "project_id" INTEGER DEFAULT 0,
    "importance" INTEGER DEFAULT 0,
    "estimated_time" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
