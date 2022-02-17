import express from 'express';
import * as userController from '../controllers/user.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();

//route to create a new user
router.post('/register', newUserValidator, userController.newUser);

//route to login user
router.post('/login',userController.login);

//route to forgetPassword
router.post('/forgetPassword', userController.forgetPassword);

//route to reset password
router.put('/resetPassword', userAuth,userController.resetPassword);

export default router;
