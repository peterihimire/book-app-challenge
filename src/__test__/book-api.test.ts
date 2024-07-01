import request from "supertest";
import app from "../app"; // Adjust the import based on your structure

describe("Book API", () => {
  let cookie: string;

  beforeAll(async () => {
    // Obtain a valid token and set it in the cookie
    const loginResponse = await request(app)
      .post("/api/bookchallenge/v1/auth/signin") // Adjust this to your login route
      .send({
        email: "beatriceihimire@gmail.com", // Use valid credentials
        password: "Ero12@",
      });
    // console.log("yeah, login response:", loginResponse);
    // Extract the cookie from the response
    // cookie = loginResponse.headers["set-cookie"].find((cookie: string) =>
    //   cookie.startsWith("token=")
    // );
    // cookie = loginResponse.headers["set-cookie"]; // Extract the cookie from the response

    // // Extract the cookie from the response
    // const setCookieHeader = loginResponse.headers["set-cookie"];
    // cookie =
    //   setCookieHeader.find((cookie: string) => cookie.startsWith("token=")) ||
    //   "";

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
      title: "Hello",
      availableCopies: 7,
      authorId: 15,
      publishedYear: "1997",
      genre: "Betrayal",
    };

    const response = await request(app)
      .post("/api/bookchallenge/v1/books")
      .set("Cookie", cookie) // Include the cookie in the request
      .send(bookData);

    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe("Hello");
    expect(response.body.data.availableCopies).toBe(7);
    expect(response.body.data.authorId).toBe(15);
    expect(response.body.data.publishedYear).toBe("1997");
    expect(response.body.data.genre).toBe("Betrayal");
  });

  test("should get a book by ID", async () => {
    const bookId = 4; // Assuming a book with this ID exists
    const response = await request(app).get(
      `/api/bookchallenge/v1/books/${bookId}`
    );

    expect(response.status).toBe(200);
    // expect(response.body.id).toBe(bookId);
  });
});
