export declare namespace Helpers {
    enum Type {
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
        Unknown = "unknown"
    }
    function recurse<T, V>(x: T, fn: (x: T) => V): V | Record<string, V> | V[];
    function typeOf(x?: unknown): Type;
    function rtypeOf(x?: unknown): any;
    function deepCompareTypes(x: unknown, y: unknown, results?: any[]): void;
}
