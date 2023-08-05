import express from 'express'
import { getProducts, getProductByBarcode } from './product.controller'

const router = express.Router()

router.get('/', getProducts)
router.get('/:barcode', getProductByBarcode)

export default router