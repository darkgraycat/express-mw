"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
var Core;
(function (Core) {
    ;
    function mw(fn) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = res.locals;
                const output = yield fn(input, { req, res });
                res.locals = output;
                next();
            }
            catch (error) {
                const { message, status = 500 } = error;
                res.status(status).json({ message });
                next(error);
            }
        });
    }
    Core.mw = mw;
    function error(message, code) {
        const error = new Error(message);
        error.status = code || 500;
        return error;
    }
    Core.error = error;
})(Core || (exports.Core = Core = {}));
