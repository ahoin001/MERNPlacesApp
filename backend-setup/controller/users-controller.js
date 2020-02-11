// ** TODO NOTE throwing error does not work in async tasks, must use next

const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error')

const User = require('../models/user')


const getUsers = async (req, res, next) => {

    let users;

    try {

        // Return users without password property
        users = await User.find({}, '-password')

        // Only returns email and name with each user
        // const users = await User.find({},'email name')

    } catch (err) {

        return next(new new HttpError('Failed fetching users, please try again later', 500))

    }

    res.status(200).json({ users: users.map(user => user.toObject({ getters: true })) })

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

    const { name, email, password } = req.body;

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

    // Places will automatically be added when a place is created by a user
    const newUser = new User({
        name,
        email,
        image: 'https://www.smashbros.com/assets_v2/img/top/hero05_en.jpg',
        password,
        places: []

    })

    try {

        await newUser.save()

    } catch (error) {

        error = new HttpError('Sign up failed, please try again.', 500);
        // use next to stop code excecution
        return next(error)

    }

    // return object with user data that can be used
    res.status(201).json({ user: newUser.toObject({ getters: true }) })

}

const login = async (req, res, next) => {

    const { email, password } = req.body;

    // First fin any user witht the email
    let exsistingUser;
    try {

        // Check if a user already has this email
        exsistingUser = await User.findOne({ email: email })

    } catch (err) {
        const error = new HttpError('Login failed, please try again later.', 500)
        return next(error)
    }

    if (!exsistingUser || exsistingUser.password !== password) {
        return next(new HttpError('Login failed,invalid email and or password.', 401))
    }

    // return object with user data that can be used
    res.json({
        message: 'Logged in!',
        user: exsistingUser.toObject({ getters: true })
    })

}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

