const express = require('express')
const router = express.Router();

const dummyUsersList = [
    {
        Name: 'Kyle',
        creator: 'u1'
    },
    {
        Name: 'Kevin',
        creator: 'u2'
    },
    {
        Name: 'Revan',
        creator: 'u3'
    },
]

router.get('/', (req, res, next) => {

    res.json(dummyUsersList)

})

router.get('/', (req, res, next) => {

    res.json(dummyUsersList)

})

module.exports = router