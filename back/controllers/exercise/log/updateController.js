import asyncHandler from 'express-async-handler';
import ExerciseLog from '../../../models/exerciseLogModel.js';

// @route  PUT /api/exercises/log Обновить новый лог упражнения
// @access private

export const updateExerciseLog = asyncHandler(async (req, res) => {
  const {logId, timeIndex, key ,value} = req.body

  let currentLog = await ExerciseLog.findById(logId)

  if (!currentLog) {
    res.status(404)
    throw new Error('Данный лог не найден!')
  }

  let newTimes = currentLog.times

  if ((!timeIndex && timeIndex !== 0) || !key || (!value && value !== false)) {
    res.status(404)
    throw new Error('Вы не указали все поля!')
  }

  newTimes[timeIndex][key] = value

  currentLog.times = newTimes

  const updateLog = await currentLog.save()

  res.json(updateLog)
})

// @route  PUT /api/exercises/log/complete Обновить статус упражнения(завершено/нет)
// @access private

export const updateCompleteExerciseLog = asyncHandler(async (req, res) => {
  const {logId, completed} = req.body

  let currentLog = await ExerciseLog.findById(logId).populate('exercise','workout')

  if (!currentLog) {
    res.status(404)
    throw new Error('Данный лог не найден!')
  }

  currentLog.completed = completed

  const updateLog = await currentLog.save()

  res.json(updateLog)
})