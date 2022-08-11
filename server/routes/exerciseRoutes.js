import express from 'express'
import {protect} from '../middleware/authMiddleware.js';
import {addNewExercise, updateExercise, deleteExercise} from '../controllers/exercise/exerciseController.js';
import {createNewExerciseLog} from '../controllers/exercise/log/exerciseLogController.js';
import {getExerciseLog} from '../controllers/exercise/log/getExercise.js';
import {updateExerciseLog, updateCompleteExerciseLog} from '../controllers/exercise/log/updateController.js';
import {getExercise} from '../controllers/exercise/exerciseController.js';



//   /api/exercises

const router = express.Router()

router.route('/')
    .post(protect, addNewExercise)
    .get(protect, getExercise)
    .put(protect, updateExercise)
    .delete(protect, deleteExercise)

router.route('/log')
    .post(protect, createNewExerciseLog)
    .put(protect, updateExerciseLog)

router.route('/log/completed').put(protect, updateCompleteExerciseLog)

router.route('/log/:id').get(protect, getExerciseLog)



export default router