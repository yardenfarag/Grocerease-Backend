import express from 'express'
import { getStoreById, getStores, addStore, updateStore, removeStore } from './store.controller'

const router = express.Router()

router.get('/:userId', getStores)
router.get('/:id', getStoreById)
router.post('/', addStore)
router.put('/:id', updateStore)
router.delete('/:id', removeStore)

export default router