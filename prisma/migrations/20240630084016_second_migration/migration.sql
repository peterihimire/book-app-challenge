/*
  Warnings:

  - You are about to drop the `borrowRecords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "borrowRecords";

-- CreateTable
CREATE TABLE "borrowrecords" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "borrower" TEXT NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "borrowrecords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "borrowrecords_bookId_key" ON "borrowrecords"("bookId");
