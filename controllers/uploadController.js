const UserModel = require('../models/userModel');
const fs = require('fs');
const {promisify} = require('util');
const { uploadErrors } = require('../utils/errosUtils');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) => {
    try {
        if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
        )
        throw Error("invalid file");
    
        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }
    const fileName = req.body.pseudo + ".jpg";
    
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
        `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

    try {
        const docs = await new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(
                req.body.userId,
                { $set : {avatar: "./uploads/profil/" + fileName}},
                { new: true, upsert: true, setDefaultsOnInsert: true},
                (err, docs) => {
                  if (!err) resolve(docs);
                  else reject(err);
                }
              );
        });
        return res.send(docs);
      } catch (err) {
        return res.status(500).send({ message: err });
      }
};