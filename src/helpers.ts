export namespace Helpers {
    export enum Type {
        Null = "null",
        Void = "undefined",
        Object = "object",
        Array = "array",
        Function = "function",
        Number = "number",
        BigInt = "bigint",
        String = "string",
        Boolean = "boolean",
        Symbol = "symbol",
        Unknown = "unknown",
    }

    export function recurse<T, V>(x: T, fn: (x: T) => V): V | Record<string, V> | V[] {
        const type = typeOf(x);
        if (type === Type.Object) return Object
            .entries(x)
            .reduce((acc, [k, v]) => (acc[k] = recurse(v, fn), acc), {});
        if (type === Type.Array) return Object
            .values(x)
            .map(v => recurse(v, fn)) as V[];
        return fn(x);
    }

    export function typeOf(x?: unknown): Type {
        if (x === null) return Type.Null;
        if (x === undefined) return Type.Void;
        if (Array.isArray(x)) return Type.Array;
        if (Number.isNaN(x)) return Type.Unknown;
        return typeof x as Type;
    }

    export function rtypeOf(x?: unknown): any {
        return recurse(x, typeOf);
    }

    export function deepCompareTypes(x: unknown, y: unknown, results = []) {
        throw new Error('Not implemented yet!');
        const xtype = typeOf(x);
        const ytype = typeOf(y);
        if (xtype !== ytype) {
            results.push(`Expected: ${xtype}. Actual: ${ytype}`);
            return;
        }
        // TODO: handle arrays and objects
    }
}
