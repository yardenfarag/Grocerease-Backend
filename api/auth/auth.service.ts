import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';
import userService from '../user/user.service';
import { ObjectId } from 'mongodb';
import { User } from '../../models/user';

const cryptr = new Cryptr(process.env.HASH_SECRET || 'Secretive');

async function login(email: string, password: string): Promise<any> {
    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password
    user._id = new ObjectId(user._id as unknown as string)
    return user
}

async function signup({ email, password, fullName}: { email: string, password: string, fullName: string }): Promise<any> {
    const saltRounds = 10
    if (!email || !password || !fullName) return Promise.reject('Missing required signup information')
    const userExist = await userService.getByEmail(email)
    if (userExist) return Promise.reject('Email already taken')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, fullName })
}

function getLoginToken(user: { _id: string, fullName: string, isAdmin: boolean }): string {
    const userInfo = { _id: user._id, fullName: user.fullName, isAdmin: user.isAdmin };
    return cryptr.encrypt(JSON.stringify(userInfo));
}

function validateToken(loginToken: string): any {
    try {
        const json = cryptr.decrypt(loginToken);
        const loggedinUser = JSON.parse(json);
        return loggedinUser;
    } catch (err) {
        console.log('Invalid login token');
    }
    return null;
}

export default{
    signup,
    login,
    getLoginToken,
    validateToken
};
