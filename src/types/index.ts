// to make the file a module and avoid the TypeScript error

import "express";

declare global {
        interface Request {
            body: any
            user: any
        }

}


declare module 'express-serve-static-core' {
    export interface Request {
        user: any

    }
}

export type ObjectKeys<Type> = {
    [Property in keyof Type]: any;
};