import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const auth = async (req, res, next) => {
  try {
    let bearerToken = req.headers['token']; //req.header('Authorization')
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Token is required'
      };
    jwt.verify(bearerToken, 'secretKey', (err, decoded) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({ 
          message: 'Not Authenticated' 
        });
      } else {
        req.body['userId'] = decoded.id;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.headers['token'];
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Token is required'
      };
    jwt.verify(bearerToken, 'newSecretKey', (err, decoded) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({ 
          message: 'Not Authenticated' 
        });
      } else {
        req.body['userId'] = decoded.id;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};