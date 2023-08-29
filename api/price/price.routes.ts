import express from 'express'
import { getKeyValue, getMarketData } from './price.controller'

const router = express.Router()

router.get('/', getMarketData)
router.get('/key', getKeyValue)

export default router