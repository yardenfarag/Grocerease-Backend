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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.add = exports.getById = exports.query = void 0;
const mongodb_1 = require("mongodb");
const db_service_1 = require("../../services/db.service");
function query(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(userId);
            // userId = '6495cd3460204c0304df8c29'
            const collection = yield (0, db_service_1.getCollection)('store');
            // const stores = await collection.find({ userIds: { $in: [userId] } }).toArray()
            const stores = yield collection.find().toArray();
            const mappedStores = stores.map((doc) => {
                const { _id, title, color, shoppingList, userIds, items } = doc;
                return { _id: _id.toHexString(), title, color, shoppingList, userIds, items };
            });
            const filteredStores = mappedStores.filter((s) => s.userIds.includes(userId));
            return filteredStores;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.query = query;
function getById(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('store');
            const store = yield collection.findOne({ _id: new mongodb_1.ObjectId(storeId) });
            if (store) {
                const { _id, title, color, shoppingList, userIds, items } = store;
                return { _id: _id.toHexString(), title, color, shoppingList, userIds, items };
            }
            return store;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getById = getById;
function add(store) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeToAdd = {
                title: store.title,
                color: store.color,
                shoppingList: store.shoppingList,
                userIds: store.userIds,
                items: store.items
            };
            const collection = yield (0, db_service_1.getCollection)('store');
            yield collection.insertOne(storeToAdd);
            return store;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.add = add;
function update(store) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeToSave = {
                title: store.title,
                color: store.color,
                shoppingList: store.shoppingList,
                userIds: store.userIds,
                items: store.items
            };
            const collection = yield (0, db_service_1.getCollection)('store');
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(store._id) }, { $set: storeToSave });
            return store;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.update = update;
function remove(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('store');
            yield collection.deleteOne({ _id: new mongodb_1.ObjectId(storeId) });
            return storeId;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.remove = remove;
