"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const receipt_controller_1 = require("./receipt.controller");
const router = express_1.default.Router();
router.get('/', receipt_controller_1.scanReceipt);
exports.default = router;
