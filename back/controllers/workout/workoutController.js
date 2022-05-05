import Workout from '../../models/workoutModel.js';
import asyncHandler from 'express-async-handler';
import ExerciseLog from '../../models/exerciseLogModel.js';


// @route  POST /api/workouts Добавить новую тренировку
// @access private
export const addNewWorkout =  asyncHandler(async(req,res) => {
  const {name, exerciseId} = req.body

  const workout = await Workout.create({name, exercises: exerciseId})

  res.json(workout)

})

// @route  GET /api/workouts/:id Получить тренировку
// @access private
export const getWorkout =  asyncHandler(async(req,res) => {
  const workout = await Workout.findById(req.params.id)
      .populate('exercises' )
      .lean()

  const minutes = Math.ceil(workout.exercises.length * 7.5)

  res.json({...workout, minutes})
})

// @route  GET /api/workouts Получить тренировки
// @access private
export const getWorkouts =  asyncHandler(async(req,res) => {
  const workouts = await Workout.find({}).populate('exercises')

  res.json(workouts)
})

// @route  PUT /api/workouts Обновить тренировку
// @access private

export const updateWorkout = asyncHandler(async (req, res) => {
  const {name, exerciseIds, workoutId} = req.body

  let workout = await Workout.findById(workoutId)

  if (!workout) {
    res.status(404)
    throw new Error('Данная тренировка не найдена!')
  }

  workout.name = name
  workout.exercises = exerciseIds

  const updatedWorkout = await workout.save()

  res.json(updatedWorkout)
})

// @route  DELETE /api/workouts Удалить тренировку
// @access private

export const deleteWorkout = asyncHandler(async (req, res) => {
  const {workoutId} = req.body

  let workout = await Workout.findById(workoutId)

  if (!workout) {
    res.status(404)
    throw new Error('Данная тренировка не найдена!')
  }

  await workout.remove()

  res.json({message: 'Тренировка удалена'})
})