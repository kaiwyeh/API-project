const express = require('express');
const { Booking, Spot, User, Review, SpotImage, Sequelize, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
 const { imageId } = req.params;
 const { user } = req;

 const findImage = await ReviewImage.findByPk(imageId);
 if (!findImage) {
  res.status(404)
  return res.json({
   message: "Review Image couldn't be found",
   statusCode: 404
  })
 }


 const findReview = await Review.findByPk(findImage.reviewId)
 if (findReview.userId === user.id) {
  await findImage.destroy()
  res.status(200);
  return res.json({
   message: "Successfully deleted",
   statusCode: 200
  })
 } else {
  await requireAuthorization(req, res, next);
 }
})




module.exports = router;
