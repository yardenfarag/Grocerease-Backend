import { Request, Response, NextFunction } from 'express'
import authService from '../api/auth/auth.service'
import asyncLocalStorage from '../services/als.service'

async function setupAsyncLocalStorage(req: Request, res: Response, next: NextFunction): Promise<void> {
  const storage: { [key: string]: any } = {}
  asyncLocalStorage.run(storage, () => {
    if (!req.cookies) return next()
    const loggedinUser = authService.validateToken(req.cookies.loginToken)

    if (loggedinUser) {
      const alsStore = asyncLocalStorage.getStore() as { [key: string]: any }
      alsStore.loggedinUser = loggedinUser
    }
    next()
  })
}

export default setupAsyncLocalStorage
