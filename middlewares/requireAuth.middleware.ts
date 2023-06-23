import authService from '../api/auth/auth.service'
import { Request, Response, NextFunction } from 'express'

interface AuthenticatedRequest extends Request {
  loggedinUser?: {
    _id: string
    fullName: string
  }
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req?.cookies?.loginToken) {
    res.status(401).send('Not Authenticated')
    return
  }

  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) {
    res.status(401).send('Not Authenticated')
    return
  }

  req.loggedinUser = loggedinUser
  next()
}

export default requireAuth
