import { Router } from "express";
import {
  updateBook,
  getBook,
  getBooks,
  deleteBook,
  addBook,
} from "../controllers/book-controller";
import { verifyTokenAndAuthorization } from "../middlewares/verify-token";
import { BookValidator } from "../middlewares/validator";

const router = Router();

router.post("", verifyTokenAndAuthorization, BookValidator, addBook);
router.get("/:id", getBook);
router.get("", getBooks);
router.patch("/:id", verifyTokenAndAuthorization, BookValidator, updateBook);
router.delete("/:id", verifyTokenAndAuthorization, deleteBook);

export default router;
