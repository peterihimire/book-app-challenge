import moment from "moment";
import request from "supertest";
import app from "../../app"; // Adjust the import based on your structure

describe("Author API", () => {
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

  test("should create a new author", async () => {
    const authorData = {
      name: "Flora Anderson",
      birthdate: moment("1981-07-05 19:38:02.415+01").toDate(),
      bio: "Flora Anderson was born 1933",
    };

    const response = await request(app)
      .post("/api/bookchallenge/v1/authors")
      .set("Cookie", cookie) // Include the cookie in the request
      .send(authorData);

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Flora Anderson");
    expect(
      moment(response.body.data.birthdate).format("YYYY-MM-DD HH:mm:ss.SSSZZ")
    ).toBe("1981-07-05 19:38:02.415+0100");
    // expect(response.body.data.birthdate).toStrictEqual(
    //   "1967-07-05 19:38:02.415+01"
    // );
    expect(response.body.data.bio).toBe("Flora Anderson was born 1933");
  });

  test("should get a author by ID", async () => {
    const authorId = 4; // Assuming a author with this ID exists

    const response = await request(app).get(
      `/api/bookchallenge/v1/authors/${authorId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(authorId);
  });

  test("should get all books", async () => {
    const response = await request(app).get(`/api/bookchallenge/v1/authors`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

    // Check the structure of each author object in the array
    response.body.data.forEach((author: any) => {
      expect(author).toHaveProperty("id");
      expect(author).toHaveProperty("name");
      expect(author).toHaveProperty("bio");
      expect(author).toHaveProperty("birthdate");
    });
  });

  test("should update a author by ID", async () => {
    const authorId = 10; // Assuming a author with this ID exists

    const updatedBookData = {
      name: "John Hopkins",
      birthdate: moment("1967-07-05 19:38:02.415+01").toDate(),
      // bio: "20",
    };

    const response = await request(app)
      .patch(`/api/bookchallenge/v1/authors/${authorId}`)
      .set("Cookie", cookie)
      .send(updatedBookData);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("John Hopkins");
    expect(
      moment(response.body.data.birthdate).format("YYYY-MM-DD HH:mm:ss.SSSZZ")
    ).toBe("1967-07-05 19:38:02.415+0100");
    // expect(response.body.data.bio).toBe("1998");
  });

  test("should delete an author by ID", async () => {
    const authorId = 12; //make sure the authorId exist in database

    const response = await request(app)
      .delete(`/api/bookchallenge/v1/authors/${authorId}`)
      .set("Cookie", cookie);

    expect(response.status).toBe(200);

    // Step 2: Attempt to retrieve the deleted author
    const getResponse = await request(app).get(
      `/api/bookchallenge/v1/authors/${authorId}`
    );

    // Step 3: Verify the author no longer exists
    expect(getResponse.status).toBe(404); // Assuming your API returns 404 for not found
    expect(getResponse.body.data).toBeUndefined();
    // expect(getResponse.body.data).toBeNull();
  });
});
