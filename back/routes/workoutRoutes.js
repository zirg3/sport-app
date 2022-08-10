import express from 'express'
import {protect} from '../middleware/authMiddleware.js';
import {addNewWorkout} from '../controllers/workout/workoutController.js';
import {getWorkout} from '../controllers/workout/workoutController.js';
import {createNewWorkoutLog} from '../controllers/workout/workoutLogController.js';
import {updateWorkout} from '../controllers/workout/workoutController.js';
import {getWorkouts} from '../controllers/workout/workoutController.js';
import {deleteWorkout} from '../controllers/workout/workoutController.js';
import {getWorkoutLog} from '../controllers/workout/workoutLogController.js';
import {updateCompleteWorkoutLog} from '../controllers/workout/workoutLogController.js';

//   /api/workouts
const router = express.Router()

router.route('/')
    .post(protect, addNewWorkout)
    .get(protect, getWorkouts)
    .put(protect, updateWorkout)
    .delete(protect, deleteWorkout)
router.route('/log').post(protect, createNewWorkoutLog).put(protect, updateCompleteWorkoutLog)
router.route('/log/:id').get(protect, getWorkoutLog)
router.route('/:id').get(protect, getWorkout)


export default router