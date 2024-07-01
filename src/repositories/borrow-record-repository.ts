import { prisma } from "../database/prisma";
import { BorrowRecord } from "@prisma/client";

/**
 * Fetches all borrowRecords.
 * @returns Promise<BorrowRecord[]>
 */
export const foundBorrowRecords = async (): Promise<BorrowRecord[]> => {
  return prisma.borrowRecord.findMany();
};

/**
 * Fetches a borrowRecord by its ID.
 * @param bId The ID of the borrowRecord to fetch.
 * @returns Promise<BorrowRecord | null>
 */
export const foundBorrowRecordById = async (
  bId: number
): Promise<BorrowRecord | null> => {
  return prisma.borrowRecord.findUnique({
    where: {
      id: bId,
    },
  });
};

/**
 * Creates a new borrowRecord.
 * @param data The data of the borrowRecord to create.
 * @returns Promise<BorrowRecord | null>
 */
export const createBorrowRecord = async (data: {
  borrower: string;
  bookId: number;
  borrowDate: Date;
  returnDate: Date;
}): Promise<BorrowRecord | null> => {
  return prisma.borrowRecord.create({
    data: {
      borrower: data.borrower,
      bookId: data.bookId,
      borrowDate: data.borrowDate,
      returnDate: data.returnDate,
    },
  });
};

/**
 * Updates a borrowRecord by its ID.
 * @param bId The ID of the borrowRecord to update.
 * @param data Partial data of the borrowRecord to update.
 * @returns Promise<BorrowRecord | null>
 */
export const updateBorrowRecordById = async (
  bId: number,
  data: Partial<BorrowRecord>
): Promise<BorrowRecord | null> => {
  const foundBorrowRecord = await foundBorrowRecordById(bId);

  // If borrowRecord is not found, return null
  if (!foundBorrowRecord) {
    return null;
  }

  // Update the borrowRecord
  const updatedBorrowRecord = await prisma.borrowRecord.update({
    where: { id: bId },
    data: {
      borrower: data.borrower ?? foundBorrowRecord.borrower,
      bookId: data.bookId ?? foundBorrowRecord.bookId,
      borrowDate: data.borrowDate ?? foundBorrowRecord.borrowDate,
      returnDate: data.returnDate ?? foundBorrowRecord.returnDate,
    },
  });

  return updatedBorrowRecord;
};

/**
 * Deletes a borrowRecord by its ID.
 * @param bId The ID of the borrowRecord to delete.
 * @returns Promise<BorrowRecord>
 */
export const deleteBorrowRecordById = async (bId: number): Promise<BorrowRecord> => {
  const deleteBorrowRecord = await prisma.borrowRecord.delete({ where: { id: bId } });
  return deleteBorrowRecord;
};
