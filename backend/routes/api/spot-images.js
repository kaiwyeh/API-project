const express = require('express');
const { Booking, Spot, User, Review, SpotImage, Sequelize, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const router = express.Router();












module.exports = router;
