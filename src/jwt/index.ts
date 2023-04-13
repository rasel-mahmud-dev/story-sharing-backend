import Role from "../interfaces/Role";

const jwt = require('jsonwebtoken')

export const createToken = (userId: string, roles: Role[] = [Role.USER], expiresIn?: string) => {
    return jwt.sign({
            userId, roles,
        },
        process.env.SECRET, {expiresIn: "7d"}
    )
}


export const parseToken = (token) => {
    return new Promise<{ userId: string, roles: Role[] }>(async (resolve, reject) => {
        try {
            if (token) {
                let d = await jwt.verify(token, process.env.SECRET)
                resolve(d)
            } else {
                reject(new Error("Token not found"))
            }
        } catch (ex) {
            reject(ex)
        }
    })
}

