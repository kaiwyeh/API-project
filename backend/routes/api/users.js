const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
 check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Please provide a valid email.'),
 check('username')
  .exists({ checkFalsy: true })
  .isLength({ min: 4 })
  .withMessage('Please provide a username with at least 4 characters.'),
 check('firstName')
  .exists({ checkFalsy: true })
  .isLength({ min: 2 })
  .withMessage('Please provide a firstname with at least 2 characters.'),
 check('lastName')
  .exists({ checkFalsy: true })
  .isLength({ min: 2 })
  .withMessage('Please provide a lastname with at least 2 characters.'),
 check('username')
  .not()
  .isEmail()
  .withMessage('Username cannot be an email.'),
 check('password')
  .exists({ checkFalsy: true })
  .isLength({ min: 6 })
  .withMessage('Password must be 6 characters or more.'),
 handleValidationErrors
];

// Sign up    //phase 5
router.post('/', validateSignup, async (req, res, next) => {
 const { email, password, username, firstName, lastName } = req.body;
 //console.log('THIS IS FIRSTNAME, LASTNAME', firstName, lastName, req.body)

 const findExistEmail = await User.findOne({
  where: { email }
 })

 if (findExistEmail) {
  res.status(403)
  return res.json({
   "message": "User already exists",
   "statusCode": 403,
   "errors": {
    "email": "User with that email already exists"
   }
  })
 }



 const findExistUsername = await User.findOne({
  where: { username }
 });

 if (findExistUsername) {
  res.status(403)
  return res.json({
   "message": "User already exists",
   "statusCode": 403,
   "errors": {
    "username": "User with that username already exists"
   }
  })
 }



 const user = await User.signup({ email, username, password, firstName, lastName });
 let token = await setTokenCookie(res, user);

 return res.json({
  id: user.id,
  firstName,
  lastName,
  email,
  username,
  token
 });
}
);


























module.exports = router;






































// backend/routes/api/users.js
// ...

// Sign up
// router.post(
//  '/',
//  async (req, res) => {
//   const { email, password, username } = req.body;
//   const user = await User.signup({ email, username, password });

//   await setTokenCookie(res, user);

//   return res.json({
//    user
//   });
//  }
// );
