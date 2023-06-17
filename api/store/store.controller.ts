import { Request, Response } from 'express'
import { query, getById, add, update, remove } from './store.service'

export async function getStores(req: Request, res: Response) {
    try {
        const userId = req.params.userId
        const stores = await query(userId)
        res.json(stores)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get stores' })
    }
}

export async function getStoreById(req: Request, res: Response) {
    try {
        const storeId = req.params.id
        const store = await getById(storeId)
        res.json(store)
    } catch (err) {
        res.status(500).send({err: 'Failed to get store'})
    }
}

export async function addStore(req: Request, res: Response) {
    try {
        const store = req.body
        const storeToAdd = await add(store)
        res.json(storeToAdd)
    } catch (err) {
        res.status(500).send({err: 'Failed to add store'})
    }
}

export async function updateStore(req: Request, res: Response) {
    try {
        const store = req.body
        const storeToUpdate = await update(store)
        res.json(storeToUpdate)
    } catch (err) {
        res.status(500).send({err: 'Failed to update store'})
    }
}

export async function removeStore(req: Request, res: Response) {
    try {
        const storeId = req.params.id
        const removeId = await remove(storeId)
        res.json(removeId)
    } catch (err) {
        res.status(500).send({err: 'Failed to remove store'})
    }
}