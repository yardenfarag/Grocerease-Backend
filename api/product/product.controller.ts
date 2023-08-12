import { Request, Response } from 'express'
import { getByBarcode, query, add } from './products.service'

export async function getProducts(req: Request, res: Response) {
    try {
        const filterBy = { txt: '' };

        if (typeof req.query.filterBy === 'string') {
            filterBy.txt = req.query.filterBy;
        } else if (typeof req.query.filterBy === 'object' && req.query.filterBy !== null) {
            filterBy.txt = (req.query.filterBy as { txt: string }).txt || '';
        }


        let page = 1
        if (req.query.page !== undefined) {
            page = +req.query.page
        }

        const products = await query(filterBy, page)
        res.json(products)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get products' })
    }
}

export async function getProductByBarcode(req: Request, res: Response) {
    try {
        const barcode = req.params.barcode
        const product = await getByBarcode(barcode)
        res.json(product)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get product' })
    }
}

export async function addProduct(req: Request, res: Response) {
    try {
        const barcode = req.body.barcode
        const imgUrl = req.body.imgUrl

        const product = add(barcode, imgUrl)
        res.json(product)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get product' })
    }
}
