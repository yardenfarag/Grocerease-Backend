"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../api/auth/auth.service"));
function requireAuth(req, res, next) {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.loginToken)) {
        res.status(401).send('Not Authenticated');
        return;
    }
    const loggedinUser = auth_service_1.default.validateToken(req.cookies.loginToken);
    if (!loggedinUser) {
        res.status(401).send('Not Authenticated');
        return;
    }
    req.loggedinUser = loggedinUser;
    next();
}
exports.default = requireAuth;
