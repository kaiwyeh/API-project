// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNewSpot = [
 check('address')
  .exists({ checkFalsy: true })
  .withMessage("Street address is required"),
 check('city')
  .exists({ checkFalsy: true })
  .withMessage("City is required"),
 check('state')
  .exists({ checkFalsy: true })
  .withMessage("State is required"),
 check('country')
  .exists({ checkFalsy: true })
  .withMessage("Country is required"),
 check('lat')
  .exists({ checkFalsy: true })
  .isLength({ min: 2 })
  .withMessage("Latitude is not valid"),
 check('lng')
  .exists({ checkFalsy: true })
  .isLength({ min: 2 })
  .withMessage("Longitude is not valid"),
 check('name')
  .exists({ checkFalsy: true })
  .isLength({ min: 50 })
  .withMessage("Name must be less than 50 characters"),
 check('description')
  .exists({ checkFalsy: true })
  .withMessage("Description is required"),
 check('price')
  .exists({ checkFalsy: true })
  .withMessage("Price per day is required"),
 handleValidationErrors
];



router.get(
 '/', async (req, res) => {

  const spotsLists = await Spot.findAll({
   attributes: {
    include: [
     [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
    ]
   },
   group: ['Spot.id', 'SpotImages.id'], //need more info
   include: [
    {
     model: SpotImage,
    },
    {
     model: Review,
     attributes: []
    }],
  });

  let Spots = [];
  spotsLists.forEach(spot => {
   Spots.push(spot.toJSON())
  })

  Spots.forEach(spot => {
   spot.SpotImages.forEach(image => {
    if (image.preview === true) {
     spot.previewImage = image.url
    }
   })
   if (!spot.previewImage) {
    spot.previewImage = 'no preview image'
   }
   delete spot.SpotImages
  })

  return res.json({ Spots })
 }
);





// router.get('/', async (req, res) => {

//  const allSpots = await Spot.findAll({
//   attributes: {
//    include: [
//     [Sequelize.fn("AVG", Sequelize.col("starts")), "avgRating"],
//    ]
//   },
//   group: ['Spot.id', 'SpotImages.id'],
//   include: [
//    {
//     model: Review,
//     attributes: []
//    },
//    {
//     model: SpotImage
//    }
//   ]
//  });

//  let spotList = [];
//  allSpots.forEach(spot => {
//   spotList.push(spot.toJSON())
//  })

//  spotList.forEach(spot => {
//   spot.SpotImage.forEach(image => {
//    if (Image.preview === true) {
//     spot.previewImage = image.url
//    }
//   })
//   if (!spot.previewImage) {
//    spot.previewImage = 'no image'
//   }
//   delete spot.SpotImages
//  })
//  return res.json({
//   spotList
//  });
// }
// );











// router.post('/',
//  async (req, res, next) => {
//   const { credential, password } = req.body;

//   const user = await User.login({ credential, password });

//   if (!user) {
//    const err = new Error('Login failed');
//    err.status = 401;
//    err.title = 'Login failed';
//    err.errors = ['The provided credentials were invalid.'];
//    return next(err);
//   }

//   await setTokenCookie(res, user);

//   return res.json({
//    user
//   });
//  }
// );

// router.delete(
//  '/',
//  (_req, res) => {
//   res.clearCookie('token');
//   return res.json({ message: 'success' });
//  }
// );

// router.get(
//  '/',
//  restoreUser,
//  (req, res) => {
//   const { user } = req;
//   if (user) {
//    return res.json({
//     user: user.toSafeObject()
//    });
//   } else return res.json({});
//  }
// );



module.exports = router;
