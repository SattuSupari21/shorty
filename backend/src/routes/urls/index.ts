import {Elysia, t} from "elysia";
import {createUrl, getUserUrls} from "./handlers";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";

const urlRoutes = new Elysia({prefix: '/url'})
    .use(jwt({
        name: 'jwt',
        secret: 'super-secret'
    }))
    .use(cookie())
    // .get('/:shortUrl', () => getUrl())
    .post('/getUserUrls', ({ body, jwt, cookie: {auth} }) => getUserUrls(body, jwt, auth), {
        body: t.Object({
            id: t.Number()
        })
    })
    .post('/createUrl', ({ body, jwt, set, cookie: {auth} }) => createUrl(body, jwt, set, auth), {
        body: t.Object({
            longUrl: t.String({
                minLength: 10
            }),
            key: t.String({
                maxLength: 7
            })
        })
    })

export default urlRoutes;