import { Core } from "./";

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

    export function respond<T>(status: number) {
        return Core.mw<T, void>((data, ctx) => {
            ctx.res.status(status).json(data);
        });
    }

    /** Not implemented yet !
     * TODO: to implement
     * Try to transform unknows input in output defined by schema
     * */
    export function validate<T>(schema: T) {
        return Core.mw<unknown, T>(data => {
            throw new Error('Not implemented yet!');
        })
    }

    /** Not implemented yet !
     * TODO: to implement
     * Catch error and map it to output
     * */
    export function expect<T>(error: Error) {
        return Core.mw<T, T>(data => {
            throw new Error('Not implemented yet!');
        })
    }
}
