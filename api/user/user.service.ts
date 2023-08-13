import { ObjectId, WithId, Document } from 'mongodb'
import { getCollection } from '../../services/db.service'
import { User } from '../../models/user'

async function getById(userId: string) {
    try {
        const collection = await getCollection('user')
        const user = await collection.findOne({ _id: new ObjectId(userId) })
        delete user!.password
        return user
    } catch (err) {
        throw err
    }
}

async function getByEmail(email: string) {
    try {
        const collection = await getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        throw err
    }
}

async function remove(userId: string) {
    try {
        const collection = await getCollection('user')
        await collection.deleteOne({ _id: new ObjectId(userId) })
    } catch (err) {
        throw err
    }
}

async function add(user: User) {
    try {
        const userToAdd = {
            email: user.email,
            password: user.password,
            fullName: user.fullName,
        }
        const collection = await getCollection('user')
        const newUser = await collection.insertOne(userToAdd)
        const defaultStoreToAdd = {
            title: "המטבח שלי",
            color: "#5cdb5c",
            shoppingList:
                [
                    {
                        barcode: "7290111563812",
                        title: "אסם ספגטי מהדורה מיוחדת20% 20*600גרם",
                        quantity: 4,
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/awesome/7290111563812.jpg"
                    },
                    {
                        barcode: "7290003643387",
                        title: "סוכר לבן בצנצנת סוגת 1 ק\"ג",
                        quantity: 1,
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/sugat/7290003643387.jpg"
                    },
                    {
                        barcode: "7290017142388",
                        title: "שמן חמניות פלוס אומגה 3",
                        quantity: 3,
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/sugat/7290017142388.jpg"
                    }
                ],
            userIds: [newUser.insertedId.toHexString()],
            items:
                [
                    {
                        id: "Q2rCKVJgMj",
                        title: "אסם ספגטי מהדורה מיוחדת20% 20*600גרם",
                        quantity: 4,
                        expiry: "2023-08-15",
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/awesome/7290111563812.jpg",
                        barcode: "7290111563812",
                        place: "ארון"
                    },
                    {
                        id: "7ElOT98K3F",
                        title: "אנג'ל לחם אחיד פרוס ללא תוספת סוכר 750 גרם",
                        quantity: 1,
                        expiry: "2023-08-20",
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/angel/7290000379104.jpg",
                        barcode: "7290000379104",
                        place: "מקפיא"
                    },
                    {
                        id: "y4aSRTJ3r9",
                        title: "תה שחור ארל גריי ",
                        quantity: 1,
                        expiry: "",
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/lipton/8690637073373.jpg",
                        barcode: "8690637073373",
                        place: "ארון קפה"
                    },
                    {
                        id: "SEySGQ28iA",
                        title: "אסם פתיתים אפויים קוסקוס 12*500גרם",
                        quantity: 2,
                        expiry: "2023-08-13",
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/awesome/7290000060200.jpg",
                        barcode: "7290000060200",
                        place: "ארון"
                    },
                    {
                        id: "KUGgyEXpAt",
                        title: "אורז בסמטי קלאסי סוגת",
                        quantity: 2,
                        expiry: "2023-11-01",
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/sugat/7290003643004.jpg",
                        barcode: "7290003643004",
                        place: "ארון"
                    },
                    {
                        id: "dQO75fhJ2M",
                        title: "סוכר לבן בצנצנת סוגת 1 ק\"ג",
                        quantity: 1,
                        expiry: "2024-08-12",
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/sugat/7290003643387.jpg",
                        barcode: "7290003643387",
                        place: "ארון קפה"
                    },
                    {
                        id: "UCVDGYBDII",
                        title: "שמן חמניות פלוס אומגה 3",
                        quantity: 3,
                        expiry: "2023-08-11",
                        imgUrl: "https://grocerease-products-images-bucket.s3.eu-central-1.amazonaws.com/sugat/7290017142388.jpg",
                        barcode: "7290017142388",
                        place: "מדף"
                    }
                ]
        }
        const storeCollection = await getCollection('store')
        await storeCollection.insertOne(defaultStoreToAdd)
        return { _id: newUser.insertedId.toHexString(), fullName: userToAdd.fullName }
    } catch (err) {
        throw err
    }
}


export default {
    getById,
    getByEmail,
    remove,
    add,
}
