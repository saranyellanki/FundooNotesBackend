import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as mailer from '../middlewares/nodemailer';
import { sender } from '../config/rabbitmq';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const salt = await bcrypt.genSalt(10);
  body.password = await bcrypt.hash(body.password, salt);
  const data = await User.create(body);
  sender(data);
  return data;
};

// export const newUser = (body, registration) => {
//   const saltRounds = 10
//   bcrypt.genSalt(saltRounds, function (err, salt) {
//     if (err) {
//       registration(err, null);
//     } else {
//       bcrypt.hash(body.password, salt, function (err, hash) {
//         if (err) {
//           registration(err, null);
//         } else {
//           body.password = hash
//           User.create(body, (error, data) => {
//             if (error) {
//               registration(error, null);
//             } else {
//               registration(null, data);
//             }
//           })
//         }
//       })
//     }
//   })
// }

//login a user
export const login = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user == null) {
    throw new Error("User does not exist");
  } else {
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      let token = jwt.sign({ id: user._id}, 'secretKey');
      return { user, token };
    } else {
      throw new Error("Not a Valid Password");
    }
  }
};

// export const login = (body) => {
//   return new Promise((resolve, reject) => {
//     User.findOne({ email: body.email })
//       .then((user) => {
//         bcrypt.compare(body.password, user.password)
//           .then((validPassword) => {
//             if (validPassword) {
//               let token = jwt.sign({ id: user._id }, 'secretKey');
//               return resolve({ user, token });
//             } else {
//               return reject("Not a valid password")
//             }
//           }).catch((err) => {
//             return err;
//           })
//       }).catch(() => {
//         return reject("No email exists")
//       });
//   })
// }


export const forgetPassword = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user == null) {
    throw new Error("User does not exist");
  } else {
    let token = jwt.sign({ id: user._id }, 'newSecretKey');
    await mailer.main(user.email, token);
    return token;
  }
}

export const resetPassword = async (req) => {
  const genSalt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, genSalt);
  const user = User.findByIdAndUpdate({ _id: req.body.userId },
    {
      $set: {
        password: newPassword
      }
    }, { new: true })
  return user;
}

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};