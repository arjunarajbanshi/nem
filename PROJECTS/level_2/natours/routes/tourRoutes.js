const express = require('express');
const { createTour, getAllTours, getTourByID, updateTour, deleteTour } = require('../controllers/toursController');

const router = express.Router();

router
    .route('/')
    .post(createTour)
    .get(getAllTours)

router.route('/:id')
    .get(getTourByID)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router