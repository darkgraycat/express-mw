import { Core } from "./core";

export namespace Middlewares {
    export function params<T>(initial: Partial<T> = {}) {
        return Core.mw<void, T>((_, ctx) => ({
            ...initial,
            ...ctx.req.params
        }) as T);
    }

    export function body<T>(initial: Partial<T> = {}) {
        return Core.mw<void, T>((_, ctx) => ({
            ...initial,
            ...ctx.req.body
        }) as T);
    }

    export function response<T>(status: number) {
        return Core.mw<T, void>((data, ctx) => {
            ctx.res.status(status).json(data);
        });
    }

    export function validate<T>(schema: T) {
        return Core.mw<unknown, T>(data => {
            throw new Error('Not implemented yet!');
            const result = {} as T;
            return result;
        })
    }
}
