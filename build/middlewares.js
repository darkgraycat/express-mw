"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewares = void 0;
const core_1 = require("./core");
var Middlewares;
(function (Middlewares) {
    function params(initial = {}) {
        return core_1.Core.mw((_, ctx) => (Object.assign(Object.assign({}, initial), ctx.req.params)));
    }
    Middlewares.params = params;
    function body(initial = {}) {
        return core_1.Core.mw((_, ctx) => (Object.assign(Object.assign({}, initial), ctx.req.body)));
    }
    Middlewares.body = body;
    function response(status) {
        return core_1.Core.mw((data, ctx) => {
            ctx.res.status(status).json(data);
        });
    }
    Middlewares.response = response;
    function validate(schema) {
        return core_1.Core.mw(data => {
            throw new Error('Not implemented yet!');
            const result = {};
            return result;
        });
    }
    Middlewares.validate = validate;
})(Middlewares || (exports.Middlewares = Middlewares = {}));
