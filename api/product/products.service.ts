import { Document, SortDirection, WithId } from 'mongodb';
import { getCollection } from '../../services/db.service';
import { Product } from '../../models/product';
import axios from 'axios';

export async function query(filterBy: { txt: string } = { txt: '' }, page: number) {

    try {
        const criteria: Record<string, any> = { 
            product_name: { $regex: filterBy.txt, $options: 'iu' },
        }
        const sortOptions: [string, SortDirection] = ['product_name', 1]
        const query = {}
        let itemsPerPage = 24
        if (process.env.ITEMS_PER_PAGE) {
            itemsPerPage = +process.env.ITEMS_PER_PAGE
        }

        const skipAmount = (page - 1) * itemsPerPage

        const collection = await getCollection('product');
        const count = await collection.countDocuments(criteria)
        
        let products: WithId<Document>[] = []

        products = await collection.find(criteria).sort(sortOptions).skip(skipAmount).limit(itemsPerPage).toArray()

        const pageCount = count / itemsPerPage

        const mappedProducts: Product[] = products.map((doc: WithId<Document>) => {
            const { _id, product_name, brand_name, product_image, product_description, product_barcode } = doc
            return { _id: _id.toHexString(), product_name, brand_name, product_image, product_description, product_barcode }
        })

        return {
            pagination: {
                count,
                pageCount: Math.ceil(pageCount)
            },
            products: mappedProducts
        }
    } catch (err) {
        throw err
    }
}

export async function getByBarcode(barcode: string) {
    try {
        const collection = await getCollection('product')
        const product = await collection.findOne({ 'product_barcode': barcode })
        return product
    } catch (err) {
        throw err
    }
}

export async function getByBarcodeGs1(barcode: string) {
    try {
        const collection = await getCollection('gs1')
        const product = await collection.findOne({ 'product_info.Main_Fields.GTIN': barcode })
        return product
    } catch (err) {
        throw err
    }
}

export async function add(barcode: string, imgUrl: string) {
    try {
        const gs1Collection = await getCollection('gs1')
        const existingProduct = await gs1Collection.findOne({ 'product_info.Main_Fields.GTIN': barcode })

        if (existingProduct) {
            return existingProduct
        }

        const url = `http://fe.gs1-retailer.mk101.signature-it.com/external/product/${barcode}.json?hq=1`

        const username = process.env.GS1_USERNAME
        const password = process.env.GS1_PASSWORD
        const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

        const res = await axios.get(url, {
            headers: {
                Authorization: authHeader
            }
        })
        const gs1Product = { ...res.data[0], imgUrl }

        await gs1Collection.insertOne(gs1Product)

        const productsCollection = await getCollection('product')

        const product = {
            product_name: gs1Product.product_info.Main_Fields.Trade_Item_Description,
            product_image: gs1Product.imgUrl,
            product_description: gs1Product.product_info.Main_Fields.internal_product_description,
            product_barcode: gs1Product.product_info.Main_Fields.GTIN,
            brand_name: gs1Product.product_info.Main_Fields.BrandName
        }

        await productsCollection.insertOne(product)

        return gs1Product
    } catch (err) {
        throw err
    }
}

