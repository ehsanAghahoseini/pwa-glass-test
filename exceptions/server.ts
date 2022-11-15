export class ServerError extends Error{
    constructor(message: string | undefined) {
        super(message);
        this.name = 'ServerError'
    }
}

export class ServerUnexpectedError extends Error{
    private statusCode: number;
    constructor(message: string | undefined , statusCode:number) {
        super(message);
        this.name = 'ServerUnexpectedError';
        this.statusCode = statusCode;
    }
}