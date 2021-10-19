const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            minlength: 3,
            maxlength: 30,
            unique: true, 
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            max: 32,
            minlength: 6
        },
        avatar: {
            type: String,
            default: "./upload/profil/random-user.png"
        },
        bio :{
            type: String,
            max: 1024,
        },

    },
    {
        timestamps: true
    }
);

// hasher le mot de passe dans la bdd
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// permet de pouvoir désaler le mot de passe lors du login 
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;