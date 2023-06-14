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
// import logger from '../../services/logger.service';
function query(filterBy = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const criteria = _buildCriteria(filterBy);
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            let users = yield collection.find(criteria).toArray();
            users = users.map((user) => {
                delete user.password;
                user.createdAt = new mongodb_1.ObjectId(user._id).getTimestamp();
                // Returning fake fresh data
                // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3); // 3 days ago
                return user;
            });
            return users;
        }
        catch (err) {
            // logger.error('cannot find users', err);
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
            // logger.error(`while finding user by id: ${userId}`, err);
            throw err;
        }
    });
}
function getByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            const user = yield collection.findOne({ username });
            return user;
        }
        catch (err) {
            // logger.error(`while finding user by username: ${username}`, err);
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
            // logger.error(`cannot remove user ${userId}`, err);
            throw err;
        }
    });
}
function update(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable properties
            const userToSave = {
                _id: new mongodb_1.ObjectId(user._id),
                fullname: user.fullname,
                score: user.score,
            };
            const collection = yield (0, db_service_1.getCollection)('user');
            yield collection.updateOne({ _id: userToSave._id }, { $set: userToSave });
            return userToSave;
        }
        catch (err) {
            // logger.error(`cannot update user ${user._id}`, err);
            throw err;
        }
    });
}
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable fields!
            const userToAdd = {
                username: user.username,
                password: user.password,
                fullname: user.fullname,
                imgUrl: user.imgUrl,
                score: 100,
            };
            const collection = yield (0, db_service_1.getCollection)('user');
            yield collection.insertOne(userToAdd);
            return userToAdd;
        }
        catch (err) {
            // logger.error('cannot insert user', err);
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
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance };
    }
    return criteria;
}
exports.default = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
};
