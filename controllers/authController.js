const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {signUpErros, signInErrors} = require('../utils/errosUtils');

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({user: user._id});
    }
    catch(err) {
        const errors = signUpErros(err);
        res.status(400).send({errors});
    }
}

const maxAge = 7 * 24 * 60 * 60 * 1000; // Variable qui désigne 7 jours
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge // Token qui expire dans 7 jours
    })
}

module.exports.signIn = async (req, res) => {
    const {email, password} = req.body 

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge})
        res.status(200).json({user: user._id})
    } catch (err) {
        const errors = signInErrors(err)
        res.status(400).json({errors});
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}