import express, { Application, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { CustomUser } from "./types/types";
import authRoute from "./routes/auth-route";
import authorRoute from "./routes/author-route";
import bookRoute from "./routes/book-route";
import borrowRecordRoute from "./routes/borrow-record-route";
import docRoute from "./routes/api-doc-route";
import testRoute from "./routes/test-route";

import {
  logErrorMiddleware,
  returnError,
  unknownRoute,
} from "./middlewares/error-handler";

// declare module "express-session" {
//   interface SessionData {
//     user: CustomUser;
//   }
// }

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3000"],
  methods: ["GET", "PUT", "PATCH", "POST", "OPTIONS", "DELETE", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Origin",
    "Accept",
  ],
  credentials: true,
  optionSuccessStatus: 200,
  preflightContinue: false,
};

const app: Application = express();
app.set("trust proxy", 1);

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/bookchallenge/v1/auth", authRoute);
app.use("/api/bookchallenge/v1/authors", authorRoute);
app.use("/api/bookchallenge/v1/books", bookRoute);
app.use("/api/bookchallenge/v1/borrow-records", borrowRecordRoute);
app.use("/api/bookchallenge/v1/api-docs", docRoute); // Visit this link from a browser
app.use("/api/bookchallenge/v1/test", testRoute);

app.use(unknownRoute);
app.use(logErrorMiddleware);
app.use(returnError);
export default app;
