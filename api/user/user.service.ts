import { ObjectId, WithId, Document } from 'mongodb';
import { getCollection } from '../../services/db.service';
import { User } from '../../models/user';

async function query(filterBy: any = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await getCollection('user')
        let users = await collection.find(criteria).toArray()
        users = users.map((user: any) => {
            delete user.password;
            user.createdAt = new ObjectId(user._id).getTimestamp()
            return user;
        });
        return users
    } catch (err) {
        throw err
    }
}

async function getById(userId: string) {
    try {
        const collection = await getCollection('user')
        const user = await collection.findOne({ _id: new ObjectId(userId) })
        delete user!.password
        return user
    } catch (err) {
        throw err
    }
}

async function getByEmail(email: string) {
    try {
        const collection = await getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        throw err
    }
}

async function remove(userId: string) {
    try {
        const collection = await getCollection('user')
        await collection.deleteOne({ _id: new ObjectId(userId) })
    } catch (err) {
        throw err
    }
}

async function add(user: any) {
    try {
        const userToAdd = {
            email: user.email,
            password: user.password,
            fullName: user.fullName,
        }
        const collection = await getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        throw err
    }
}

function _buildCriteria(filterBy: any) {
    const criteria: any = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                email: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ]
    }
    return criteria
}

export default {
    query,
    getById,
    getByEmail,
    remove,
    add,
};
