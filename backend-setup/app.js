const express = require('express')
const app = express();
const bodyParser = require('body-parser')

// Import Routers instead of cluttering this file
const placesRoutes = require('./routes/places-routes')
const userRoutes = require('./routes/users-routes')

// Parse recieved data no matter what request is made so we can pass it down
// converts json to useable javascript structures
app.use(bodyParser.json());

// excecutes on all requests (get,post,put etc) that start with http://localhost:5000/api/places
app.use('/api/places', placesRoutes); // => /api/places/...

app.use('/api/users', userRoutes); // => /api/places/...



// In middleware functions with 4 params, we have access to error , only excecuted on requests error was thrown
// error will only exccute if any middleware before it has an error
app.use((error, req, res, next) => {

    if (res.headerSent) {
        return next(error)
    }

    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occured!' })

});

app.listen(5000, () => {
    console.log('App listening on port 5000!');
});