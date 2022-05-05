import asyncHandler from 'express-async-handler';
import Exercise from '../../models/exerciseModel.js';
import Workout from '../../models/workoutModel.js';

// @route  POST /api/exercises Добавить новое упражнение
// @access private

export const addNewExercise = asyncHandler(async (req,res) => {
  const {name, times, imageId} = req.body

  const exercise = await Exercise.create({name, times, imageId})

  res.json(exercise)
})

// @route  PUT /api/exercises Обновить упражнение
// @access private

export const updateExercise = asyncHandler(async (req, res) => {
  const {name, times, imageId, exerciseId} = req.body

  let exercise = await Exercise.findById(exerciseId)

  if (!exercise) {
    res.status(404)
    throw new Error('Данное упражнение не найдено!')
  }

  exercise.name = name
  exercise.times = times
  exercise.imageId = imageId

  const updatedExercise = await exercise.save()

  res.json(updatedExercise)
})

// @route  DELETE /api/exercises Удалить упражнение
// @access private

export const deleteExercise = asyncHandler(async (req, res) => {
  const {exerciseId} = req.body

  let exercise = await Exercise.findById(exerciseId)

  if (!exercise) {
    res.status(404)
    throw new Error('Данное упражнение не найдено!')
  }

  await exercise.remove()

  res.json({message: 'Упражнение удалено'})
})

// @route  GET /api/exercise/:id Получить упражнение
// @access private
export const getExercise =  asyncHandler(async(req,res) => {
  const exercise = await Exercise.find({})

  res.json(exercise)
})