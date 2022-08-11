import asyncHandler from 'express-async-handler';
import WorkoutLog from '../../models/workoutLogModel.js';
import Workout from '../../models/workoutModel.js';
import ExerciseLog from '../../models/exerciseLogModel.js';

// @route  POST /api/workouts/log создать новый лог тренировки
// @access private

export const createNewWorkoutLog = asyncHandler(async (req, res) => {
  const {workoutId} = req.body

  // const user = req.user._id

  const workout = await Workout.findById(workoutId).populate('exercises')

  if (workout) {
    const workoutLog = await WorkoutLog.create({
      user: req.user._id,
      workout: workoutId
    })

    const logs = workout.exercises.map(ex => {
      let timesArray = []

      for (let i = 0; i < ex.times; i++) {
        timesArray.push({
          weight: 0,
          repeat: 0
        })
      }

      return {
        user: req.user._id,
        exercise: ex._id,
        times: timesArray,
        workoutLog: workoutLog._id
      }
    })

    const createdExLogs = await ExerciseLog.insertMany(logs)

    const exLogIds = createdExLogs.map(log => log._id)

    const foundWorkoutLog = await WorkoutLog.findById(workoutLog._id)

    foundWorkoutLog.exerciseLogs = exLogIds

    const updatedWorkoutLog = await foundWorkoutLog.save()

    res.json(updatedWorkoutLog)
  } else {
    res.status(404)
    throw new Error('Упражнение не найдено')
  }
})

// @route  GET /api/workouts/log/:id Получить лог тренировки
// @access private

export const getWorkoutLog = asyncHandler(async (req, res) => {
  const workoutLog = await WorkoutLog.findById(req.params.id)
      .populate('workout')
      .populate({
        path: 'exerciseLogs',
        populate: {
          path: 'exercise'
        }
      }).lean()

  const minutes = Math.ceil(workoutLog.workout.exercises.length * 3.7)

  res.json({...workoutLog, minutes})
})

// @route  PUT /api/workouts/log Обновить лог тренировки
// @access private

export const updateCompleteWorkoutLog = asyncHandler(async (req, res) => {
  const {logId} = req.body

  const currentLog = await WorkoutLog.findById(logId)

  if (!currentLog) {
    res.status(404)
    throw new Error('Данный лог не найден')
  }

  currentLog.completed = true

  const updateLog = await currentLog.save()

  res.json(updateLog)
})
