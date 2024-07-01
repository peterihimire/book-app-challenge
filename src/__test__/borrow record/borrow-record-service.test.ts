import moment from "moment";
import {
  createBorrowRecord,
  findAllBorrowRecords,
  findBorrowRecordById,
  updateBorrowRecordById,
  deleteBorrowRecordById,
} from "../../services/borrow-record-service"; // Adjust the import based on your structure

describe("Borrow Record Service", () => {
  test("should create a new record", async () => {
    const borrowData = {
      borrower: "Lesly Brown",
      bookId: 9,
      borrowDate: moment("2023-07-05 19:38:02.415+01").toDate(),
      returnDate: moment("2023-07-07 19:38:02.415+01").toDate(),
    };
    const newBorrower = await createBorrowRecord(borrowData);
    expect(newBorrower?.borrower).toBe(borrowData?.borrower);
    expect(newBorrower?.bookId).toBe(borrowData?.bookId);
    expect(newBorrower?.borrowDate).toStrictEqual(borrowData.borrowDate);
    expect(newBorrower?.returnDate).toStrictEqual(borrowData.returnDate);
  });

  test("should get a record by ID", async () => {
    const borrowId = 1;
    const author = await findBorrowRecordById(borrowId);
    expect(author?.id).toBe(borrowId);
  });

  test("should get all records", async () => {
    const books = await findAllBorrowRecords();
    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0);
  });

  test("should update a record by ID", async () => {
    const borrowId = 8; // Assuming a author with this ID exists
    const updatedData = {
      borrower: "Christian Dior",
      borrowDate: moment("2023-07-05 19:38:02.415+01").toDate(),
    };
    const updatedBook = await updateBorrowRecordById(borrowId, updatedData);
    expect(updatedBook?.borrower).toBe(updatedData.borrower);
    expect(updatedBook?.borrowDate).toStrictEqual(updatedData.borrowDate);
  });

  test("should delete an record by ID", async () => {
    const borrowId = 12; // Assuming an author with this ID exists

    await deleteBorrowRecordById(borrowId);

    // Ensure the author is actually deleted
    const foundAuthor = await findBorrowRecordById(borrowId);
    expect(foundAuthor).toBeNull();
  });
});
