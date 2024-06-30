import { Router } from "express";
import {
  addBorrowRecord,
  getBorrowRecord,
  getBorrowRecords,
  updateBorrowRecord,
  deleteBorrowRecord,
} from "../controllers/borrow-record-controller";
import { verifyTokenAndAuthorization } from "../middlewares/verify-token";

const router = Router();

router.post("", verifyTokenAndAuthorization, addBorrowRecord);
router.get("/:id", getBorrowRecord);
router.get("", getBorrowRecords);
router.patch("/:id", verifyTokenAndAuthorization, updateBorrowRecord);
router.delete("/:id", verifyTokenAndAuthorization, deleteBorrowRecord);

export default router;
