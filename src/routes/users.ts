import { Router } from 'express'
import { createUser, getAllUsers, getCurrentUser, updateUserAvatar, updateUserInfo } from '../controllers/users'

const usersRouter = Router()

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

usersRouter.post('/', createUser)
usersRouter.get('/', getAllUsers)
usersRouter.get('/:userId', getCurrentUser)
usersRouter.patch('/me', updateUserInfo)
usersRouter.patch('/me/avatar', updateUserAvatar)

export default usersRouter
