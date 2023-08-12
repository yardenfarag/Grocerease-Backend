import express from 'express'
import { getProducts, getProductByBarcode, addProduct } from './product.controller'

const router = express.Router()

router.get('/', getProducts)
router.get('/:barcode', getProductByBarcode)
router.post('/', addProduct)

export default router