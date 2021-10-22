const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
    {
        workoutId: {
            type: String, 
            required: true
        },
        name: {
            type: String,
            trim: true,
            maxlength: 190,
            required: true
        },
        picture: {
            type: String
        },
        exercises: {
            type: [
                {
                    name: [String],
                    load: [String]
                }
            ],
            required: true
        }, 
        comment: {
            type: String
        },
        score: {
            type: Number,
            min: 1, 
            max: 5,
        }
    },
    {
        timestamps: true
    }
);


const WorkoutModel = mongoose.model('workout', workoutSchema);

module.exports = WorkoutModel;