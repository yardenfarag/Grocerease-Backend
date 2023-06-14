import { WithId, Document } from "mongodb"

export interface User extends WithId<Document> {
    fullName: string
    email: string
    password?: string
}