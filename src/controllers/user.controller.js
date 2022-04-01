import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// export const newUser = (req, res, next) => {
//   try {
//     UserService.newUser(req.body, (err, data) => {
//       if (err) {
//         throw err;
//       } else {
//         res.status(HttpStatus.CREATED).json({
//           code: HttpStatus.CREATED,
//           data: data,
//           message: 'User created successfully'
//         });
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * Controller to login a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const login =  async (req, res, next) => {
  try {
    const data = await UserService.login(req.body)
    res.status(HttpStatus.OK).json({
      message: "Login Successfull",
      data : data
    })
  } catch (error) {
    next(error);
  }
}

// export const login = (req, res, next) => {
//   try {
//     UserService.login(req.body)
//     .then((data) => {
//       res.status(HttpStatus.OK).json({
//         message: "Login Successfull",
//         data: data
//       })
//     }).catch((err) => {
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//         ERROR: "Error",
//         data: err
//       })
//     })
//   }
//   catch(err) {
//     next(err)
//   }
// }

export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body)
    res.status(HttpStatus.OK).json({
      token: data
    })
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req);
    res.status(HttpStatus.OK).json({
      message: "Password reset",
      data: data
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};