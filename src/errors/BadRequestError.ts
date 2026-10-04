import { ErrorWithStatus } from './ErrorWithStatus'
import { BAD_REQUEST_ERROR } from './constants'

export class BadRequestError extends ErrorWithStatus {
  constructor(message: string) {
    super(message)
    this.statusCode = BAD_REQUEST_ERROR
  }
}
