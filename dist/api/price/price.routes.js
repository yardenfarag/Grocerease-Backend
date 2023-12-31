"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const price_controller_1 = require("./price.controller");
const router = express_1.default.Router();
router.get('/', price_controller_1.getMarketData);
router.get('/key', price_controller_1.getKeyValue);
exports.default = router;
