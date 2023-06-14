import { ObjectId, WithId, Document } from 'mongodb';
import { getCollection } from '../../services/db.service';
import { User } from '../../models/user';
// import logger from '../../services/logger.service';

async function query(filterBy: any = {}) {
    const criteria = _buildCriteria(filterBy);
    try {
        const collection = await getCollection('user');
        let users = await collection.find(criteria).toArray();
        users = users.map((user: any) => {
            delete user.password;
            user.createdAt = new ObjectId(user._id).getTimestamp();
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3); // 3 days ago
            return user;
        });
        return users;
    } catch (err) {
        // logger.error('cannot find users', err);
        throw err;
    }
}

async function getById(userId: string) {
    try {
        const collection = await getCollection('user');
        const user = await collection.findOne({ _id: new ObjectId(userId) });
        delete user!.password;

        return user;
    } catch (err) {
        // logger.error(`while finding user by id: ${userId}`, err);
        throw err;
    }
}

async function getByUsername(username: string) {
    try {
        const collection = await getCollection('user');
        const user = await collection.findOne({ username });
        return user;
    } catch (err) {
        // logger.error(`while finding user by username: ${username}`, err);
        throw err;
    }
}

async function remove(userId: string) {
    try {
        const collection = await getCollection('user');
        await collection.deleteOne({ _id: new ObjectId(userId) });
    } catch (err) {
        // logger.error(`cannot remove user ${userId}`, err);
        throw err;
    }
}

async function update(user: any) {
    try {
        // peek only updatable properties
        const userToSave = {
            _id: new ObjectId(user._id), // needed for the returned obj
            fullname: user.fullname,
            score: user.score,
        };
        const collection = await getCollection('user');
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave });
        return userToSave;
    } catch (err) {
        // logger.error(`cannot update user ${user._id}`, err);
        throw err;
    }
}

async function add(user: any) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
            score: 100,
        };
        const collection = await getCollection('user');
        await collection.insertOne(userToAdd);
        return userToAdd;
    } catch (err) {
        // logger.error('cannot insert user', err);
        throw err;
    }
}

function _buildCriteria(filterBy: any) {
    const criteria: any = {};
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

export default {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
};
