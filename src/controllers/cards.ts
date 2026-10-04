import { Request, Response, NextFunction } from 'express'
import Card from '../models/card'
import { FakeAuthRequest } from '../middlewares/fakeAuth'
import { NotFoundError } from '../errors/NotFoundError'
import { BadRequestError } from '../errors/BadRequestError'

export const getAllCards = async (_: Request, response: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({})

    response.status(200).send(cards)
  } catch (error) {
    next(error)
  }
}

export const createCard = async (request: FakeAuthRequest, response: Response, next: NextFunction) => {
  try {
    const { name, link } = request.body
    const owner = request.user?._id

    if (!owner) {
      throw new NotFoundError('User not found')
    }

    const card = await Card.create({
      name,
      link,
      owner,
    })

    response.status(201).send(card)
  } catch (error) {
    next(error)
  }
}

export const deleteCard = async (request: Request<{ cardId: string }>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

    if (!cardId) {
      throw new BadRequestError('Invalid cardId')
    }

    const card = await Card.findByIdAndDelete(cardId).orFail(new NotFoundError('Card not found'))

    response.status(200).send(card)
  } catch (error) {
    next(error)
  }
}

export const likeCard = async (request: FakeAuthRequest<{ cardId: string }>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

    const owner = request.user?._id

    if (!owner) {
      throw new NotFoundError('User not found')
    }

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: owner } },
      { returnDocument: 'after' },
    )

    response.status(200).send(card)
  } catch (error) {
    next(error)
  }
}

export const dislikeCard = async (request: FakeAuthRequest<{ cardId: string }>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

    const owner = request.user?._id

    if (!owner) {
      throw new NotFoundError('User not found')
    }

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: owner } },
      { returnDocument: 'after' },
    )

    response.status(200).send(card)
  } catch (error) {
    next(error)
  }
}
