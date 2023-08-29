import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const port = process.env.PORT || 5555
import setupAsyncLocalStorage from './middlewares/setupAls.middleware'
import productRoutes from './api/product/product.routes'
import authRoutes from './api/auth/auth.routes'
import storeRoutes from './api/store/store.routes'
import priceRoutes from './api/price/price.routes'
import receiptRoutes from './api/receipt/receipt.routes'

dotenv.config()
const app = express()

const allowedOrigins = ['http://localhost:5173', 'https://grocerease-zjxc.onrender.com/']

// const corsOptions = {
//     origin: ['https://grocerease-zjxc.onrender.com'],
//     // origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5555', 'http://localhost:5555', 'http://127.0.0.1:5174', 'http://localhost:5174',],
//     credentials: true
// }
// app.use(cors(corsOptions))
// app.use(cors())
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.all('*', setupAsyncLocalStorage)

app.use('/api/product', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/store', storeRoutes)
app.use('/api/price', priceRoutes)
app.use('/api/receipt', receiptRoutes)

app.use((req, res, next) => {
    const origin = req.headers.origin as string
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin)
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.header("Access-Control-Allow-Credentials", "true")
    }
    next()
})

app.get('/**', (req, res) => {
    res.send('Hello, world!')
})


app.listen(port, () => {
    console.log(`Server is live!! Now listening on port ${port}`)
})