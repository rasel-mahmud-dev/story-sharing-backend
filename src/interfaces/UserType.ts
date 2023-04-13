import {ObjectId} from "mongodb";

import Role from "./Role";


export interface UserType {
    _id?: ObjectId | string
    googleId?: string
    facebookId?: string
    username: string
    firstName: string
    lastName?: string
    email: string,
    password?: string
    createdAt?: Date
    updatedAt?: Date
    roles: Role[]
    avatar?: string
    accountStatus?: boolean
}


export default UserType