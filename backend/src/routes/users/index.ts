import {Elysia, t} from "elysia";
import {createUser, getAllUsers} from "./handlers";

const userRoutes = new Elysia({prefix: '/user'})
    .get('/', () => getAllUsers())
    .post('/', ({ body }) => createUser(body), {
        body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String()
        })
    })
export default  userRoutes;