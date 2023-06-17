import { Document, ObjectId, OptionalId, WithId } from 'mongodb';
import { getCollection } from '../../services/db.service';
import { Store } from '../../models/store copy';

export async function query(userId: string) {
    try {
        const collection = await getCollection('store')
        const products = await collection.find({ userIds: { $in: [userId] } }).toArray()
        const mappedStores: Store[] = products.map((doc: WithId<Document>) => {
            const { _id, title, color, places, shoppingList, userIds } = doc
            return { _id: _id.toHexString(), title, color, places, shoppingList, userIds }
        })
        return mappedStores
    } catch (err) {
        throw err
    }
}

export async function getById(storeId: string) {
    try {
        const collection = await getCollection('store')
        const store = await collection.findOne({ _id: new ObjectId(storeId) })
        if (store) {
            const { _id, title, color, places, shoppingList, userIds } = store
            return { _id: _id.toHexString(), title, color, places, shoppingList, userIds }
        }
        return store
    } catch (err) {
        throw err
    }
}

export async function add(store: Store) {
    try {
        const storeToAdd = {
            title: store.title,
            color: store.color,
            places: store.places,
            shoppingList: store.shoppingList,
            userIds: store.userIds
        }
        const collection = await getCollection('store')
        await collection.insertOne(storeToAdd)
        return store
    } catch (err) {
        throw err
    }
}

export async function update(store: Store) {
    try {
        const storeToSave: Store = {
            title: store.title,
            color: store.color,
            places: store.places,
            shoppingList: store.shoppingList,
            userIds: store.userIds
        }
        const collection = await getCollection('store')
        await collection.updateOne({ _id: new ObjectId(store._id) }, { $set: storeToSave })
        return store
    } catch (err) {
        throw err
    }
}

export async function remove(storeId: string) {
    try {
        const collection = await getCollection('store')
        await collection.deleteOne({ _id: new ObjectId(storeId) })
        return storeId
    } catch (err) {
        throw err
    }
}
