import {
  NextFunction, Request, RequestHandler, Response,
} from 'express'

export type FakeAuthRequest<T = unknown> = Request<T> & { user?: { _id: string } }

export const fakeAuth: RequestHandler = (request: FakeAuthRequest, _: Response, next: NextFunction) => {
  request.user = {
    _id: '6ac0feadc12bfa8476d3d616',
  }

  next()
}
