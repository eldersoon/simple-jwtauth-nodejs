import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: string
  iat: number
  exp: number
}

export default function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({
      message: 'Requisição não autorizada.',
    })
  }

  try {
    const token = authorization.replace('Bearer', '').trim()
    next()
  } catch (err) {
    return response.json(err)
  }
}
