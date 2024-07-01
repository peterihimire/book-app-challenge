// import {
//   createBook,
//   findBookById,
//   findAllBooks,
//   updateBookById,
//   deleteBookById,
// } from "../services/book-service"; // Adjust the import based on your structure

// describe("Book Service", () => {
//   test("should create a new book", async () => {
//     const bookData = {
//       title: "How to fly",
//       availableCopies: 10,
//       authorId: 10,
//       publishedYear: "2000",
//       genre: "Aeroplane",
//     };
//     const newBook = await createBook(bookData);
//     expect(newBook?.title).toBe(bookData.title);
//     expect(newBook?.authorId).toBe(bookData?.authorId);
//     expect(newBook?.publishedYear).toBe(bookData?.publishedYear);
//     expect(newBook?.genre).toBe(bookData?.genre);
//     expect(newBook?.availableCopies).toBe(bookData.availableCopies);
//   });

//   test("should get a book by ID", async () => {
//     const bookId = 1; // Assuming a book with this ID exists
//     const book = await findBookById(bookId);
//     expect(book?.id).toBe(bookId);
//   });

//   test("should get all books", async () => {
//     const books = await findAllBooks();
//     expect(Array.isArray(books)).toBe(true);
//     expect(books.length).toBeGreaterThan(0); // Assuming there is at least one book
//   });

//   test("should update a book by ID", async () => {
//     const bookId = 1; // Assuming a book with this ID exists
//     const updatedData = {
//       title: "Updated Title",
//       availableCopies: 5,
//     };
//     const updatedBook = await updateBookById(bookId, updatedData);
//     expect(updatedBook?.title).toBe(updatedData.title);
//     expect(updatedBook?.availableCopies).toBe(updatedData.availableCopies);
//   });

//   test("should delete a book by ID", async () => {
//     const bookId = 1; // Assuming a book with this ID exists
//     // const deletedBook = await deleteBookById(bookId);
//     // expect(deletedBook).not.toBeNull();
//     // expect(deletedBook?.id).toBe(bookId);

//     await deleteBookById(bookId);

//     // Ensure the book is actually deleted
//     // const foundBook = await findBookById(bookId);
//     // expect(foundBook).toBeNull();

//     // Ensure the book is actually deleted
//     const foundBook = await findBookById(bookId);
//     expect(foundBook).toBeNull();
//   });
// });
