const UserModel = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId;

// récupérer tous les utilisateurs de la bdd
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

// récupérer un utilisateur en particulier dans la bdd en fonction de son ID
module.exports.userInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log(`Id unknown : ${err}`)
    }).select('-password');
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(404).send("ID unknown : " + req.params.id);
  
    try {
       const docs = await new Promise((resolve, reject) => {
          UserModel.findOneAndUpdate(
             { _id: req.params.id },
             {
                $set: {
                    bio: req.body.bio,
                },
             },
             { new: true, upsert: true, setDefaultsOnInsert: true },
             (err, docs) => {
                if (err) {
                   reject(err)
                } else {
                   resolve(docs)  // resolving the promise with docs, instead of sending the response.
                }
             }
          );
       })
       return res.send(docs);  // sending response after the above promise is resolved.
    } catch (err) {
      return res.status(500).json({ message: err });
    }
 };

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.deleteOne({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };