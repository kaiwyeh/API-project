// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize, Booking, ReviewImage } = require('../../db/models');
const { check, query } = require('express-validator');
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






const validateAllSpotsQueries = [
 query("page")
  .optional()
  .isInt({ min: 1 })
  .withMessage("Page must be greater than or equal to 1"),
 query("size")
  .optional()
  .isInt({ min: 1 })
  .withMessage("Size must be greater than or equal to 1"),
 query("maxLat")
  .optional()
  .isDecimal()
  .withMessage("Maximum latitude is invalid"),
 query("minLat")
  .optional()
  .isDecimal()
  .withMessage("Minimum latitude is invalid"),
 query("maxLng")
  .optional()
  .isDecimal()
  .withMessage("Maximum longitude is invalid"),
 query("minLng")
  .optional()
  .isDecimal()
  .withMessage("Minimum longitude is invalid"),
 query("maxPrice")
  .optional()
  .isInt({ min: 0 })
  .withMessage("Maximum price must be greater than or equal to 0"),
 query("minPrice")
  .optional()
  .isInt({ min: 0 })
  .withMessage("Minimum price must be greater than or equal to 0"),
 handleValidationErrors
]




router.get('/', validateAllSpotsQueries, async (req, res) => {
 let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

 if (!page) page = 1;
 if (!size) size = 20;

 page = parseInt(page);
 size = parseInt(size);

 let limit = size;
 let offset = size * (page - 1);
 const where = {}

 if (maxLat) where.lat = { [Op.lte]: Number(maxLat) };
 if (minLat) where.lat = { [Op.gte]: Number(minLat) };
 if (maxLng) where.lng = { [Op.lte]: Number(maxLng) };
 if (minLng) where.lng = { [Op.gte]: Number(minLng) };
 if (maxPrice) where.price = { [Op.lte]: Number(maxPrice) };
 if (minPrice) where.price = { [Op.gte]: Number(minPrice) };

 const spotsLists = await Spot.findAll({
  limit,
  offset,
  group: ['Spot.id'],
  include: [
   {
    model: Review,
    attributes: []
   },
   {
    model: SpotImage
   }
  ]
 })

 let Spots = [];
 spotsLists.forEach(spot => {
  Spots.push(spot.toJSON())
 })

 const findAllReviews = await Review.findAll()

 Spots.forEach(spot => {

  const currentId = spot.id
  let reviews = [];
  findAllReviews.forEach(review => {
   if (review.spotId === currentId) {
    reviews.push(review.toJSON())
   }
  })
  let count = reviews.length
  let sum = 0
  reviews.forEach(review => {
   sum += review.stars
  })

  spot.avgRating = sum / count

  spot.SpotImages.forEach(image => {
   if (image.preview) {
    spot.previewImage = image.url
   }
  })
  if (!spot.previewImage) {
   spot.previewImage = 'no preview found'
  }
  delete spot.SpotImages
 })
 return res.json({ Spots, page, size })
}
);












//-----------------------------------------------
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
  delete spot.SpotImages                       //spot.SpotImage??????
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
const validateNewReview = [
 check('review')
  .exists({ checkFalsy: true })
  .withMessage("Review text is required"),
 check('stars')
  .exists({ checkFalsy: true })
  .custom((value) => value <= 5 && value >= 1)
  .withMessage("Stars must be an integer from 1 to 5"),
 handleValidationErrors
]


router.post('/:spotId/reviews', requireAuth, validateNewReview, async (req, res, next) => {
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
 // console.log('spotId', spotId)
 // console.log('userId', user.id)
 // console.log('review', newReview.id)
 // console.log('review', newReview)

 const addingNewReview = await Review.findOne({
  attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
  where: {
   spotId, userId: user.id
  }
 })

 //return res.json(addingNewReview)
 return res.json(newReview)
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
//spotid-reviews-by spot id
router.get('/:spotId/reviews', async (req, res, next) => {
 const { spotId } = req.params;
 const findSpot = await Spot.findByPk(spotId)

 if (!findSpot) {
  res.status(404);
  return res.json({
   message: "Spot couldn't be found",
   statusCode: 404
  })
 };

 const findReviews = await Review.findAll({
  where: { spotId },
  include: [
   {
    model: User,
    attributes: ["id", "firstName", "lastName"]
   },
   {
    model: ReviewImage,
    attributes: ["id", "url"]
   },
  ]
 })
 return res.json({ findReviews })
})





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


router.post('/:spotId/bookings', async (req, res, next) => {

 const { user } = req;
 const { spotId } = req.params;
 const { startDate, endDate } = req.body
 console.log(startDate)
 console.log(endDate)

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

 for (let i = 0; i < allBookingsList.length; i++) {
  const start = Date.parse(allBookingsList[i].startDate)
  const end = Date.parse(allBookingsList[i].endDate)


  if ((start <= parsedStart < end) && (parsedEnd <= end && parsedEnd > start)) {
   res.status(403);
   return res.json({
    message: "Sorry, this spot is already booked for the specified dates",
    statusCode: 403,
    errors: {
     "startDate": "Start date conflicts with an existing booking",
     "endDate": "End date conflicts with an existing booking"
    }
   })
   return;
  }

  // if (start === null || end === null || parsedStart === null || parsedEnd === null) {
  //  res.status(400);
  //  return res.json({
  //   "message": "Validation error",
  //   "statusCode": 400,
  //   "errors": {
  //    "endDate": "endDate cannot be on or before startDate"
  //   }
  //  })
  // }

 }



 const addBooking = await Booking.create({ spotId, userId: user.id, startDate, endDate })
 console.log('startDate', addBooking.startDate)
 console.log('endDate', addBooking.endDate)

 return res.json(addBooking)





 // allBookingsList.forEach(booking => {
 //  const start = Date.parse(booking.startDate)
 //  const end = Date.parse(booking.endDate)


 //  if (start <= parsedStart < end && (parsedEnd <= end && parsedEnd > start)) {
 //   res.status(403);
 //   return res.json({
 //    message: "Sorry, this spot is already booked for the specified dates",
 //    statusCode: 403,
 //    errors: {
 //     "startDate": "Start date conflicts with an existing booking",
 //     "endDate": "End date conflicts with an existing booking"
 //    }
 //   })
 //  }
 // })

})


module.exports = router;
