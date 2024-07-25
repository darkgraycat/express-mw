import express from "express"
import request from "supertest"
import { Core, Middlewares } from "../src"

describe("Core", () => {
    const { mw, error } = Core;
    const app = express().use(express.json());

    it("should handle basic request", async () => {
        const schema = {
            id: 0,
            name: "",
            data: [] as number[],
        }
        type RequestBody = typeof schema;

        app.post(
            "/basic_request",
            Middlewares.body(schema),
            mw<RequestBody, RequestBody>(body => {
                if (body.id <= 0) {
                    throw error("Invalid Id", 400);
                }
                return body;
            }),
            mw<RequestBody, string>(body => {
                const { id, name, data } = body;
                const str = `[${id}] ${name} - ${data.join(',')}`;
                return str;
            }),
            Middlewares.respond(200),
        );

        await request(app)
            .post('/basic_request')
            .send({ id: 777, name: "Sky", data: [10, 20, 30] })
            .expect(200, `"[777] Sky - 10,20,30"`);
    });

    it("should handle splitted behavior", async () => {
        const schema = {
            op: "" as "add" | "sub",
            x: 0, y: 0,
        }
        type RequestBody = typeof schema;

        const validate = mw<RequestBody, RequestBody>(body => {
            const x = +body.x;
            const y = +body.y;
            if (!["add", "sub"].includes(body.op)) {
                throw error("Bad operation", 400)
            }
            if (isNaN(x) || isNaN(y)) {
                throw error("Bad arguments", 400)
            }
            return { ...body, x, y };
        });

        app.get(
            "/splitted_behavior/:op/:x/:y",
            Middlewares.params(schema),
            validate,
            Core.split<RequestBody>(data => data.op, {
                "add": [mw<RequestBody, number>(({ x, y }) => x + y)],
                "sub": [mw<RequestBody, number>(({ x, y }) => x - y)],
            }),
            Middlewares.respond(200),
        );

        await request(app)
            .get('/splitted_behavior/add/10/3')
            .expect(200, '13');

        await request(app)
            .get('/splitted_behavior/sub/100/24')
            .expect(200, '76');

        await request(app)
            .get('/splitted_behavior/fail/0/0')
            .expect(400, { message: 'Bad operation' });

        await request(app)
            .get('/splitted_behavior/add/one/two')
            .expect(400, { message: 'Bad arguments' });
    });
})
