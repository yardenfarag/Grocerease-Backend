"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_controller_1 = require("./store.controller");
const requireAuth_middleware_1 = __importDefault(require("../../middlewares/requireAuth.middleware"));
const router = express_1.default.Router();
router.get('/:userId', requireAuth_middleware_1.default, store_controller_1.getStores);
router.get('/:id', requireAuth_middleware_1.default, store_controller_1.getStoreById);
router.post('/', requireAuth_middleware_1.default, store_controller_1.addStore);
router.put('/:id', requireAuth_middleware_1.default, store_controller_1.updateStore);
router.delete('/:id', requireAuth_middleware_1.default, store_controller_1.removeStore);
exports.default = router;
