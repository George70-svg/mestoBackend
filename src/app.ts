import express, { json } from 'express'
import mongoose from 'mongoose'
import { errors } from 'celebrate'
import { fakeAuth } from './middlewares/fakeAuth'
import { errorsHandler } from './middlewares/errors'
import usersRouter from './routes/users'
import cardsRouter from './routes/cards'

mongoose.connect('mongodb://localhost:27017/mestodb')

const app = express()

app.use(json())

app.use(fakeAuth)

app.use('/users', usersRouter)
app.use('/cards', cardsRouter)

app.use(errors())
app.use(errorsHandler)

app.listen(3000)
