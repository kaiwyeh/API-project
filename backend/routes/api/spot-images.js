const express = require('express');
const { Booking, User, Spot, Review, SpotImage, ReviewImage, Sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser, requireAuthorization } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res, next) => {
 const { imageId } = req.params;
 const { user } = req;
 const findImage = await SpotImage.findByPk(imageId);



 if (!findImage) {
  res.status(404)
  return res.json({
   "message": "Spot Image couldn't be found",
   "statusCode": 404
  })
 }



 const findSpot = await Spot.findByPk(findImage.spotId)

 if (findSpot.ownerId === user.id) {
  await findImage.destroy()
  res.status(200)
  return res.json({
   "message": "Successfully deleted",
   "statusCode": 200
  })
 }

 if (findSpot.ownerId !== user.id) {
  await requireAuthorization(req, res, next);
 }
})



module.exports = router;
