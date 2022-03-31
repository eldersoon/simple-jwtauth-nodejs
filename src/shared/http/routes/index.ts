import { request, response, Router } from 'express'

import userRoutes from 'src/modules/users/routes'
import authRoutes from 'src/modules/auth/routes'

const routes = Router()

export default [
  routes.get('/', (request, response) => {
    return response.json({
      message: 'tudo ok',
    })
  }),
  ...authRoutes,
  ...userRoutes,
]
