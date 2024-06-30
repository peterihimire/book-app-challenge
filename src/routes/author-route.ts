import { Router } from "express";
import {
  updateAuthor,
  getAuthor,
  getAuthors,
  deleteAuthor,
  addAuthor,
} from "../controllers/author-controller";
import { verifyTokenAndAuthorization } from "../middlewares/verify-token";

const router = Router();

router.post("",verifyTokenAndAuthorization, addAuthor);
router.get("/:id", getAuthor);
router.get("", getAuthors);
router.patch("/:id",verifyTokenAndAuthorization, updateAuthor);
router.delete("/:id",verifyTokenAndAuthorization, deleteAuthor);

export default router;
