import { Request, Response } from 'express';
import authService from './auth.service'

async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
        res.json(user)
    } catch (err) {
        res.status(401).send({ err: 'Failed to Login' })
    }
}



const signup = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const newuser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        }
        const credentials = newuser
        const account = await authService.signup(credentials)
        const user = await authService.login(credentials.email, credentials.password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        next()

    }
}

async function logout(req: Request, res: Response): Promise<void> {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

async function getLoggedInUser(req: Request, res: Response): Promise<void> {
    const loginToken = req.query.loginToken as string
    try {
        const user: { _id: string, fullName: string } = await authService.validateToken(loginToken)
        res.json(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get logged in user' })
    }
}

export {
    login,
    signup,
    logout,
    getLoggedInUser
};
