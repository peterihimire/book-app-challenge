import { Router } from "express";
import {
  updateAuthor,
  getAuthor,
  getAuthors,
  deleteAuthor,
  addAuthor,
  getAuthorsByFilter,
} from "../controllers/author-controller";
import { verifyTokenAndAuthorization } from "../middlewares/verify-token";
import { AuthorValidator } from "../middlewares/validator";

const router = Router();

router.post("", verifyTokenAndAuthorization, AuthorValidator, addAuthor);
router.get("", getAuthors);
router.get("/filter", getAuthorsByFilter);
router.get("/:id", getAuthor);
router.patch("/:id", verifyTokenAndAuthorization, updateAuthor);
router.delete("/:id", verifyTokenAndAuthorization, deleteAuthor);

export default router;
