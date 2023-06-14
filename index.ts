import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const port = process.env.PORT || 5555

dotenv.config()
const app = express()

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5555', 'http://localhost:5555'],
    credentials: true
}
app.use(cors(corsOptions))

app.get("/", (req: Request, res: Response) => {
    res.send("hi there bud")
})

app.get("/hi", (req: Request, res: Response) => {
    res.send("bye")
})

app.listen(port, () => {
    console.log(`now listening on port ${port}`)
})