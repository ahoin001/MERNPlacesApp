const express = require('express')
// Returns Router Object from express object
const router = express.Router()

const dummyData = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516,
        },
        adress: ' 20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
]

// http://localhost:5000/api/places/
router.get('/', (req, res, next) => {

    console.log(`GET request in places`)

    res.json({ message: 'This Route works!' })

})

// http://localhost:5000/api/places/(dynamicParameter)
router.get('/:placeid', (req, res, next) => {

    console.log(`Dynamic GET request for specific place`)

    res.json(dummyData)

})



// Export Router Object that has our routes
module.exports = router