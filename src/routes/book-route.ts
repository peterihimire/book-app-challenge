import { Router } from "express";
import {
  updateBook,
  getBook,
  getBooks,
  getBooksByFilter,
  deleteBook,
  addBook,
} from "../controllers/book-controller";
import { verifyTokenAndAuthorization } from "../middlewares/verify-token";
import { BookValidator } from "../middlewares/validator";

const router = Router();

router.post("", verifyTokenAndAuthorization, BookValidator, addBook);
router.get("", getBooks);
router.get("/filter", getBooksByFilter);
router.get("/:id", getBook);
router.patch("/:id", verifyTokenAndAuthorization, updateBook);
router.delete("/:id", verifyTokenAndAuthorization, deleteBook);

export default router;
