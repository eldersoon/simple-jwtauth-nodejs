import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from 'src/modules/users/typeorm/entities/User'

class AuthController {
  async register(request: Request, response: Response) {
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
      delete user.password

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEYWORD, {
        expiresIn: '1d',
      })

      return response.json({
        user,
        token,
      })
    } catch (err) {
      return response.json(err)
    }
  }

  async login(request: Request, response: Response) {
    try {
      const repository = await getRepository(User)
      const { email, password } = request.body

      const user = await repository
        .createQueryBuilder()
        .addSelect('User.password')
        .where('User.email = :email', { email })
        .getOne()

      if (!user) {
        return response.json({
          message: 'Email ou senha inválidos.',
        })
      }

      const isValidPassword = await bcrypt.compare(password, user.password)
      delete user.password
      if (!isValidPassword) {
        return response.json({
          message: 'Email ou senha inválidos.',
        })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEYWORD, {
        expiresIn: '1d',
      })

      return response.json({
        user,
        token,
      })
    } catch (err) {
      return response.json(err)
    }
  }
}

export default new AuthController()
