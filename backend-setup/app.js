const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const HttpError = require('./models/http-error')

// Connnection to database
const mongoose = require('mongoose')

// Import Routers instead of cluttering this file with different routes
const placesRoutes = require('./routes/places-routes')
const userRoutes = require('./routes/users-routes')

/*
    Middleware is run top to bottom, and requests are passed to next middleware with next() or if a response was sent which would satisfy request
*/

// Parse recieved data no matter what request is made, on every request so we can pass it down
// converts json to useable javascript structures, has next() built in
app.use(bodyParser.json());

app.use((req, res, next) => {

    // Allow *(any) domain to send requests to this back end 
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Specify what headers will be allowed
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')

    // Specify the http methods that will be allowed 
    res.setHeader('Access-Control-Allow-METHODS', 'GET, POST, PATCH, DELETE')

    // Move to next middleware
    next()

});


// excecutes on all requests (get,post,put etc) that start with http://localhost:5000/api/places
app.use('/api/places', placesRoutes); // => /api/places/...

app.use('/api/users', userRoutes); // => /api/places/...


// If no response was sent or error handled from previous routes,
// meaning route requested was not found, return 404 with message
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404)
    throw error
});


// In middleware functions with 4 params, we have access to error , only excecuted on reesponses where error was thrown
// error will only exccute if any middleware before it has an error
app.use((error, req, res, next) => {

    if (res.headerSent) {
        return next(error)
    }

    res.status(error.code || 500)

    // TODO NOTE* If response is error, notice in front end that .message property will be referring to this error object message
    // Message is passed in from the controllers that throw our httperror object. httperror extends error so its messgage property works here  
    res.json({ message: error.message || 'An unknown error occured!' })

});

// Establish connection to database and then open server                 MERNPlaces = name of db, will create new DB if can't find matching name
mongoose.connect(`mongodb+srv://alex:Alex9595@cluster0-6ofkv.mongodb.net/MERNPlaces?retryWrites=true&w=majority`)
    .then(() => {

        app.listen(5000, () => {
            console.log('App listening on port 5000!');
        });
    })
    .catch((err) => {
        console.log(err)
    })

