"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cryptr_1 = __importDefault(require("cryptr"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = __importDefault(require("../user/user.service"));
const mongodb_1 = require("mongodb");
// import logger from '../../services/logger.service';
const cryptr = new cryptr_1.default(process.env.SECRET1 || 'Secret-Puk-1234');
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // logger.debug(`auth.service - login with username: ${username}`);
        const user = yield user_service_1.default.getByUsername(username);
        if (!user)
            return Promise.reject('Invalid username or password');
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            return Promise.reject('Invalid username or password');
        delete user.password;
        user._id = new mongodb_1.ObjectId(user._id);
        return user;
    });
}
function signup({ username, password, fullname, imgUrl }) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        // logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`);
        if (!username || !password || !fullname)
            return Promise.reject('Missing required signup information');
        const userExist = yield user_service_1.default.getByUsername(username);
        if (userExist)
            return Promise.reject('Username already taken');
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        return user_service_1.default.add({ username, password: hash, fullname, imgUrl });
    });
}
function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin };
    return cryptr.encrypt(JSON.stringify(userInfo));
}
function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken);
        const loggedinUser = JSON.parse(json);
        return loggedinUser;
    }
    catch (err) {
        console.log('Invalid login token');
    }
    return null;
}
exports.default = {
    signup,
    login,
    getLoginToken,
    validateToken
};
