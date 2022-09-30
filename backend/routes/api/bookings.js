const express = require('express');
const { Booking, Spot, User, Review, SpotImage, Sequelize, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const router = express.Router();




router.get(
 '/current', requireAuth, async (req, res, next) => {
  const { user } = req;

  const BookingsAll = await Booking.findAll({
   where: { userId: user.id },
   include: [
    {
     model: Spot,
     attributes: {
      exclude: ["description", "createdAt", "updatedAt"]
     },
     include: [
      {
       model: SpotImage
      }
     ]
    }
   ]
  })

  let Bookings = [];
  BookingsAll.forEach(spot => {
   Bookings.push(spot.toJSON())
  })

  Bookings.forEach(spot => {
   spot.Spot.SpotImages.forEach(image => {
    if (image.preview === true) {
     spot.Spot.previewImage = image.url
    }
    if (image.preview === false) {
     spot.Spot.previewImage = 'no preview image'
    }
   })
   delete spot.Spot.SpotImages
  })
  res.json({ Bookings })
 })



module.exports = router;
