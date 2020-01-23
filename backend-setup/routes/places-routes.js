const express = require('express')
// Returns Router Object from express object
const router = express.Router()

const placesList = [
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
    },
    {
        id: 'p2',
        title: 'Empire ',
        description: 'One of the most scary places in the world!',
        location: {
            lat: 99.2415474,
            lng: -13.9501516,
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

/*
    Return place matching place id
*/
// http://localhost:5000/api/places/(dynamicParameter)
router.get('/:pid', (req, res, next) => {

    // Extract parameter from request
    const pid = req.params.pid // {pid : dynamicParam}

    // finds/returns 1st element in array that satisfies our condition
    const place = placesList.find(p => {
        console.log(p)
        return p.id === pid
    })

    // if place could not be found ( place is undefined) return a 404 error
    if (!place) {
        res.status(404).json({ message: "Could not find place matching place ID" })
    } else {

        res.json({ place }) // {place} => {place: place}

    }


})

/*
    Return places matching userID
*/
router.get('/user/:uid', (req, res, next) => {

    const uid = req.params.uid

    // array of places matching userid
    const places = placesList.filter(place => place.creator === uid);

    res.json({ places })

})



// Export Router Object that has our routes
module.exports = router