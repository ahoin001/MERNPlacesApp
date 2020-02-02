// ** NOTE throwing error does not work in async tasks, must use next
const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error')

const User = require('../models/user')

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

const signup = async (req, res, next) => {

    // Make sure user inputs are valid
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(402)
        return next(
            new HttpError('Invalid sign up information, please check your data', 422)
        )
    }

    const { name, email, password, places } = req.body;

    let exsistingUser;
    try {

        // Check if a user already has this email
        exsistingUser = await User.findOne({ email: email })

    } catch (err) {
        const error = new HttpError('Sign up failed please check information.', 500)
        return next(error)
    }

    if (exsistingUser) {
        const error = new HttpError('User with this email already exsists, please log in instead', 422)
        return next(error)
    }

    // create new user and provide a unique id
    const newUser = new User({
        name,
        email,
        image: 'https://tinyurl.com/y2mmdwus',
        password,
        places

    })

    try {

        await newUser.save()

    } catch (error) {

        error = new HttpError('Sign up failed, please try again.', 500);
        // use next to stop code excecution
        return next(error)

    }

    res.status(201).json({ newUser: newUser.toObject({ getters: true }) })

}

const login = (req, res, next) => {

    console.log(req.body)
    const { email, password } = req.body;

    const identifiedUser = dummyUsersList.find(user => user.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials please try again', 401)
    }

    res.status(200).json({ message: 'Logged in!' })


}

exports.listUsers = listUsers;
exports.signup = signup;
exports.login = login;

