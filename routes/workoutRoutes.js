const router = require('express').Router();
const workoutController = require('../controllers/workoutController');
const multer = require('multer');
const upload = multer();

// workout db
router.get('/', workoutController.readWorkout);
router.post('/', upload.single('file'), workoutController.createWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

// exercises 
router.patch('/exercise-workout/:id', workoutController.exerciseWorkout); 
router.patch('/edit-exercise-workout/:id', workoutController.editExerciseWorkout); 
router.patch('/delete-exercise-workout/:id', workoutController.deleteExerciseWorkout); 

module.exports = router;