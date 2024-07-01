import moment from "moment";
import {
  createAuthor,
  findAllAuthors,
  findAuthorById,
  updateAuthorById,
  deleteAuthorById,
} from "../../services/author-service"; // Adjust the import based on your structure

describe("Author Service", () => {
  test("should create a new author", async () => {
    const authorData = {
      name: "John Smilga",
      birthdate: moment("1967-07-05 19:38:02.415+01").toDate(),
      bio: "John Smilga from pocket now",
    };
    const newAuthor = await createAuthor(authorData);
    expect(newAuthor?.name).toBe(authorData?.name);
    expect(newAuthor?.bio).toBe(authorData?.bio);
    expect(newAuthor?.birthdate).toStrictEqual(authorData.birthdate); // Use toStrictEqual for date comparison
  });

  test("should get an author by ID", async () => {
    const authorId = 3;
    const author = await findAuthorById(authorId);
    expect(author?.id).toBe(authorId);
  });

  test("should get all authors", async () => {
    const authors = await findAllAuthors();
    expect(Array.isArray(authors)).toBe(true);
    expect(authors.length).toBeGreaterThan(0);
  });

  test("should update a author by ID", async () => {
    const authorId = 5; // Assuming a author with this ID exists
    const updatedData = {
      name: "Christian Dior",
      birthdate: moment("1967-07-05 19:38:02.415+01").toDate(),
    };
    const updatedAuthor = await updateAuthorById(authorId, updatedData);
    expect(updatedAuthor?.name).toBe(updatedData.name);
    expect(updatedAuthor?.birthdate).toStrictEqual(updatedData.birthdate);
  });

  test("should delete an author by ID", async () => {
    const authorId = 9; // Assuming an author with this ID exists

    await deleteAuthorById(authorId);

    // Ensure the author is actually deleted
    const foundAuthor = await findAuthorById(authorId);
    expect(foundAuthor).toBeNull();
  });
});
