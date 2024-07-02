import { RequestHandler } from "express";
import moment from "moment";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import { validationResult } from "express-validator";

import {
  findAllBorrowRecords,
  findBorrowRecordById,
  createBorrowRecord,
  updateBorrowRecordById,
  deleteBorrowRecordById,
} from "../services/borrow-record-service";

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const addBorrowRecord: RequestHandler = async (req, res, next) => {
  const { bookId, borrower, borrowDate, returnDate } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const payload = {
      borrower: borrower as string,
      bookId: bookId as number,
      borrowDate: moment(borrowDate as string).toDate(),
      returnDate: moment(returnDate as string).toDate(),
    };

    const createdBorrowRecord = await createBorrowRecord(payload);
    console.log("Created borrow record yes...", createdBorrowRecord);

    if (!createdBorrowRecord) {
      return next(
        new BaseError(
          "Failed to create borrow record",
          httpStatusCodes.INTERNAL_SERVER
        )
      );
    }

    const { createdAt, updatedAt, ...others } = createdBorrowRecord;

    res.status(httpStatusCodes.CREATED).json({
      status: "success",
      msg: "Borrow Record Added!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const getBorrowRecords: RequestHandler = async (req, res, next) => {
  try {
    const borrowRecords = await findAllBorrowRecords();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Borrow List!.",
      data: borrowRecords,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const getBorrowRecord: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const borrowRecord = await findBorrowRecordById(Number(id));
    console.log("This is the found borrow record....", borrowRecord);

    if (!borrowRecord) {
      return next(
        new BaseError("Record does not exist.", httpStatusCodes.NOT_FOUND)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Borrow record info!.",
      data: borrowRecord,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const updateBorrowRecord: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { bookId, borrower, borrowDate, returnDate } = req.body;

  try {
    const foundBorrowRecord = await findBorrowRecordById(Number(id));
    console.log("This is found borrow record....", foundBorrowRecord);

    const payload = {
      borrower: borrower as string,
      bookId: bookId as number,
      borrowDate: moment(borrowDate as string).toDate(),
      returnDate: moment(returnDate as string).toDate(),
    };

    const updatedBorrowRecord = await updateBorrowRecordById(
      Number(id),
      payload
    );
    console.log("Updated category yes...", updatedBorrowRecord);

    if (!updatedBorrowRecord) {
      throw new BaseError(
        "Failed to update borrow record",
        httpStatusCodes.INTERNAL_SERVER
      );
    }
    const {
      id: borrowId,
      createdAt,
      updatedAt,
      ...others
    } = updatedBorrowRecord;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Borrow record updated!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const deleteBorrowRecord: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteBorrowRecordById(Number(id));

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Borrow record deleted.",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
