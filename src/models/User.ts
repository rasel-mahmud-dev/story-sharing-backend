import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";
import Role from "../interfaces/Role";
import UserType from "../interfaces/UserType";


class User extends Base implements UserType{
    public _id?: ObjectId | string
    public googleId?: string
    public facebookId?: string
    public username: string
    public firstName: string
    public lastName?:  string
    public email: string
    public password?: string
    public createdAt: Date
    public updatedAt: Date
    public avatar: string
    public roles: Role[]
    public accountStatus?: boolean

    static indexes: IndexType = {
        email: {
            unique: true,
        },
        username: {
            // unique: true,
        }
    }

    static collectionName = "users"

    constructor(data: UserType) {
        super(User.collectionName);
        this.username = data.username
        this.firstName = data.firstName
        this.facebookId = data.facebookId
        this.googleId = data.googleId
        this.lastName = data.lastName
        this.email = data.email
        this.password = data.password
        this.avatar = ""
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.roles = data.roles;
        this.accountStatus =  false
    }
}



module.exports = User
export default User









