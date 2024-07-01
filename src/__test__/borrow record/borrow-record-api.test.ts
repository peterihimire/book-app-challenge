import moment from "moment";
import request from "supertest";
import app from "../../app"; // Adjust the import based on your structure

describe("Borrow Record API", () => {
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

  test("should create a new record", async () => {
    const recordData = {
      borrower: "Chisom Don",
      bookId: 18,
      borrowDate: moment("2024-07-05 19:38:02.415+01").toDate(),
      returnDate: moment("2024-07-05 19:38:02.415+01").toDate(),
    };

    const response = await request(app)
      .post("/api/bookchallenge/v1/borrow-records")
      .set("Cookie", cookie) // Include the cookie in the request
      .send(recordData);

    expect(response.status).toBe(201);
    expect(response.body.data.borrower).toBe("Chisom Don");
    expect(response.body.data.bookId).toBe(18);
    expect(
      moment(response.body.data.borrowDate).format("YYYY-MM-DD HH:mm:ss.SSSZZ")
    ).toBe("2024-07-05 19:38:02.415+0100");
    expect(
      moment(response.body.data.returnDate).format("YYYY-MM-DD HH:mm:ss.SSSZZ")
    ).toBe("2024-07-05 19:38:02.415+0100");
  });

  test("should get a record by ID", async () => {
    const recordId = 10; // Assuming a record with this ID exists

    const response = await request(app).get(
      `/api/bookchallenge/v1/borrow-records/${recordId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(recordId);
  });

  test("should get all books", async () => {
    const response = await request(app).get(
      `/api/bookchallenge/v1/borrow-records`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

    // Check the structure of each record object in the array
    response.body.data.forEach((record: any) => {
      expect(record).toHaveProperty("id");
      expect(record).toHaveProperty("borrower");
      expect(record).toHaveProperty("bookId");
      expect(record).toHaveProperty("returnDate");
      expect(record).toHaveProperty("borrowDate");
    });
  });

  test("should update a record by ID", async () => {
    const recordId = 14; // Assuming a record with this ID exists

    const updatedBookData = {
      bookId: 11,
      borrowDate: moment("1969-07-05 19:38:02.415+01").toDate(),
      // returnDate: "20",
    };

    const response = await request(app)
      .patch(`/api/bookchallenge/v1/borrow-records/${recordId}`)
      .set("Cookie", cookie)
      .send(updatedBookData);

    expect(response.status).toBe(200);
    expect(response.body.data.bookId).toBe(11);
    expect(
      moment(response.body.data.borrowDate).format("YYYY-MM-DD HH:mm:ss.SSSZZ")
    ).toBe("1969-07-05 19:38:02.415+0100");
    // expect(response.body.data.returnDate).toBe("1998");
  });

  test("should delete an record by ID", async () => {
    const recordId = 14; //make sure the recordId exist in database

    const response = await request(app)
      .delete(`/api/bookchallenge/v1/borrow-records/${recordId}`)
      .set("Cookie", cookie);

    expect(response.status).toBe(200);

    // Step 2: Attempt to retrieve the deleted record
    const getResponse = await request(app).get(
      `/api/bookchallenge/v1/borrow-records/${recordId}`
    );

    // Step 3: Verify the record no longer exists
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.data).toBeUndefined();
  });
});
