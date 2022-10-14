// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// backend/routes/api/session.js   //phase 5
// ...
const { check, cookie } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

// backend/routes/api/session.js    //phase 5
// ...

const validateLogin = [
 check('credential')
  .exists({ checkFalsy: true })
  .notEmpty()
  .withMessage("Email or username is required"),
 check('password')
  .exists({ checkFalsy: true })
  .withMessage("Password is required"),
 handleValidationErrors
];

// backend/routes/api/session.js   //phase 5
// ...

// Log in
router.post(
 '/',
 validateLogin,
 async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
   res.status(401)
   return res.json({
    "message": "Invalid credentials",
    "statusCode": 401
   })
  }

  let token = await setTokenCookie(res, user);

  return res.json({
   id: user.id,
   firstName: user.firstName,
   lastName: user.lastName,
   email: user.email,
   username: user.username,
   token
  });
 }
);



// Log out
router.delete(
 '/',
 (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
 }
);


// Restore session user
router.get(
 '/',
 (req, res, next) => {
  const { user } = req;
  if (user) {
   res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username
   })
  } else { res.json(null) }
 }
);




module.exports = router;
