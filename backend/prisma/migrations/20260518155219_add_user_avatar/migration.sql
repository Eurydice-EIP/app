-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatar_mime" VARCHAR(255),
ADD COLUMN     "avatar_path" VARCHAR(255),
ADD COLUMN     "avatar_size" INTEGER,
ADD COLUMN     "avatar_updated_at" TIMESTAMPTZ(3);
