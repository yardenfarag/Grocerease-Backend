import { WithId, Document } from "mongodb"

export interface User {
    _id?: string
    fullName: string
    email: string
    password: string
}