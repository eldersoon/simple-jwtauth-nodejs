import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'

import User from '../typeorm/entities/User'

class UserController {
  async index(request: Request, response: Response) {
    try {
      const repository = await getRepository(User)
      const users = await repository.find({ where: { active: 1 } })

      return response.json({ users: users })
    } catch (err) {
      return response.json(err)
    }
  }

  async store(request: Request, response: Response) {
    try {
      const repository = await getRepository(User)
      const { name, email, password } = request.body

      const userExists = await repository.findOne({ where: { email } })

      if (userExists) {
        return response.json({
          message: 'O email informado já está sendo usado.',
        })
      }

      const user = await repository.create({ name, email, password })
      await repository.save(user)

      return response.json(user)
    } catch (err) {
      return response.json(err)
    }
  }

  async update(request: Request, response: Response) {
    //
  }

  async destroy(request: Request, response: Response) {
    //
  }
}

export default new UserController()
