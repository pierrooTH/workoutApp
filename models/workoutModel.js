const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 3,
            maxlength: 1024,
        },
        exercise: {
            type: [String]
        }, 
        load: {
            type: [Number]
        },
        comment: {
            type: String
        },
        score: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);


const WorkoutModel = mongoose.model('workout', workoutSchema);

module.exports = WorkoutModel;