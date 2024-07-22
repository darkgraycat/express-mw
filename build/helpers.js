"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
var Helpers;
(function (Helpers) {
    let Type;
    (function (Type) {
        Type["Null"] = "null";
        Type["Void"] = "undefined";
        Type["Object"] = "object";
        Type["Array"] = "array";
        Type["Function"] = "function";
        Type["Number"] = "number";
        Type["BigInt"] = "bigint";
        Type["String"] = "string";
        Type["Boolean"] = "boolean";
        Type["Symbol"] = "symbol";
        Type["Unknown"] = "unknown";
    })(Type = Helpers.Type || (Helpers.Type = {}));
    function recurse(x, fn) {
        const type = typeOf(x);
        if (type === Type.Object)
            return Object
                .entries(x)
                .reduce((acc, [k, v]) => (acc[k] = recurse(v, fn), acc), {});
        if (type === Type.Array)
            return Object
                .values(x)
                .map(v => recurse(v, fn));
        return fn(x);
    }
    Helpers.recurse = recurse;
    function typeOf(x) {
        if (x === null)
            return Type.Null;
        if (x === undefined)
            return Type.Void;
        if (Array.isArray(x))
            return Type.Array;
        if (Number.isNaN(x))
            return Type.Unknown;
        return typeof x;
    }
    Helpers.typeOf = typeOf;
    function rtypeOf(x) {
        return recurse(x, typeOf);
    }
    Helpers.rtypeOf = rtypeOf;
    function deepCompareTypes(x, y, results = []) {
        throw new Error('Not implemented yet!');
        const xtype = typeOf(x);
        const ytype = typeOf(y);
        if (xtype !== ytype) {
            results.push(`Expected: ${xtype}. Actual: ${ytype}`);
            return;
        }
        // TODO: handle arrays and objects
    }
    Helpers.deepCompareTypes = deepCompareTypes;
})(Helpers || (exports.Helpers = Helpers = {}));
