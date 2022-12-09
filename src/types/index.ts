// to make the file a module and avoid the TypeScript error

export {}

declare global {

    export interface Request {
        n: string,
        user: {
            userId: string,
            role: string
        };
    }
}
