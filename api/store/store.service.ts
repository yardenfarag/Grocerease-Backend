import { Document, ObjectId, WithId } from 'mongodb';
import { getCollection } from '../../services/db.service';
import { Store } from '../../models/store';

export async function query(userId: string) {
    try {
        const collection = await getCollection('store')
        const stores = await collection.find().toArray()
        const mappedStores: Store[] = stores.map((doc: WithId<Document>) => {
            const { _id, title, color, shoppingList, userIds, items } = doc
            return { _id: _id.toHexString(), title, color, shoppingList, userIds, items }
        })
        const filteredStores = mappedStores.filter((s:Store) => s.userIds.includes(userId))
        return filteredStores
    } catch (err) {
        throw err
    }
}

export async function getById(storeId: string) {
    try {
        const collection = await getCollection('store')
        const store = await collection.findOne({ _id: new ObjectId(storeId) })
        if (store) {
            const { _id, title, color, shoppingList, userIds, items } = store
            return { _id: _id.toHexString(), title, color, shoppingList, userIds, items }
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
            shoppingList: store.shoppingList,
            userIds: store.userIds,
            items: store.items
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
            shoppingList: store.shoppingList,
            userIds: store.userIds,
            items: store.items
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
