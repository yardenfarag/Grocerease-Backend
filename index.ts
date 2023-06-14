import express, { Express, Request, Response } from 'express'
const port = 8888

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("hi there bud")
})

app.get("/hi", (req: Request, res: Response) => {
    res.send("bye")
})

app.listen(port, () => {
    console.log(`now listening on port ${port}`)
})