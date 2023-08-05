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
exports.removeStore = exports.updateStore = exports.addStore = exports.getStoreById = exports.getStores = void 0;
const store_service_1 = require("./store.service");
const als_service_1 = __importDefault(require("../../services/als.service"));
function getStores(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storage = als_service_1.default.getStore();
            const { loggedinUser } = storage;
            const userId = (_a = loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser._id) !== null && _a !== void 0 ? _a : '';
            const stores = yield (0, store_service_1.query)(userId);
            res.json(stores);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get stores' });
        }
    });
}
exports.getStores = getStores;
function getStoreById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeId = req.params.id;
            const store = yield (0, store_service_1.getById)(storeId);
            res.json(store);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get store' });
        }
    });
}
exports.getStoreById = getStoreById;
function addStore(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storage = als_service_1.default.getStore();
            const { loggedinUser } = storage;
            const userId = (_a = loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser._id) !== null && _a !== void 0 ? _a : '';
            const store = req.body;
            store.userIds.push(userId);
            const storeToAdd = yield (0, store_service_1.add)(store);
            res.json(storeToAdd);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to add store' });
        }
    });
}
exports.addStore = addStore;
function updateStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const store = req.body;
            const storeToUpdate = yield (0, store_service_1.update)(store);
            res.json(storeToUpdate);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to update store' });
        }
    });
}
exports.updateStore = updateStore;
function removeStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeId = req.params.id;
            const removeId = yield (0, store_service_1.remove)(storeId);
            res.json(removeId);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to remove store' });
        }
    });
}
exports.removeStore = removeStore;
