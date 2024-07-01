import { check, ValidationChain } from "express-validator";

export const BookValidator: ValidationChain[] = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .matches(/^[a-zA-Z ]*$/)
    .withMessage("Only characters with white space are allowed"),
  check("availableCopies")
    .notEmpty()
    .withMessage("Available copies are required")
    .isInt({ min: 0 })
    .withMessage("Available copies must be a non-negative integer"),
];

export const AuthorValidator: ValidationChain[] = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[a-zA-Z ]*$/)
    .withMessage("Only characters with white space are allowed"),
  check("bio")
    .trim()
    .notEmpty()
    .withMessage("Bio is required"),
  check("birthdate")
    .trim()
    .notEmpty()
    .withMessage("Birthdate is required")
    .isISO8601()
    .withMessage("Must be a valid date in ISO 8601 format"),
];

export const RecordValidator: ValidationChain[] = [
  check("borrower")
    .trim()
    .notEmpty()
    .withMessage("Borrower is required")
    .matches(/^[a-zA-Z ]*$/)
    .withMessage("Only characters with white space are allowed"),
  check("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .isInt({ min: 0 })
    .withMessage("Book ID must be a non-negative integer"),
  check("borrowDate")
    .trim()
    .notEmpty()
    .withMessage("Borrow date is required")
    .isISO8601()
    .withMessage("Must be a valid date in ISO 8601 format"),
  check("returnDate")
    .trim()
    .notEmpty()
    .withMessage("Return date is required")
    .isISO8601()
    .withMessage("Must be a valid date in ISO 8601 format"),
];

export const SignupValidator: ValidationChain[] = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email."),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 5 })
    .withMessage("password must be minimum 5 length")
    .matches(/(?=.*?[A-Z])/)
    .withMessage("At least one Uppercase")
    .matches(/(?=.*?[a-z])/)
    .withMessage("At least one Lowercase")
    .matches(/(?=.*?[0-9])/)
    .withMessage("At least one Number")
    .matches(/(?=.*?[#?!@$%^&*-])/)
    .withMessage("At least one special character")
    .not()
    .matches(/^$|\s+/)
    .withMessage("White space not allowed"),
];

