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
const auth_service_1 = __importDefault(require("../api/auth/auth.service"));
const als_service_1 = __importDefault(require("../services/als.service"));
function setupAsyncLocalStorage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = {};
        als_service_1.default.run(storage, () => {
            if (!req.cookies)
                return next();
            const loggedinUser = auth_service_1.default.validateToken(req.cookies.loginToken);
            if (loggedinUser) {
                const alsStore = als_service_1.default.getStore();
                alsStore.loggedinUser = loggedinUser;
            }
            next();
        });
    });
}
exports.default = setupAsyncLocalStorage;
