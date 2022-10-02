const express = require('express');
const { Booking, Spot, User, Review, SpotImage, Sequelize, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { DATE } = require('sequelize');

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

 //console.log(allBookings)
 let Bookings = [];
 // allBookings.forEach(spot => {                 //change
 //  Bookings.push(spot.toJSON())
 // })


 for (let i = 0; i < allBookings.length; i++) {

  let spot = allBookings[i];
  Bookings.push(spot.toJSON())
 }

 Bookings.forEach(spot => {
  spot.Spot.SpotImages.forEach(image => {
   if (image.preview) spot.Spot.preview = image.url
   if (!image.preview) spot.Spot.preview = "preview image not found"
  })
  delete spot.Spot.SpotImages
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
 // currentBooking.forEach(booking => {               //change
 //  allBookingsList.push(booking.toJSON())
 // })

 for (let i = 0; i < currentBooking.length; i++) {

  let booking = currentBooking[i];
  allBookingsList.push(booking.toJSON())
 }

 allBookingsList.forEach(booking => {
  const start = Date.parse(booking.startDate);       //current bookings'
  const end = Date.parse(booking.endDate);           //current bookings'

  if (start <= parsedStart < end && (parsedEnd <= end && parsedEnd > start)) {      //left: if new bookings' start date is between a current booking's start and end date,
   res.status(403)                                                                   //right: new bookings'end date is between a current booking's start and end date

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
  await findBooking.update({ startDate, endDate })
  return res.json(findBooking)
 }

})



router.delete('/:bookingId', requireAuth, async (req, res, next) => {


 const { user } = req;
 const { bookingId } = req.params;
 const findBooking = await Booking.findByPk(bookingId)
 //console.log('findBooking', findBooking)



 if (!findBooking) {
  res.status(404)
  return res.json({
   "message": "Booking couldn't be found",
   "statusCode": 404
  })
 }





 const today = new Date()
 const todaySeconds = Date.parse(today)
 const startDateSeconds = Date.parse(findBooking.startDate)

 if (todaySeconds > startDateSeconds) {
  await findImage.destroy()
  res.status(403)
  return res.json({
   "message": "Bookings that have been started can't be deleted",
   "statusCode": 403
  })
 }

 // console.log('findBooking.userId', findBooking.userId)
 // console.log('user.id', user.id)
 // console.log('findSpot.ownerId', findSpot.ownerId)
 const findSpot = await Spot.findByPk(findBooking.spotId)



 if (findBooking.userId === user.id || findSpot.ownerId === user.id) {
  await findBooking.destroy()
  res.status(200)
  return res.json({
   "message": "Successfully deleted",
   "statusCode": 200
  })
 } else {
  await requireAuthorization(req, res, next)
 }


})



module.exports = router;
