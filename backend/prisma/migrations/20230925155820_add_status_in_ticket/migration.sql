/*
  Warnings:

  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('new', 'in_progress', 'resolved');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" "Status" NOT NULL;
