import { BorrowRecord } from "@prisma/client";
import {
  foundBorrowRecords as foundBorrowRecordsRepository,
  foundBorrowRecordById as foundBorrowRecordByIdRepository,
  createBorrowRecord as createBorrowRecordRepository,
  updateBorrowRecordById as updateBorrowRecordByIdRepository,
  deleteBorrowRecordById as deleteBorrowRecordByIdRepository,
} from "../repositories/borrow-record-repository";

/**
 * Fetches all borrow records.
 * @returns Promise<BorrowRecord[]>
 */
export const findAllBorrowRecords = async (): Promise<BorrowRecord[]> => {
  return foundBorrowRecordsRepository();
};

/**
 * Fetches a borrow record by its ID.
 * @param id The ID of the borrow record to fetch.
 * @returns Promise<BorrowRecord | null>
 */
export const findBorrowRecordById = async (
  id: number
): Promise<BorrowRecord | null> => {
  return foundBorrowRecordByIdRepository(id);
};

/**
 * Creates a new borrow record.
 * @param data The data of the borrow record to create.
 * @returns Promise<BorrowRecord | null>
 */
export const createBorrowRecord = async (data: {
  borrower: string;
  bookId: number;
  borrowDate: Date;
  returnDate: Date;
}): Promise<BorrowRecord | null> => {
  return createBorrowRecordRepository(data);
};

/**
 * Updates a borrow record by its ID.
 * @param id The ID of the borrow record to update.
 * @param data Partial data of the borrow record to update.
 * @returns Promise<BorrowRecord | null>
 */
export const updateBorrowRecordById = async (
  id: number,
  data: Partial<BorrowRecord>
): Promise<BorrowRecord | null> => {
  return updateBorrowRecordByIdRepository(id, data);
};

/**
 * Deletes a borrow record by its ID.
 * @param id The ID of the borrow record to delete.
 * @returns Promise<void>
 */
export const deleteBorrowRecordById = async (id: number): Promise<void> => {
  await deleteBorrowRecordByIdRepository(id);
};
