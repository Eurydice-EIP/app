-- CreateTable
CREATE TABLE "task_block" (
    "blocker_id" INTEGER NOT NULL,
    "blocked_id" INTEGER NOT NULL,

    CONSTRAINT "task_block_pkey" PRIMARY KEY ("blocker_id","blocked_id")
);

-- AddForeignKey
ALTER TABLE "task_block" ADD CONSTRAINT "task_block_blocker_id_fkey" FOREIGN KEY ("blocker_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_block" ADD CONSTRAINT "task_block_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
