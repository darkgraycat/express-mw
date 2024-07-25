import { Request, Response, NextFunction } from "express";

export namespace Core {
    type Result<T> = T | Promise<T>

    export interface CoreError extends Error {
        message: any,
        status: number
    };

    export interface Middleware {
        (req: Request, res: Response, next: NextFunction): Result<void>;
    }

    export interface Context {
        req: Request;
        res: Response;
        next: NextFunction;
    }

    export interface SplitFn<Input> {
        (data: Input): string;
    }

    export interface Fn<Input, Output>{
        (data: Input, ctx: Context): Result<Output>
    }

    export function mw<Input, Output>(fn: Fn<Input, Output>): Middleware {
        return async (req, res, next) => {
            try {
                const input = res.locals as Input;
                const output = await fn(input, { req, res, next });
                res.locals = output;
                next();
            } catch (error) {
                const { message, status = 500 } = error;
                res.status(status).json({ message });
                next(error);
            }
        }
    }

    export function error(message: any, code?: number): CoreError {
        const error = new Error(message) as CoreError;
        error.status = code || 500;
        return error;
    }

    export function split<Input>(
        condition: SplitFn<Input>,
        middlewares: Record<string, Core.Middleware[]>,
    ): Middleware {
        return async (req, res, next) => {
            const input = res.locals as Input;
            const key = condition(input);
            const mws = middlewares[key];
            await chain(mws, { req, res, next });
            next();
        }
    }

    export async function chain(
        middlewares: Middleware[],
        context: Context
    ) {
        const { req, res, next } = context;
        let current = 0;

        const nextFn = async (err?: Error | string) => {
            if (err) return next(err);
            if (current >= middlewares.length) return next();
            const middleware = middlewares[current++];
            await middleware(req, res, nextFn);
        };

        nextFn();
    }
}
