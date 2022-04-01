import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';
// import { body, validationResult } from 'express-validator';

export const newUserValidator = (req, res, next) => {
    const schema = Joi.object({
    firstName: Joi.string().min(3).required().messages({
      "string.base": "firstName should be a type of String",
      "string.empty": "firstName cannot be an empty field",
      "string.min": "firstName should have a minimum length of {#limit}",
    }),
    lastName: Joi.string().min(3).required().messages({
      "string.base": "lastName should be a type of String",
      "string.empty": "lastName cannot be an empty field",
      "string.min": "lastName should have a minimum length of {#limit}",
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds:{ allow: ['com','net']}}).messages({
      "string.base": "email should be a type of String",
      "string.email": "email should be valid email with .com or .net",
      "string.empty": "email cannot be an empty field",
    }),
    password: Joi.string().min(6).max(10).required().messages({
      "string.base": "password should be a type of String",
      "string.empty": "password cannot be an empty field",
      "string.min": "password should have a minimum length of {#limit}",
      "string.max": "password should have a maximum length of {#limit}"
    })
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      Error: `${error}`
    })
    // next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

// export const newUserValidator = ( req, res, next) => {

//   console.log(req);
//     req.check.body('firstName')
//     .isAlpha()
//     .withMessage("firstName is required")
//     .isLength({ min: 3 })
//     .withMessage("Min 3 alphabet required in FirstName"),

  
//     req.check.body('lastName')
//     .isAlpha()
//     .withMessage("lastName is required")
//     .isLength({ min: 3 })
//     .withMessage("Min 3 alphabet required in LastName"),

//     req.check.body('email').isEmail().withMessage("Email is not valid"),

//     req.check.body('password')
//     .isLength({ min: 3 })
//     .withMessage("Min 3 alphabet required")
//     .isLength({ max: 10 })
//     .withMessage("Max 10 alphabet allowed in password")

//   let errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }else {
//     next();
//   }
// };
