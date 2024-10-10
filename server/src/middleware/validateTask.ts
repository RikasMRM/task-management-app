import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

export const validateTaskRules: ValidationChain[] = [
  body("title").notEmpty().withMessage("Title is required"),
  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
  body("due_date").isISO8601().withMessage("Invalid date format"),
];

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};
