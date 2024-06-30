import { Router } from "express";
import {
  updateBook,
  getBook,
  getBooks,
  deleteBook,
  addBook,
} from "../controllers/book-controller";
import { verifyTokenAndAuthorization } from "../middlewares/verify-token";

const router = Router();

router.post("", verifyTokenAndAuthorization, addBook);
router.get("/:id", getBook);
router.get("", getBooks);
router.patch("/:id", verifyTokenAndAuthorization, updateBook);
router.delete("/:id", verifyTokenAndAuthorization, deleteBook);

export default router;
