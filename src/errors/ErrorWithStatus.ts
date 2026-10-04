import { SERVER_ERROR } from './constants'

export class ErrorWithStatus extends Error {
  statusCode: number = SERVER_ERROR
}
