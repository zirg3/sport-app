import User from '../../models/userModel.js';
import asyncHandler from 'express-async-handler';
import {generateToken} from '../../helpers/generateToken.js';

// @route  POST /api/users регистрация
// @access public
export const registerUser =  asyncHandler(async(req,res) => {
  const {email, password, login} = req.body

  const isHaveUser = await User.findOne({email})
  const isHaveUserLogin = await User.findOne({login})

  if (isHaveUser) {
    res.status(400)
    throw new Error('Пользователь уже зарегистрирован')
  } else if(isHaveUserLogin) {
    res.status(400)
    throw new Error('Логин занят')
  }

  const user = await User.create({email,password, login})

  const token = generateToken(user._id)

  res.json({user, token})
})