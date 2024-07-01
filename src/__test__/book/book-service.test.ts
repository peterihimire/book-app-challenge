import {
  createBook,
  findBookById,
  findAllBooks,
  updateBookById,
  deleteBookById,
} from "../../services/book-service"; // Adjust the import based on your structure

describe("Book Service", () => {
  test("should create a new book", async () => {
    const bookData = {
      title: "Tell tale",
      availableCopies: 10,
      authorId: 22,
      publishedYear: "2011",
      genre: "Story",
    };
    const newBook = await createBook(bookData);
    expect(newBook?.title).toBe(bookData.title);
    expect(newBook?.authorId).toBe(bookData?.authorId);
    expect(newBook?.publishedYear).toBe(bookData?.publishedYear);
    expect(newBook?.genre).toBe(bookData?.genre);
    expect(newBook?.availableCopies).toBe(bookData.availableCopies);
  });

  test("should get a book by ID", async () => {
    const bookId = 3; // Assuming a book with this ID exists
    const book = await findBookById(bookId);
    expect(book?.id).toBe(bookId);
  });

  test("should get all books", async () => {
    const books = await findAllBooks();
    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0); // Assuming there is at least one book
  });

  test("should update a book by ID", async () => {
    const bookId = 14; // Assuming a book with this ID exists
    const updatedData = {
      title: "G Unit",
      availableCopies: 15,
    };
    const updatedBook = await updateBookById(bookId, updatedData);
    expect(updatedBook?.title).toBe(updatedData.title);
    expect(updatedBook?.availableCopies).toBe(updatedData.availableCopies);
  });

  test("should delete a book by ID", async () => {
    const bookId = 24; // Assuming a book with this ID exists

    await deleteBookById(bookId);

    // Ensure the book is actually deleted
    const foundBook = await findBookById(bookId);
    expect(foundBook).toBeNull();
  });
});
// const deletedBook = await deleteBookById(bookId);
// expect(deletedBook).not.toBeNull();
// expect(deletedBook?.id).toBe(bookId);
