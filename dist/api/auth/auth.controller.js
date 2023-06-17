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
exports.logout = exports.signup = exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
// import logger from '../../services/logger.service';
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
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const credentials = req.body;
            const account = yield auth_service_1.default.signup(credentials);
            const user = yield auth_service_1.default.login(credentials.username, credentials.password);
            const loginToken = auth_service_1.default.getLoginToken(user);
            res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
            res.json(user);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to signup' });
        }
    });
}
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
