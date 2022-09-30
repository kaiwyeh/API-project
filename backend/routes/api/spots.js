// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

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
  .isLength({ max: 50 })
  .withMessage("Name must be less than 50 characters"),
 check('description')
  .exists({ checkFalsy: true })
  .withMessage("Description is required"),
 check('price')
  .exists({ checkFalsy: true })
  .withMessage("Price per day is required"),
 handleValidationErrors
];



router.get('/', async (req, res) => {

 const allSpots = await Spot.findAll({
  attributes: {
   include: [
    [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
   ]
  },
  group: ['Spot.id', 'SpotImages.id'],
  include: [
   {
    model: Review,
    attributes: []
   },
   {
    model: SpotImage
   }
  ]
 });

 let Spots = [];
 allSpots.forEach(spot => {
  Spots.push(spot.toJSON())
 })

 Spots.forEach(spot => {
  spot.SpotImages.forEach(image => {
   if (image.preview) {
    spot.previewImage = image.url
   }
  })
  if (!spot.previewImage) {
   spot.previewImage = 'no image found'
  }
  delete spot.SpotImages
 })
 return res.json({
  Spots
 });
}
);

//------------------------

router.post('/', requireAuth, validateNewSpot, async (req, res, next) => {
 const { user } = req;
 const { address, city, state, country, lat, lng, name, description, price } = req.body
 const findExistAddresses = await Spot.findAll({
  where: { address }
 });

 if (findExistAddresses) {
  findExistAddresses.forEach(oldAddress => {
   if (oldAddress.city === city) {
    res.status(400);

    return res.json({
     message: "Spot cannot be created - address already exists",
     statusCode: 400
    })
   }
  })
 }


 const newSpot = await Spot.create({
  ownerId: user.id, address, city, state, country, lat, lng, name, description, price
 });

 res.status(201)
 return res.json(newSpot)
}
);


//---------------------------------

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
 const { spotId } = req.params;
 const findSpot = await Spot.findByPk(spotId)

 const { url, preview } = req.body;
 const { user } = req;

 if (!findSpot) {
  res.status(404);
  return res.json({
   message: "Spot couldn't be found",
   statusCode: 404
  })
 };

 if (findSpot.ownerId === user.id) {
  const addedImage = await SpotImage.create({ spotId, url, preview })

  return res.json({
   id: addedImage.id,
   url,
   preview
  })
 } else {
  await requireAuthorization(req, res, next);
 }
}
);

//----------------------------------


router.get('/current', requireAuth, async (req, res, next) => {

 const { user } = req
 const allSpots = await Spot.findAll({
  attributes: {
   include: [
    [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
   ]
  },
  where: { ownerId: user.id },
  group: ['Spot.id', 'SpotImages.id'],
  include: [
   {
    model: Review,
    attributes: []
   },
   {
    model: SpotImage
   }
  ]
 });

 let Spots = [];
 allSpots.forEach(spot => {
  Spots.push(spot.toJSON())
 })

 Spots.forEach(spot => {
  spot.SpotImages.forEach(image => {
   if (image.preview) {
    spot.previewImage = image.url
   }
  })
  if (!spot.previewImage) {
   spot.previewImage = 'no image found'
  }
  delete spot.SpotImages
 })


 return res.json({
  Spots
 });
}
);


//--------------------------------------



















module.exports = router;
