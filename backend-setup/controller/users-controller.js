// Generates Unique Id
const uuid = require('uuid/v4')

// We created this class to not repeat code for creating errors to send to appj.js error handler
const HttpError = require('../models/http-error')

const dummyUsersList = [
    {
        id: 'u1',
        name: 'Kyle',
        email: 'test@email.com',
        password: 'testers'
    },
    {
        id: 'u2',
        name: 'Ryan',
        email: 'ryan@email.com',
        password: 'testers'
    },
    {
        id: 'u3',
        name: 'Kylo',
        email: 'kylo@email.com',
        password: 'testers'
    }
]

const listUsers = (req, res, next) => {


    res.status(200).json(dummyUsersList)

}

const signup = (req, res, next) => {

    console.log(req.body)
    const { name, email, password } = req.body;

    const newUser = {
        id: uuid(),
        name,
        email,
        password
    }

    dummyUsersList.push(newUser)

    // 201 means created new data
    res.status(201).json(newUser)

}

const login = (req, res, next) => {

    const { email, password } = req.body;

    const identifiedUser = dummyUsersList.find(user => user.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials please try again', 401)
    }

        res.status(200).json({message:'Logged in!'})

    
}

exports.listUsers = listUsers;
exports.signup = signup;
exports.login = login;

