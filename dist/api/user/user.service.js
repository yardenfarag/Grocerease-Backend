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
const mongodb_1 = require("mongodb");
const db_service_1 = require("../../services/db.service");
function query(filterBy = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const criteria = _buildCriteria(filterBy);
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            let users = yield collection.find(criteria).toArray();
            users = users.map((user) => {
                delete user.password;
                user.createdAt = new mongodb_1.ObjectId(user._id).getTimestamp();
                return user;
            });
            return users;
        }
        catch (err) {
            throw err;
        }
    });
}
function getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            const user = yield collection.findOne({ _id: new mongodb_1.ObjectId(userId) });
            delete user.password;
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            const user = yield collection.findOne({ email });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function remove(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            yield collection.deleteOne({ _id: new mongodb_1.ObjectId(userId) });
        }
        catch (err) {
            throw err;
        }
    });
}
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToAdd = {
                email: user.email,
                password: user.password,
                fullName: user.fullName,
            };
            const collection = yield (0, db_service_1.getCollection)('user');
            yield collection.insertOne(userToAdd);
            return userToAdd;
        }
        catch (err) {
            throw err;
        }
    });
}
function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
        criteria.$or = [
            {
                email: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    return criteria;
}
exports.default = {
    query,
    getById,
    getByEmail,
    remove,
    add,
};
