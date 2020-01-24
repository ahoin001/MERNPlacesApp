const express = require('express')
// Returns Router Object from express object
const router = express.Router()

// Business Logic functions
const placesControllers = require('../controller/places-controller')



/*
    Return place matching place id
*/
// http://localhost:5000/api/places/(dynamicParameter)
// Import controller functions to keep this file slim (seperate concerns)
router.get('/:pid', placesControllers.getPlaceById);

/*
    Return places matching userID
*/
router.get('/user/:uid', placesControllers.getPlaceByUserId);

router.post('/user/createplace',placesControllers.createPlace)



// Export Router Object that has our routes
module.exports = router