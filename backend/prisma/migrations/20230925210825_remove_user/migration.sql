/*
  Warnings:

  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- DropIndex
DROP INDEX "Ticket_userId_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";
