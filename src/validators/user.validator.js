import Joi from '@hapi/joi';
// import { body, validationResult } from 'express-validator';

export const newUserValidator = (req, res, next) => {
    const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds:{ allow: ['com','net']}}),
    password: Joi.string().min(6).max(10).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
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
