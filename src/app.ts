import express, { Application, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CustomUser } from "./types/types";

import authRoute from "./routes/auth-route";
import userRoute from "./routes/user-route";
import testRoute from "./routes/test-route";

import {
  logErrorMiddleware,
  returnError,
  unknownRoute,
} from "./middlewares/error-handler";

declare module "express-session" {
  interface SessionData {
    user: CustomUser;
  }
}

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

app.use("/api/booktask/v1/auth", authRoute);
app.use("/api/booktask/v1/users", userRoute);
app.use("/api/booktask/v1/test", testRoute);

app.use(unknownRoute);
app.use(logErrorMiddleware);
app.use(returnError);
export default app;
