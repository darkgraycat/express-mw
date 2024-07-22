import express, { Request, Response, NextFunction } from "express";

export namespace Core {
    export interface HttpError extends Error { message: any, status: number };

    export type Context = { req: Request, res: Response };

    export type Fn<I, O> = (data: I, ctx?: Context) => O | Promise<O>;

    export function mw<Input, Output>(fn: Fn<Input, Output>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const input = res.locals as Input;
                const output = await fn(input, { req, res });
                res.locals = output;
                next();
            } catch (error) {
                const { message, status = 500 } = error;
                res.status(status).json({ message });
                next(error);
            }
        }
    }

    export function error(message: any, code?: number): HttpError {
        const error = new Error(message) as HttpError;
        error.status = code || 500;
        return error;
    }
}
