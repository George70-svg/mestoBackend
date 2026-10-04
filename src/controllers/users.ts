import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import User from '../models/user'
import { NotFoundError } from '../errors/NotFoundError'
import { FakeAuthRequest } from '../middlewares/fakeAuth'
import { BadRequestError } from '../errors/BadRequestError'

export const getAllUsers = async (_: Request, response: Response, next: NextFunction) => {
  try {
    const users = await User.find({})

    response.status(200).send(users)
  } catch (error) {
    next(error)
  }
}

export const getCurrentUser = async (request: Request<{ userId: string }>, response: Response, next: NextFunction) => {
  try {
    const { userId } = request.params

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError('Invalid userId')
    }

    const user = await User.findById(userId).orFail(new NotFoundError('User not found'))

    response.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = request.body

    const user = await User.create({
      name,
      about,
      avatar,
    })

    response.status(201).send(user)
  } catch (error) {
    next(error)
  }
}

export const updateUserInfo = async (request: FakeAuthRequest, response: Response, next: NextFunction) => {
  try {
    const { name, about } = request.body

    const owner = request.user?._id

    if (!owner) {
      throw new NotFoundError('User not found')
    }

    const user = await User.findByIdAndUpdate(
      owner,
      { name, about },
      { returnDocument: 'after' },
    )

    response.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

export const updateUserAvatar = async (request: FakeAuthRequest, response: Response, next: NextFunction) => {
  try {
    const { avatar } = request.body

    const owner = request.user?._id

    if (!owner) {
      throw new NotFoundError('User not found')
    }

    const user = await User.findByIdAndUpdate(
      owner,
      { avatar },
      { returnDocument: 'after' },
    )

    response.status(200).send(user)
  } catch (error) {
    next(error)
  }
}
