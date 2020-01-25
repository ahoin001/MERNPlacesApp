// Controller files are intended to hold logic and focus on middleware functions to be used in routes

// Generates Unique Id
const uuid = require('uuid/v4')

// We created this class to not repeat code for creating errors to send to appj.js error handler
const HttpError = require('../models/http-error')

let placesList = [
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

const createPlace = (req, res, next) => {

    // These are the properties to extract from req/body
    const { title, description, coordinates, adress, creator } = req.body

    const createdPlace = {

        id: uuid(),
        // If property and value have same name it can write it once {title : title} = title
        title,
        description,
        location: coordinates,
        adress,
        creator

    };

    placesList.push(createdPlace)

    // prepares header in response
    res.status(200).json({ place: createdPlace })

}

const getPlaceById = (req, res, next) => {

    // Extract parameter from request
    const pid = req.params.pid // {pid : dynamicParam}

    // finds/returns 1st element in array that satisfies our condition
    const place = placesList.find(p => {
        return p.id === pid
    })

    // if place could not be found ( place is undefined) return a 404 error
    // throws error that will trigger error handling middleware in app.js
    if (!place) {

        // throw need'nt return because it cancels excecution already
        // Our custom class recieves a custom message and an error code
        throw new HttpError('Could not find a place for the provided id', 404);

    }

    res.json(place)

}

const getPlaceByUserId = (req, res, next) => {


    const uid = req.params.uid

    // array of places matching userid
    const places = placesList.filter(place => place.creator === uid);

    // if places could not be found return a 404 error
    // next(error) will pass error to next middleware
    if (places.length === 0) {

        // next Is returned so code after doesn't run
        return next(
            new HttpError('Could not any places for the provided user id', 404)
        );

    }

    res.json(places)

}


const updatePlaceById = (req, res, next) => {

    // Get the values we want to use for change
    const { title, description } = req.body

    const placeId = req.params.pid

    // Create a copy of the place we want to update / Good practice to only update once knowing the update has a usable back up 
    const updatedPlace = { ...placesList.find(p => p.id === placeId) }

    // Make changes with new values
    updatedPlace.title = title;
    updatedPlace.description = description;

    // Find where the place we want to update is
    const placeIndex = placesList.findIndex(p => p.id === placeId)

    placesList[placeIndex] = updatedPlace

    res.status(200).json({ updatedPlace })

}

const deletePlaceById = (req, res, next) => {

    // Return list with every item that does not have the id of place we want to delete
    placesList = placesList.filter(place => place.id != req.params.pid)

    res.status(200).json({ placesList })
}

// module.exports would export 1 thing 
// This will export multiple things as one object
exports.createPlace = createPlace
exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId
exports.updatePlaceById = updatePlaceById
exports.deletePlaceById = deletePlaceById
