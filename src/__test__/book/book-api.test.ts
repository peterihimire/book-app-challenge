import request from "supertest";
import app from "../../app"; // Adjust the import based on your structure

describe("Book API", () => {
  let cookie: string;

  // To authenticate with cookie token
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/bookchallenge/v1/auth/signin")
      .send({
        email: "beatriceihimire@gmail.com",
        password: "Ero12@",
      });
    const setCookieHeader = loginResponse.headers["set-cookie"];

    // Ensure setCookieHeader is an array
    if (Array.isArray(setCookieHeader)) {
      cookie =
        setCookieHeader.find((cookie: string) => cookie.startsWith("token=")) ||
        "";
    } else {
      throw new Error("Set-Cookie header is not an array");
    }
  });

  test("should create a new book", async () => {
    const bookData = {
      title: "How to chop",
      availableCopies: 19,
      authorId: 30,
      publishedYear: "1997",
      genre: "akon",
    };

    const response = await request(app)
      .post("/api/bookchallenge/v1/books")
      .set("Cookie", cookie) // Include the cookie in the request
      .send(bookData);

    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe("How to chop");
    expect(response.body.data.availableCopies).toBe(19);
    expect(response.body.data.authorId).toBe(30);
    expect(response.body.data.publishedYear).toBe("1997");
    expect(response.body.data.genre).toBe("akon");
  });

  test("should get a book by ID", async () => {
    const bookId = 4; // Assuming a book with this ID exists

    const response = await request(app).get(
      `/api/bookchallenge/v1/books/${bookId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(bookId);
  });

  test("should get all books", async () => {
    const response = await request(app).get(`/api/bookchallenge/v1/books`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

    // Check the structure of each book object in the array
    response.body.data.forEach((book: any) => {
      expect(book).toHaveProperty("id");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("authorId");
      expect(book).toHaveProperty("publishedYear");
      expect(book).toHaveProperty("genre");
      expect(book).toHaveProperty("availableCopies");
    });
  });

  test("should update a book by ID", async () => {
    const bookId = 26; // Assuming a book with this ID exists

    const updatedBookData = {
      title: "Mavin - Muzik",
      availableCopies: 23,
      // authorId: 20,
      // publishedYear: "1998",
      // genre: "drama",
    };

    const response = await request(app)
      .patch(`/api/bookchallenge/v1/books/${bookId}`)
      .set("Cookie", cookie)
      .send(updatedBookData);

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe("Mavin - Muzik");
    expect(response.body.data.availableCopies).toBe(23);
    // expect(response.body.data.publishedYear).toBe("1998");
    // expect(response.body.data.genre).toBe("drama");
  });

  test("should delete a book by ID", async () => {
    const bookId = 26; //make sure the bookId exist in database

    const response = await request(app)
      .delete(`/api/bookchallenge/v1/books/${bookId}`)
      .set("Cookie", cookie);

    expect(response.status).toBe(200);

    // Step 2: Attempt to retrieve the deleted book
    const getResponse = await request(app).get(
      `/api/bookchallenge/v1/books/${bookId}`
    );

    // Step 3: Verify the book no longer exists
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.data).toBeUndefined();
    // expect(getResponse.body.data).toBeNull();
  });
});
