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
exports.getLoggedInUser = exports.logout = exports.signup = exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield auth_service_1.default.login(email, password);
            const loginToken = auth_service_1.default.getLoginToken(user);
            res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
            res.json(user);
        }
        catch (err) {
            res.status(401).send({ err: 'Failed to Login' });
        }
    });
}
exports.login = login;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newuser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        };
        const credentials = newuser;
        const account = yield auth_service_1.default.signup(credentials);
        const user = yield auth_service_1.default.login(credentials.email, credentials.password);
        const loginToken = auth_service_1.default.getLoginToken(user);
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        next();
    }
});
exports.signup = signup;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie('loginToken');
            res.send({ msg: 'Logged out successfully' });
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to logout' });
        }
    });
}
exports.logout = logout;
function getLoggedInUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginToken = req.query.loginToken;
        try {
            const user = yield auth_service_1.default.validateToken(loginToken);
            res.json(user);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get logged in user' });
        }
    });
}
exports.getLoggedInUser = getLoggedInUser;
