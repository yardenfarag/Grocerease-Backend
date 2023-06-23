import express from 'express'
import { getStoreById, getStores, addStore, updateStore, removeStore } from './store.controller'
import requireAuth from '../../middlewares/requireAuth.middleware'

const router = express.Router()

router.get('/:userId', requireAuth, getStores)
router.get('/:id', requireAuth, getStoreById)
router.post('/', requireAuth, addStore)
router.put('/:id', requireAuth, updateStore)
router.delete('/:id', requireAuth, removeStore)

export default router