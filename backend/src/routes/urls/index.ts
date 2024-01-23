import {Elysia, t} from "elysia";
import {createUrl, getUrl} from "./handlers";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";

const urlRoutes = new Elysia({prefix: '/url'})
    .use(jwt({
        name: 'jwt',
        secret: 'super-secret'
    }))
    .use(cookie())
    .get('/:shortUrl', () => getUrl())
    .post('/', ({ body, jwt, set, cookie: {auth} }) => createUrl(body, jwt, set, auth), {
        body: t.Object({
            longUrl: t.String(),
            userId: t.Number()
        })
    })

export default urlRoutes;