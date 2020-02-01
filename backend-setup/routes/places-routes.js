const express = require('express')
// Returns Router Object from express object
const router = express.Router()

// Import specific middleware from package 
const { check } = require('express-validator')
// Business Logic functions
const placesControllers = require('../controller/places-controller')

/*
    Place CRUD Routes
*/

router.get('/:pid', placesControllers.getPlaceById);

// Add validation checks on request
router.post('/createplace',
    [check('title')
        .not()
        .isEmpty(),
    check('description')
        .isLength({ min: 5 }),
    check('adress')
        .not()
        .isEmpty()
    ], placesControllers.createPlace)

router.patch('/:pid',
    [check('title')
        .not()
        .isEmpty(),
    check('description')
        .isLength({ min: 5 })
    ], placesControllers.updatePlaceById)

router.delete('/:pid', placesControllers.deletePlaceById);
// Export Router Object that has our routes
module.exports = router