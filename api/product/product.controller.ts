import { Request, Response } from 'express'
import {query} from './products.service'

export async function getProducts(req: Request, res: Response) {
    try {
        const filterBy = {
            txt: req.query.txt as string || '',
        };
        const products = await query(filterBy)
        res.json(products)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get products' })
    }
}
