import {Elysia, t} from "elysia";
import {createUser, getAllUsers, getUser} from "./handlers";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

const userRoutes = new Elysia({prefix: '/user'})
    .use(jwt({
        name: 'jwt',
        secret: 'super-secret'
    }))
    .use(cookie())
    .get('/', () => getAllUsers())
    .post('/login', ({ body, jwt, cookie, setCookie }) => getUser(body, jwt, cookie, setCookie), {
        body: t.Object({
            email: t.String(),
            password: t.String()
        })
    })
    .post('/signup', ({ body }) => createUser(body), {
        body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String()
        })
    })
export default  userRoutes;