import { Request, Response } from 'express';
import authService from './auth.service' 
// import logger from '../../services/logger.service';

async function login(req: Request, res: Response): Promise<void> {
    const credentials: { email: string, password: string } = req.body
    try {
        const user = await authService.login(credentials.email, credentials.password)
        
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
        res.json(user)
    } catch (err) {
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req: Request, res: Response): Promise<void> {
    try {
        console.log('body:' , req.body);
        const credentials:{email:string, password:string, fullName:string} = req.body
        const account = await authService.signup(credentials)
        const user = await authService.login(credentials.email, credentials.password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
        console.log(user);
        
        res.json(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to signup' })
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
    try {
        const user: { _id: string, fullName: string} = await authService.validateToken(req.body.loginToken)
        res.json(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get logged in user'})
    }
}

export {
    login,
    signup,
    logout,
    getLoggedInUser
};
