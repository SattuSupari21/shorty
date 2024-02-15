import { Elysia, t } from "elysia";
import { createUser, getUser, getUserData } from "./handlers";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

const userRoutes = new Elysia({ prefix: '/user' })
    .use(jwt({
        name: 'jwt',
        secret: 'super-secret'
    }))
    .use(cookie())
    .onError(({ code, error }) => {
        return Response.json({ status: 'error', error: error.toString() })
    })
    .get('/', ({ jwt, cookie: { auth } }) => getUserData(jwt, auth))
    .post('/login', ({ body, jwt, cookie, setCookie }) => getUser(body, jwt, cookie, setCookie), {
        body: t.Object({
            email: t.String({
                format: "email",
                error: "Invalid Email!"
            }),
            password: t.String()
        })
    })
    .post('/signup', ({ body, jwt }) => createUser(body, jwt), {
        body: t.Object({
            name: t.String({
                minLength: 1,
                error: "Name cannot be empty"
            }),
            email: t.String({
                format: "email",
                error: "Invalid Email!"
            }),
            password: t.String({
                minLength: 8,
                error: "Password should be atleast 8 characters long"
            })
        })
    })
    .get('/logout', ({ cookie, setCookie }) => {
        setCookie('auth', '', {
            httpOnly: false,
            path: '/',
        })
    })
export default userRoutes;
