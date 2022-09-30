const express = require('express');
const { Booking, Spot, User, Review, SpotImage, Sequelize, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const router = express.Router();




router.get('/current', requireAuth, async (req, res, next) => {

 const { user } = req;

 const allBookings = await Booking.findAll({
  where: {
   userId: user.id
  },
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
 allBookings.forEach(spot => {
  Bookings.push(spot.toJSON())
 })


 Bookings.forEach(spot => {
  spot.Spot.SpotImage.forEach(image => {
   if (image.preview) spot.Spot.preview = image.url
   if (!image.preview) spot.Spot.preview = "preview image not found"
  })
  delete spot.Spot.SpotImage
 })
 res.json({
  Bookings
 })
})

//-------------
router.put('/:bookingId', requireAuth, async (req, res, next) => {
 const { user } = req;
 const { startDate, endDate } = req.body;
 const { bookingId } = req.params;
 const findBooking = await Booking.findByPk(bookingId)

 if (!findBooking) {
  res.status(404)
  return res.json({
   "message": "Booking couldn't be found",
   "statusCode": 404
  })
 }

 const parsedStart = Date.parse(startDate)
 const parsedEnd = Date.parse(endDate)
 if (parsedEnd <= parsedStart) {
  res.status(400)
  return res.json({
   "message": "Validation error",
   "statusCode": 400,
   "errors": {
    "endDate": "endDate cannot come before startDate"
   }
  })
 }

 const today = new Date()
 const parsedToday = Date.parse(today)
 const oldEndDate = Date.parse(findBooking.endDate)
 if (parsedToday > oldEndDate) {
  res.status(403)
  return res.json({
   "message": "Past bookings can't be modified",
   "statusCode": 403
  })
 }

 const currentBooking = await Booking.findAll({
  where: {
   spotId: findBooking.spotId
  }
 })

 let allBookingsList = [];
 currentBooking.forEach(booking => {

  allBookingsList.push(booking.toJSON())
 })

 allBookingsList.forEach(booking => {
  const start = Date.parse(booking.startDate);
  const end = Date.parse(booking.endDate);

  if (start <= parsedStart < end && (parsedEnd <= end && parsedEnd > start)) {
   res.status(403)

   return res.json({
    "message": "Sorry, this spot is already booked for the specified dates",
    "statusCode": 403,
    "errors": {
     "startDate": "Start date conflicts with an existing booking",
     "endDate": "End date conflicts with an existing booking"
    }
   })
  }
 })
 if (findBooking.userId = user.id) {
  await booking.update({ startDate, endDate })
  return res.json(findBooking)
 }

})

module.exports = router;
