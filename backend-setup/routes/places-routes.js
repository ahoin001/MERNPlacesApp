const express = require('express')
// Returns Router Object from express object
const router = express.Router()
// Business Logic functions
const placesControllers = require('../controller/places-controller')

/*
    Place CRUD Routes
*/

router.post('/user/createplace', placesControllers.createPlace)

router.get('/:pid', placesControllers.getPlaceById);

router.patch('/:pid', placesControllers.updatePlaceById)

router.delete('/:pid', placesControllers.deletePlaceById);

// Export Router Object that has our routes
module.exports = router