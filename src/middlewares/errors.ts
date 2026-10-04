import { Request, Response } from 'express'
import { ErrorWithStatus } from '../errors/ErrorWithStatus'

export const errorsHandler = (error: ErrorWithStatus, _: Request, response: Response) => {
  const { message, statusCode = 500 } = error

  console.error('Error from middlewares', error)

  response.status(statusCode).send({ message })
}
