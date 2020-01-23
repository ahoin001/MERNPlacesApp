const express = require('express')
const app = express();
const bodyParser = require('body-parser')

// Import Routers instead of cluttering this file
const placesRoutes = require('./routes/places-routes')
const userRoutes = require('./routes/users-routes')


// all requests that start with http://localhost:5000/api/places
// PlaceRoutes are endpoints to hit: http://localhost:5000/api/places/:placeid
app.use('/api/places',placesRoutes); // => /api/places/...

app.use('/api/users',userRoutes); // => /api/places/...

app.listen(5000, () => {
    console.log('App listening on port 5000!');
});