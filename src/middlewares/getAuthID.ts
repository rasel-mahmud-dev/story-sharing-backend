import {parseToken} from "../jwt";
import {NextFunction, Response} from "express";
import Role from "../interfaces/Role";

function getAuthID(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["token"]

    if (!token) {
        res.status(409).json({message: "You are unauthorized"})
        return
    }


    parseToken(token).then(u => {
        // @ts-ignore
        req.user = {
            userId: u.userId,
            roles: u.roles as Role[]
        }
        next()
    }).catch(err => {
        console.log(err.message)
        res.status(409).json({message: "You are unauthorized"})
    })
}


export default getAuthID