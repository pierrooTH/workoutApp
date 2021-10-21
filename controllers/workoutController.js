const WorkoutModel = require('../models/workoutModel');
const ObjectId = require('mongoose').Types.ObjectId;
const { uploadErrors } = require('../utils/errosUtils');
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.readWorkout = (req, res) => {
    WorkoutModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    }).sort({createdAt: -1})
}

module.exports.createWorkout = async (req, res) => {
    let fileName;

    if (req.file !== null) {
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
        fileName = req.body.workoutId + Date.now() + '.jpg';

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
            `${__dirname}/../client/public/uploads/workouts/${fileName}`
            )
        );
    }

    const newWorkout = new WorkoutModel({
        workoutId: req.body.workoutId,
        name: req.body.name,
        picture: req.file !== null ? `./uploads/workouts/${fileName}` : '',
        comment: req.body.comment,
        exercises: [],
        score: req.body.score
    });

    try {
        const workout = await newWorkout.save();
        return res.status(201).json(workout);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.updateWorkout = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown : ' + req.params.id)

    const updatedRecord = {
        name: req.body.name,
        comment: req.body.comment
    }

    WorkoutModel.findByIdAndUpdate(
        req.params.id, 
        {$set: updatedRecord},
        {new: true},
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
}

module.exports.deleteWorkout = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown : ' + req.params.id)

    WorkoutModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.status(200).send('Id :' + docs._id)
            else console.log(`Delete error : ${err}`)
        }
    )
}

module.exports.exerciseWorkout = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown : ' + req.params.id)

    try {
        const docs = await new Promise((resolve, reject) => {
            WorkoutModel.findByIdAndUpdate(
                req.params.id, 
                {
                    $push: {
                        exercises: {
                            name: req.body.name,
                            load: req.body.load
                        }
                    }
                },
                {new: true},
                (err, docs) => {
                    if (!err) resolve(docs);
                    else reject(err);
                }
            )
        });
        return res.send(docs);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.editExerciseWorkout = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown : ' + req.params.id)

    try {
        const docs = await new Promise((resolve, reject) => {
            WorkoutModel.findById(req.params.id, (err, docs) => {
                const theExercise = docs.exercises.find((exercise) => 
                    exercise._id.equals(req.body.exerciseId)
                );
    
                if (!theExercise) return res.status(404).send('Exercise not found');
                theExercise.name = req.body.name;
                theExercise.load = req.body.load;
    
                return docs.save((err) => {
                    if (!err) resolve(docs);
                    else reject(err);
                });
            });
        })
        return res.send(docs);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.deleteExerciseWorkout = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown : ' + req.params.id)

    try {
        const docs = await new Promise((resolve, reject) => {
            WorkoutModel.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: {
                        exercises: {
                            _id: req.body.exerciseId
                        }
                    }
                },
                {new: true},
                (err, docs) => {
                    if (!err) resolve(docs);
                    else reject(err);
                }
            )
        });
        return res.send(docs);
    } catch (err) {
        return res.status(400).send(err);
    }
}
