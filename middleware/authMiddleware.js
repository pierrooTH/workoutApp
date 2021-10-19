const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// fonction qui test si l'utilisateur est connecté (check si le token est connu)
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

// fonction qui vérifie si le token est bien présent pour pouvoir connecter l'utilisateur 
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send(401).json('No Token')
            } else {
                console.log('Token: ', decodedToken.id)
                next();
            }
        })
    } else {
        console.log('No Token !');
    }
}