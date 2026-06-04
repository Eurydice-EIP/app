-- CreateEnum
CREATE TYPE "UserLanguage" AS ENUM ('ENGLISH', 'FRENCH');

-- CreateEnum
CREATE TYPE "UserTheme" AS ENUM ('LIGHT', 'DARK');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "language" "UserLanguage" NOT NULL DEFAULT 'ENGLISH',
ADD COLUMN     "theme" "UserTheme" NOT NULL DEFAULT 'LIGHT';
