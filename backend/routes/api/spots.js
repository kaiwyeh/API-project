// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize, Booking } = require('../../db/models');
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


 return res.json({ Spots });
}
);


//--------------------------------------

router.get('/:spotId', async (req, res, next) => {

 const { spotId } = req.params
 const findSpots = await Spot.findByPk(spotId, {
  attributes: {
   include: [
    //[Sequelize.fn("COUNT", Sequelize.col("review")), "numReviews"],
    [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"]
   ]
  },
  include: [
   {
    model: Review,
    attributes: []
   },
   {
    model: SpotImage,
    attributes: ["id", "url", "preview"]
   },
   // {
   //  model: User
   // }
  ],
  group: ['Spot.id', 'SpotImages.id'],    // MOVE TO HERE!!!
 });
 //console.log(findSpots)
 // if (findSpots.id === null)
 if (!findSpots) {
  res.status(404);
  return res.json({
   message: "Spot couldn't be found",
   statusCode: 404
  })
 };

 const Owner = await User.findOne({
  where: {
   id: findSpots.ownerId
  },
  attributes: ["id", "firstName", "lastName"]
 })

 let spotsWithOwner = [];
 spotsWithOwner.push(findSpots.toJSON())

 const allReviews = await Review.findAll()

 spotsWithOwner.forEach(spot => {
  let reviews = []
  allReviews.forEach(review => {
   if (review.spotId === spot.id) {
    reviews.push(review.toJSON())
   }
  })
  let count = reviews.length
  spot.numReviews = count
  spot.Owner = Owner
  delete spot.User
 })

 return res.json(spotsWithOwner[0]);
}
);

//---------------------------------------


router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
 const { user } = req;
 const { spotId } = req.params;
 const { address, city, state, country, lat, lng, name, description, price } = req.body
 const findSpot = await Spot.findByPk(spotId)

 if (!findSpot) {
  res.status(404);
  return res.json({
   message: "Spot couldn't be found",
   statusCode: 404
  })
 };

 if (findSpot.ownerId === user.id) {
  await findSpot.update({ address, city, state, country, lat, lng, name, description, price })

  return res.json({
   findSpot
  })
 } else {
  await requireAuthorization(req, res, next);
 }
}
);

//-----------------------------------------
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
 const { user } = req;
 const { spotId } = req.params;
 const { review, stars } = req.body;

 const findSpot = await Spot.findByPk(spotId)
 const findReview = await Review.findOne({
  where: { spotId, userId: user.id }
 })

 if (!findSpot) {
  res.status(404);
  return res.json({
   message: "Spot couldn't be found",
   statusCode: 404
  })
 };

 if (findReview) {
  res.status(403);
  return res.json({
   message: "User already has a review for this spot",
   statusCode: 403
  })
 };

 const newReview = await Review.create({
  spotId,
  userId: user.id,
  review,
  stars
 })

 const addingNewReview = await Review.findOne({
  attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
  where: {
   spotId, userId: user.id
  }
 })

 return res.json(addingNewReview)
})



//------------------------------------------
router.delete('/:spotId', requireAuth, async (req, res, next) => {
 const { spotId } = req.params;
 const { user } = req;
 const findSpot = await Spot.findByPk(spotId);

 if (!findSpot) {
  res.status(404);
  return res.json({
   message: "Spot couldn't be found",
   statusCode: 404
  })
 };

 if (findSpot.id === user.id) {
  await findSpot.destroy();
  res.status(200);
  return res.json({
   message: "Successfully deleted",
   statusCode: 200
  })
 };


})

//-----------------------
//spotid-reviews







//-------
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

 const { user } = req;
 const { spotId } = req.params;

 const findSpot = await Spot.findByPk(spotId)

 if (!findSpot) {
  res.status(404);
  return res.json({
   message: "Spot couldn't be found",
   statusCode: 404
  })
 };

 if (findSpot.ownerId !== user.id) {
  const Bookings = await Booking.findAll({
   attributes: ["spotId", "startDate", "endDate"],
   where: { spotId },
  })
  return res.json({ Bookings })
 }

 if (findSpot.ownerId === user.id) {
  const Bookings = await Booking.findAll({
   where: { spotId },
   include: [
    {
     model: User,
     attributes: ["id", "firstName", "lastName"]
    }
   ]
  })
  return res.json({ Bookings })
 }

})


router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {

 const { user } = req;
 const { spotId } = req.params;
 const { startDate, endDate } = req.body

 const findSpot = await Spot.findByPk(spotId)

 if (!findSpot) {
  res.status(404);
  return res.json({
   message: "Spot couldn't be found",
   statusCode: 404
  })
 };

 const parsedStart = Date.parse(startDate)
 const parsedEnd = Date.parse(endDate)

 if (parsedEnd <= parsedStart) {
  res.status(400)
  return res.json({
   message: "Validation error",
   statusCode: 400,
   endDate: "endDate cannot be on or before startDate"
  })
 }


 const allcurrentBooking = await Booking.findAll({ where: { spotId } })

 let allBookingsList = [];
 allcurrentBooking.forEach(booking => {
  allBookingsList.push(booking.toJSON())
 })

 allBookingsList.forEach(booking => {
  const start = Date.parse(booking.startDate)
  const end = Date.parse(booking.endDate)


  if (start <= parsedStart < end && (parsedEnd <= end && parsedEnd > start)) {
   res.status(403);
   return res.json({
    message: "Sorry, this spot is already booked for the specified dates",
    statusCode: 403,
    errors: {
     "startDate": "Start date conflicts with an existing booking",
     "endDate": "End date conflicts with an existing booking"
    }
   })
  }
 })

 const addBooking = await Booking.create({ spotId, userId: user.id, startDate, endDate })
 return res.json(addBooking)
})


module.exports = router;
