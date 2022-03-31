import { Router } from 'express'
import AuthMiddleware from 'src/middlewares/AuhMiddleware'
import UserController from '../controllers/UserController'

const routes = Router()

const userRoutes = [
  routes.get('/users', AuthMiddleware, UserController.index),
  routes.post('/user/store', UserController.store),
]

export default userRoutes
