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
                console.log(user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}