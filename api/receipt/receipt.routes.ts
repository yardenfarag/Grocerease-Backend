import express from 'express'
import { scanReceipt } from './receipt.controller'

const router = express.Router()

router.get('/', scanReceipt)

export default router

