import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';
import userService from '../user/user.service';
import { ObjectId } from 'mongodb';
import { User } from '../../models/user';
// import logger from '../../services/logger.service';

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234');

async function login(username: string, password: string): Promise<any> {
    // logger.debug(`auth.service - login with username: ${username}`);

    const user = await userService.getByUsername(username);
    if (!user) return Promise.reject('Invalid username or password');
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password;
    user._id = new ObjectId(user._id as unknown as string)
    return user;
}

async function signup({ username, password, fullname, imgUrl }: { username: string, password: string, fullname: string, imgUrl: string }): Promise<any> {
    const saltRounds = 10;

    // logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`);
    if (!username || !password || !fullname) return Promise.reject('Missing required signup information');

    const userExist = await userService.getByUsername(username);
    if (userExist) return Promise.reject('Username already taken');

    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ username, password: hash, fullname, imgUrl });
}

function getLoginToken(user: { _id: string, fullname: string, isAdmin: boolean }): string {
    const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin };
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
