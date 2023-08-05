import express from 'express'
import { getMarketData } from './price.controller'

const router = express.Router()

router.get('/', getMarketData)

export default router