/*
  Warnings:

  - Made the column `version` on table `pr_header` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pr_header" ALTER COLUMN "version" SET NOT NULL;
