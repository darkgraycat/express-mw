import { Request, Response, NextFunction } from "express";
export declare namespace Core {
    interface HttpError extends Error {
        message: any;
        status: number;
    }
    type Context = {
        req: Request;
        res: Response;
    };
    type Fn<I, O> = (data: I, ctx?: Context) => O | Promise<O>;
    function mw<Input, Output>(fn: Fn<Input, Output>): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    function error(message: any, code?: number): HttpError;
}
