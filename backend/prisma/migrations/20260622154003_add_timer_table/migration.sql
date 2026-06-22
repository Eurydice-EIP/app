/*
  Warnings:

  - A unique constraint covering the columns `[timer_id]` on the table `task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "timer_id" INTEGER;

-- CreateTable
CREATE TABLE "timer" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMPTZ(3),
    "duration" INTEGER NOT NULL DEFAULT 0,
    "running" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "timer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_timer_id_key" ON "task"("timer_id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_timer_id_fkey" FOREIGN KEY ("timer_id") REFERENCES "timer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
