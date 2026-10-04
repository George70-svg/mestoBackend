import { ErrorWithStatus } from './ErrorWithStatus'
import { NOT_FOUND_ERROR } from './constants'

export class NotFoundError extends ErrorWithStatus {
  constructor(message: string) {
    super(message)
    this.statusCode = NOT_FOUND_ERROR
  }
}
