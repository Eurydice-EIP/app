-- CreateIndex
CREATE INDEX "task_block_blocked_id_idx" ON "task_block"("blocked_id");

-- CreateIndex
CREATE INDEX "task_block_blocker_id_idx" ON "task_block"("blocker_id");
