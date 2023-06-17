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
const cryptr = new cryptr_1.default(process.env.HASH_SECRET || 'Secretive');
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_service_1.default.getByEmail(email);
        if (!user)
            return Promise.reject('Invalid email or password');
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            return Promise.reject('Invalid email or password');
        delete user.password;
        user._id = new mongodb_1.ObjectId(user._id);
        return user;
    });
}
function signup({ email, password, fullName }) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        if (!email || !password || !fullName)
            return Promise.reject('Missing required signup information');
        const userExist = yield user_service_1.default.getByEmail(email);
        if (userExist)
            return Promise.reject('Email already taken');
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        return user_service_1.default.add({ email, password: hash, fullName });
    });
}
function getLoginToken(user) {
    const userInfo = { _id: user._id, fullName: user.fullName, isAdmin: user.isAdmin };
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
