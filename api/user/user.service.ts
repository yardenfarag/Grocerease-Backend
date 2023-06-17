import { ObjectId, WithId, Document } from 'mongodb'
import { getCollection } from '../../services/db.service'
import { User } from '../../models/user'

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

async function add(user: User) {
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


export default {
    getById,
    getByEmail,
    remove,
    add,
}
